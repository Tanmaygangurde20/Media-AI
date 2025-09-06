from django.urls import path
from . import views
from .views import upload_image, generate_image
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path("upload-image/", views.upload_image, name="upload_image"),
    path("generate-image/", views.generate_image, name="generate_image"),
 ] 
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)