from django.db import models
import folium
from folium import plugins
import os
import json
import string
import numpy as np
import pandas as pd
# from ediblepickle import checkpoint
import xml.etree.cElementTree as et
import datetime


class DataAccess(models.Model):
    # Model for accessing NYC Open Data APIs
    pass


class Map(models.Model):
    # Model for creating instance of a map with folium
    m = folium.Map(location=[40.7128, -74.0060], zoom_start=12)

    m.save('map.html')


dataVis = Map()
