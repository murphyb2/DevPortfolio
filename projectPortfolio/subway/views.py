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
    # if not mp.map_is_current:
    #     mp.update_map()

    # If today is not sunday, find the date of the previous sunday
    if dt.datetime.now().weekday() == 6:
        # Today is Sunday, set the date to todays date
        previous_sunday_date = dt.datetime.now().strftime("%y%m%d")
    else:
        # Find the number of days since the previous sunday
        days_since_sunday = dt.datetime.now().weekday() + 1
        previous_sunday_date = dt.datetime.now() - dt.timedelta(days=days_since_sunday)
        # Format to YYMMDD
        previous_sunday_date = previous_sunday_date.strftime("%y%m%d")
    # HARDCODING THE HTML TEMPLATE TO THE LAST SUCCESSFUL BUILD
    # REBUILDING THE HTML TEMPLATE EACH WEEK IS UNRELIABLE, CLUNKY AND KEEPS BREAKING
    # READING THE DOCS TO SEE WHAT A BETTER APPROACH WOULD BE
    return render(request, f'index.html')
    # return render(request, f'index_{previous_sunday_date}.html')
