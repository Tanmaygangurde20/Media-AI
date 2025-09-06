import os
import glob
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
from .image2text import image_to_text
from .text2image import text_to_image

# Use MEDIA_ROOT to store uploads
UPLOAD_DIR = os.path.join(settings.MEDIA_ROOT, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@csrf_exempt
def upload_image(request):
    try:
        if request.method == "POST" and request.FILES.get("image"):
            # Delete previous images
            for file in glob.glob(os.path.join(UPLOAD_DIR, "*")):
                os.remove(file)

            file_obj = request.FILES["image"]
            file_path = os.path.join(UPLOAD_DIR, file_obj.name)

            # Save uploaded file
            with default_storage.open(file_path, "wb+") as dest:
                for chunk in file_obj.chunks():
                    dest.write(chunk)

            # Generate caption
            caption = image_to_text(file_path)

            # Return MEDIA_URL path if needed
            image_url = os.path.join(settings.MEDIA_URL, "uploads", file_obj.name)

            return JsonResponse({
                "caption": caption,
                "image_url": image_url  # optional: to preview the uploaded image
            })

        return JsonResponse({"error": "No image uploaded"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def generate_image(request):
    try:
        if request.method == "POST":
            prompt = request.POST.get("prompt", "")
            if not prompt:
                return JsonResponse({"error": "Prompt is required"}, status=400)

            # Generate image from text
            image_relative_path = text_to_image(prompt)

            # Full URL for frontend preview
            image_url = os.path.join(settings.MEDIA_URL, image_relative_path)

            return JsonResponse({"image_path": image_relative_path, "image_url": image_url})
        return JsonResponse({"error": "Invalid request"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
