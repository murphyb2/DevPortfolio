from rest_framework import routers
from .api import ProjectViewSet

router = routers.DefaultRouter()
router.register('api/projects', ProjectViewSet, basename='project')

urlpatterns = router.urls
