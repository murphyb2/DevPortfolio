from django.shortcuts import render
from django.views import generic
import os
from datetime import datetime
from subway.models import MapPrep

# View render requests


def index(request):
    """View function for main page of site"""

    mp = MapPrep()
    currentYear = datetime.now().year
    context = {
        'currentYear': currentYear
    }
    # If the map is not up to date then update it
    # if not mp.map_is_current:
    #     mp.update_map()

    return render(request, 'layout.html', context)
