

---

# 📸 Image-to-Caption Web App\

Live app: https://ai-media-django.netlify.app/

An AI-powered web application that allows users to upload an image and automatically generates a descriptive caption using a pre-trained Hugging Face BLIP model.
Built with **Django (Backend)** and **React (Frontend)**, deployed using **Uvicorn** and **Docker**.

---

## 🚀 Features

* Upload an image (JPEG, PNG, WebP)
* Automatically generate an AI-based caption
* Preview uploaded image and generated caption
* Copy generated caption to clipboard
* Simple, intuitive frontend interface

---

## ⚙️ Tech Stack

* Backend: Django + Hugging Face Transformers
* Frontend: React + Tailwind CSS
* API: Django REST endpoints
* Model: BLIP (Salesforce/blip-image-captioning-large)
* ASGI Server: Uvicorn
* Docker for containerization

---

## 📋 Installation

### Backend Setup

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd <repo-directory>
   ```

2. Build Docker image

   ```bash
   docker build -t image-caption-app .
   ```

3. Run Docker container

   ```bash
   docker run -p 7860:7860 image-caption-app
   ```

---

### Frontend Setup

1. Go to frontend directory (if separated)

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start frontend (React dev server)

   ```bash
   npm start
   ```




---

## ⚠️ Notes

* Ensure Docker has proper permission to write into `/app/media/` to store uploaded/generated images.
* Max image size: **5MB**
* Supported formats: `.jpeg`, `.jpg`, `.png`, `.webp`

---

## ✅ Environment Variables

* `DJANGO_SETTINGS_MODULE=backend.settings`
* Optionally configure CORS and MEDIA\_URL/MEDIA\_ROOT in `settings.py`.

---

## 📂 Directory Structure

```plaintext
├── backend/
│   ├── image2text.py
│   ├── text2image.py
│   ├── views.py
│   ├── urls.py
│   └── settings.py
├── frontend/
│   └── ...React project files
├── media/
│   ├── uploads/
│   └── generated_images/
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## 🎯 Future Improvements

* User authentication
* History of uploaded images
* Multi-language support
* Deploy to cloud (Heroku, AWS, GCP)

---

## 📞 Contact

Created by **\[Your Name]**
Email: [your.email@example.com](mailto:your.email@example.com)
GitHub: [https://github.com/yourusername](https://github.com/yourusername)

---


