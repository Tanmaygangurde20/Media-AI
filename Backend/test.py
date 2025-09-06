import requests

BASE_URL = "http://127.0.0.1:8000"   # Django server must be running

def test_upload_image(image_path="try.jpg"):
    url = f"{BASE_URL}/upload-image/"
    with open(image_path, "rb") as img:
        files = {"image": img}
        response = requests.post(url, files=files)
    print("Upload Image Response:", response.json())
    return response.json()

def test_generate_image(prompt="A futuristic city with flying cars"):
    url = f"{BASE_URL}/generate-image/"
    data = {"prompt": prompt}
    response = requests.post(url, data=data)
    print("Generate Image Response:", response.json())
    return response.json()


if __name__ == "__main__":
    print("---- Testing upload_image ----")
    test_upload_image("try.jpg")   # replace with your test image

    print("\n---- Testing generate_image ----")
    test_generate_image("A dragon flying over a castle")
