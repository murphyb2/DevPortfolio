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


# @checkpoint(key=string.Template('{}.csv'), work_dir='cache/', refresh=False)
# def get_subway_stations():
#     # Get location and name info of subway stations in the city
#     return pd.read_json("https://data.cityofnewyork.us/resource/kk4q-3rt2.json")


def apply_marker(point):
    folium.CircleMarker(
        location=[point['Latitude'], point['Longitude']],
        radius=10,
        popup=point['Station'],
        color='#3186cc',
        fill=True,
        fill_color='#3186cc'
    ).add_to(m)


# Read in the station and turnstile data
stations = pd.read_csv(os.path.join('', 'Stations.csv'))
turnstile_data = pd.read_csv(os.path.join('', 'turnstile_190608.csv'))

# Merge the station data with the turnstile data
merged_df = pd.merge(turnstile_data, stations,
                     on="STATION", how="inner", indicator=True)
# Drop empty rows from the data frame
merged_df = merged_df.dropna()

# Save the dataframe to a new csv file
# Not sure if this is needed anymore
# with open(os.path.join('', 'merged_data.csv'), 'w') as new_file:
#     merged_df.to_csv(new_file, na_rep='MISSING')

# Get the relevant columns from our merged table
df = merged_df[['STATION', 'ENTRIES', 'EXITS',
                'GTFS Latitude', 'GTFS Longitude']]

# Create array with just the unique station names
unique_stations_array = merged_df.STATION.unique()

row_list = []
start_time = datetime.datetime.now().time()
for station in unique_stations_array:
    total_entries = 0
    total_exits = 0

    # Get all rows that have the given station name
    record = df[df.STATION == station]

    # Sort the entries from low to high
    vals = record.ENTRIES.sort_values(ascending=True)

    # Calculate the total entries
    total_entries = vals.iloc[-1] - vals.iloc[0]

    # Sort the exits from low to high
    vals = record.EXITS.sort_values(ascending=True)

    # Calculate the total entries
    total_exits = vals.iloc[-1] - vals.iloc[0]

    # Create new row of data
    row = [station, total_entries, total_exits,
           record.iloc[0, 3], record.iloc[0, 4]]

    # Add row to running list
    row_list.append(row)

final_df = pd.DataFrame(
    row_list, index=range(len(unique_stations_array)), columns=['Station', 'Entries', 'Exits', 'Latitude', 'Longitude'])

hm = final_df[['Latitude', 'Longitude', 'Entries']]

##### Create the map object #####
m = folium.Map(location=[40.743132, -73.918435], zoom_start=11)

# Add the subway lines
lines = os.path.join('', 'SubwayLines.geojson')
folium.GeoJson(lines, name='lines').add_to(m)

# Apply subway markers
# final_df.apply(apply_marker, axis=1)
folium.plugins.HeatMap(hm, radius=40, blur=65).add_to(m)

m.save('map.html')
