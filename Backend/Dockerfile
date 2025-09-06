# Use official Python image
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Expose port for Hugging Face Spaces (must be 7860)
EXPOSE 7860

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings

# Collect static files (optional)
RUN python manage.py collectstatic --noinput

# Run Django app with gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:7860"]
