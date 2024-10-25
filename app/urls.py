from django.urls import path
from . import views

urlpatterns = [
    
    path("",views.index),
    path("ajax",views.ajax),
    path("home",views.home),
    path("process_input",views.process_input),
    path("login",views.login ),
    path("signup",views.signup ),
    path("play1",views.play1),
    path("get-text",views.gettext),
]