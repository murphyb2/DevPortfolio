from django.db import models
import folium
from folium import plugins
import os
import json
import string
import numpy as np
import pandas as pd
import datetime as dt
import shutil as sh


class MapPrep(models.Model):

    def update_map(self):
        "Updates map file when needed"
        stations = pd.read_csv(os.path.join(
            os.getcwd(), 'subway/Stations.csv'))
        turnstile_data = pd.read_csv(
            os.path.join('', 'subway/turnstile_190608.csv'))
        lines = os.path.join('', 'subway/SubwayLines.geojson')

        # Merge the station data with the turnstile data
        merged_df = pd.merge(turnstile_data, stations,
                             on="STATION", how="inner", indicator=True)
        # Drop empty rows from the data frame
        merged_df = merged_df.dropna()
        # Get the relevant columns from our merged table
        df = merged_df[['STATION', 'ENTRIES', 'EXITS',
                        'GTFS Latitude', 'GTFS Longitude']]

        # Create array with just the unique station names
        unique_stations_array = merged_df.STATION.unique()

        row_list = []

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

        # Heat map data of entries into stations
        hm_entries = final_df[['Latitude', 'Longitude', 'Entries']]
        # Heat map data of exits from stations
        hm_exits = final_df[['Latitude', 'Longitude', 'Exits']]

        ##### Create the map object #####
        m = folium.Map(location=[40.743132, -73.918435],
                       zoom_start=11, name='NYC Subway Data')

        # Add the subway lines
        folium.GeoJson(lines, name='Subway Lines').add_to(m)

        # Apply Heat Map of entries into station
        folium.plugins.HeatMap(
            hm_entries, radius=40, blur=65, name='Heat Map of Entries Into Stations in One Week', show=False).add_to(m)

        # Apply Heat Map of exits into station
        folium.plugins.HeatMap(
            hm_exits, radius=40, blur=65, name='Heat Map of Exits From Stations in One Week', show=False).add_to(m)

        # Add layer control to the map
        folium.LayerControl().add_to(m)

        # Save the new map to the templates folder
        m.save(os.path.join(
            '', f'subway/templates/index_{dt.datetime.now().strftime("%y%m%d")}.html'))

        # Move the previous weeks map to an archive folder
        previous_sunday_date = dt.datetime.now() - dt.timedelta(days=7)
        # Format to YYMMDD
        previous_sunday_date = previous_sunday_date.strftime("%y%m%d")

        sh.move(os.path.join(
            '', f'subway/templates/index_{previous_sunday_date}.html'), os.path.join('', 'subway/archive'))

    @property
    def map_is_current(self):
        "Indicates whether the map is up to date or if new data has been posted"
        # Currently the only data we are getting is the MTA Turnstile data
        # New data is posted every Saturday so if today is Sunday and we haven't created a new map
        # then we need to update

        if dt.datetime.now().weekday() == 6:
            # Today is Sunday, check the html file to see if we have already updated
            previous_sunday_date = dt.datetime.now() - dt.timedelta(days=7)
            # Format to YYMMDD
            previous_sunday_date = previous_sunday_date.strftime("%y%m%d")

            if os.path.isfile(os.path.join('', f'subway/index_{previous_sunday_date}.html')):
                # We've already updated the map so no need to do it again
                return True
            else:
                return False
        # No new data so we are current
        return True
