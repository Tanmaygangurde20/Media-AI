from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large").to(device)
except Exception as e:
    print("Failed to load BLIP model:", e)
    processor = None
    model = None

def image_to_text(image_path):
    if processor is None or model is None:
        return "Model not loaded"

    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_length=50)
    text = processor.decode(outputs[0], skip_special_tokens=True)
    print("Generated Caption:", text)
    return text.strip()
