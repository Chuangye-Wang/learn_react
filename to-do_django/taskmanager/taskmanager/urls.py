"""
URL configuration for taskmanager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'todos', views.TaskView.as_view(), basename='todo')

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.TaskView.as_view(), name='task list'),
    path("task/", views.TaskView.as_view(), name="task"),
    path('task/<int:pk>/', views.TaskItemView.as_view(), name='task item'),
    # Add the URL pattern
    # path('api/', include(router.urls)),
]
