from huggingface_hub import InferenceClient
import os
from datetime import datetime
from dotenv import load_dotenv
import glob
from django.conf import settings

load_dotenv()

def text_to_image(prompt):
    api_key = os.getenv("HF_TOKEN")
    client = InferenceClient(api_key=api_key)
    image = client.text_to_image(prompt, model="ZB-Tech/Text-to-Image")

    # Save inside MEDIA_ROOT/generated_images
    output_dir = os.path.join(settings.MEDIA_ROOT, "generated_images")
    os.makedirs(output_dir, exist_ok=True)

    # Delete previous images
    for file in glob.glob(os.path.join(output_dir, "*.png")):
        os.remove(file)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"generated_{timestamp}.png"
    filepath = os.path.join(output_dir, filename)

    image.save(filepath)

    # Return relative path to use with MEDIA_URL
    return f"generated_images/{filename}"
