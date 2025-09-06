import os
from django.core.wsgi import get_wsgi_application
from uvicorn import run

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
application = get_wsgi_application()

if __name__ == "__main__":
    run("backend.wsgi:application", host="0.0.0.0", port=7860)
