from django.urls import path
from django.http import HttpResponse
from .views import hello, get_weather, get_map_file, generate_ai_image, generate_scene

urlpatterns = [
    path('', lambda request: HttpResponse("✅ EmoApp backend is running!"), name='index'),
    path('hello/', hello),
    path('weather/', get_weather),
    path('map/', get_map_file),
    path('generate_ai_image/', generate_ai_image),
    path('generate_scene/', generate_scene),
]
