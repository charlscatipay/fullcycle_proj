from django.urls import path
from .views import Home, Transact

urlpatterns = [
    path('',Home.as_view(), name="home"),
    path('full/transact/', Transact.as_view(), name="full-transact")
]