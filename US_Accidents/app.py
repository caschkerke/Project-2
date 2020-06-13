# import necessary libraries.
import os
import sqlalchemy
import json
import numpy as np
import logging
import pprint as pp
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, func, create_engine, MetaData, Column, Text, Integer, Date, TIMESTAMP, REAL, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost/db_2019"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db functions as engine with app configuration as is
db = SQLAlchemy(app)

class db2019(db.Model):

    __tablename__ = 'db_2019'

    ID = db.Column(db.Text, primary_key=True)
    severity = db.Column(db.Integer)
    start_time = db.Column(db.TIMESTAMP)
    end_time = db.Column(db.Text)
    start_lat = db.Column(db.REAL)
    start_lng = db.Column(db.REAL)
    city = db.Column(db.Text)
    state = db.Column(db.Text)
    zipcode = db.Column(db.Text)
    weather_timestamp = db.Column(db.Text)
    temperature = db.Column(db.REAL)
    wind_chill = db.Column(db.REAL)
    humidity = db.Column(db.REAL)
    pressure = db.Column(db.REAL)
    visibility = db.Column(db.REAL)
    wind_direction = db.Column(db.Text)
    wind_speed = db.Column(db.REAL)
    precipitation = db.Column(db.REAL)
    weather_condition = db.Column(db.Text)
    Bump = db.Column(db.Integer)
    Crossing = db.Column(db.Integer)
    Give_Way = db.Column(db.Integer)
    Junction = db.Column(db.Integer)
    No_Exit = db.Column(db.Integer)
    Railway = db.Column(db.Integer)
    Roundabout = db.Column(db.Integer)
    Station = db.Column(db.Integer)
    Stop = db.Column(db.Integer)
    Traffic_Calming = db.Column(db.Integer)
    Traffic_Signal = db.Column(db.Integer)
    Turning_Loop = db.Column(db.Integer)

# Creating route that renders index.html template
@app.route("/")
def home():
    # POST means we've got a postback requesting filtered data.
    if request.method == 'POST':
        # Handle the filtering of data as needed and bind.
        # Data that is posted back is held in the request object
        # request.form['fieldname']

        logging.info("POSTed!")
        q = db2019.query.filter(db2019.weather_condition == 'Fair')

        return render_template("index.html", q=q)
    else:
        q = db2019.query.filter(db2019.weather_condition == 'Fair')
        for row in q:
            pp.pprint(row.__dict__)
        return render_template('index.html')

# Creating route for the data calls
# @app.route("/data", methods=['POST', 'GET'])
# def data():

    # q = session.query(db2019).filter(db2019.weather_condition == 'Fair')
    # # q = db2019.query(db2019.Weather_Condition).first()
    # qprint = print(q)

    # return qprint
        

if __name__ == "__main__":
    app.run(debug=True)