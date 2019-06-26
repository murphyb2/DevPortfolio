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
import requests


class MapPrep(models.Model):

    def update_map(self):
        "Updates map file when needed"

        # Get the turnstile data from the MTA site
        # url = f'http://web.mta.info/developers/data/nyct/turnstile/turnstile_{dt.datetime.now().strftime("%y%m%d")}.txt'
        url = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_190608.txt'
        r = requests.get(url, allow_redirects=True)
        open('subway/turnstile.csv', 'wb').write(r.content)

        # # Get the data for the subway lines
        # url = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_190608.txt'
        # r = requests.get(url, allow_redirects=True)
        # open('turnstile.csv', 'wb').write(r.content)

        stations = pd.read_csv(
            os.path.join('', 'subway/Stations.csv'))
        # stations.rename(columns={'Stop Name': 'STATION'}, inplace=True)
        turnstile_data = pd.read_csv(
            os.path.join('', 'subway/turnstile.csv'))

        turnstile_data.rename(
            columns={turnstile_data.columns[10]: 'EXITS'}, inplace=True)
        # print(turnstile_data)
        lines = os.path.join('', 'subway/SubwayLines.geojson')

        # Merge the station data with the turnstile data
        merged_df = pd.DataFrame.merge(turnstile_data, stations,
                                       on="STATION", how="inner")

        # merged_df = stations.merge(
        #     turnstile_data, left_on='STATION', right_on='STATION', how='inner')

        # Drop empty rows from the data frame
        merged_df = merged_df.dropna()
        # merged_df.rename(columns={'Stop Name': 'STATION'}, inplace=True)
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
            hm_entries, radius=40, blur=65, name='Entries Into Stations Since Last Sunday', show=False).add_to(m)

        # Apply Heat Map of exits into station
        folium.plugins.HeatMap(
            hm_exits, radius=40, blur=65, name='Exits From Stations Since Last Sunday', show=False).add_to(m)

        # Add layer control to the map
        folium.LayerControl().add_to(m)

        # Save the new map to the templates folder
        m.save(os.path.join(
            '', f'subway/templates/index_{dt.datetime.now().strftime("%y%m%d")}.html'))

        # Move the previous weeks map to an archive folder
        previous_sunday_date = dt.datetime.now() - dt.timedelta(days=7)
        # Format to YYMMDD
        previous_sunday_date = previous_sunday_date.strftime("%y%m%d")

        try:
            sh.move(os.path.join(
                '', f'subway/templates/index_{previous_sunday_date}.html'), os.path.join('', 'subway/archive'))
        except FileNotFoundError:
            pass

    @property
    def map_is_current(self):
        "Indicates whether the map is up to date or if new data has been posted"
        # Currently the only data we are getting is the MTA Turnstile data
        # New data is posted every Saturday so if today is Sunday and we haven't created a new map
        # then we need to update

        if dt.datetime.now().weekday() == 6:
            # Today is Sunday, check the html file to see if we have already updated
            last_sunday = dt.datetime.now() - dt.timedelta(days=7)
            # Format to YYMMDD
            last_sunday = last_sunday.strftime("%y%m%d")
            last_sunday_exists = os.path.isfile(os.path.join(
                '', f'subway/index_{last_sunday}.html'))

            today = dt.datetime.now().strftime("%y%m%d")
            today_exists = os.path.isfile(
                os.path.join('', f'subway/templates/index_{today}.html'))

            if today_exists or last_sunday_exists:
                # We've already updated the map so no need to do it again
                return True
            else:
                # Haven't updated yet
                return False
        # No new data so we are current
        return True
