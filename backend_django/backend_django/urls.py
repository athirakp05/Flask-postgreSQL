from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from product.views import ProductViewSet

router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
