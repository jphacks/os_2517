from django.urls import path
from .views import get_weather,get_map_file, generate_ai_image

urlpatterns = [
    path('weather/', get_weather),  # ← これを追加！
    path('map/', get_map_file),
    path('generate_ai_image/', generate_ai_image),
]
