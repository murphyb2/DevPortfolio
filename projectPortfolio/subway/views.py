from datetime import datetime
from django.shortcuts import render
from django.views import generic
import os
import datetime as dt
from subway.models import MapPrep

# View render requests


def index(request):
    """View function for main page of site"""

    mp = MapPrep()
    # If the map is not up to date then update it
    if not mp.map_is_current:
        mp.update_map()

    # Find the number of days since the previous sunday
    days_since_sunday = dt.datetime.now().weekday() + 1
    previous_sunday_date = dt.datetime.now() - dt.timedelta(days=days_since_sunday)
    # Format to YYMMDD
    previous_sunday_date = previous_sunday_date.strftime("%y%m%d")

    return render(request, f'index_{previous_sunday_date}.html')
