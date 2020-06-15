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
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.engine import reflection
# from flask_marshmallow import Marshmallow
# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field

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

db = SQLAlchemy(app)
meta = db.metadata
engine = db.engine
# session = scoped_session(sessionmaker(bind=engine))
insp = reflection.Inspector.from_engine(engine)

# Models
db_2019_table = Table('db_2019', meta, autoload=True, autoload_with=engine)
class db_2019(db.Model):
    __tablename__ = 'db_2019'

distinct_weather_table = Table('distinct_weather', meta, autoload=True, autoload_with=engine)
class distinct_weather(db.Model):
    __tablename__ = 'distinct_weather'

# # Marshmallow Schemas
# class db_2019Schema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = db_2019
#         include_relationships = True
#         load_instance = True

# class distinct_weatherSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = distinct_weather
#         include_relationships = True
#         load_instance = True

# Creating route that renders index.html template
@app.route("/", methods=['GET'])
def home():
    
        return render_template('index.html')

# --- query examples ----
# distinct_weather.query.with_entities(distinct_weather.weather_condition).all()
# distinct_weather.query
# db2019.query.filter(db2019.weather_condition == 'Fair')

# Creating route for the data calls
@app.route("/dropdown", methods=['GET'])
def dropdown():

    if request.method == 'GET':
        weaList = distinct_weather.query.with_entities(distinct_weather.weather_condition).all()

    return jsonify(weaList)

@app.route("/data", methods=['POST'])
def data():

# POST means we've got a postback requesting filtered data.
    if request.method == 'POST':
        response = db_2019.query.with_entities(db_2019.start_lat, \
        db_2019.start_lng, \
        db_2019.city, \
        db_2019.zipcode, \
        db_2019.visibility, \
        db_2019.weather_condition, \
        db_2019.temperature, \
        db_2019.severity, \
        db_2019.start_time).limit(10000).all()

    return jsonify(response)

        # Handle the filtering of data as needed and bind.
        # Data that is posted back is held in the request object
        # weather = request.form.get('weather')
        # env = request.form.get("env")

        # weaList = distinct_weather.query.with_entities(distinct_weather.weather_condition).all()
        # newList = []
        # for item in weaList:
        #     newList.append(item)
        # weaList = [item.replace("'", "") for item in weaList]
        # newList = [item.replace("'", "") for item in newList]
        # print(newList)
        # weaList = weaList.to_dict()
        # for item in newList:
        #     if item == (f"('{weather}',)"):
        #         print(item)
        # logging.info(weather)
        # if weather == "Cloudy":
        #     print("true")

    # return jsonify(newList)
    #     # envOption = request.get_json(env)
    #     logging.info("POSTed!")

    #     # for row in request:
    #     #     pp.pprint(row.__dict__)

    #     # model_list = [bump, crossing, give_way, junction, no_exit, railway, roundabout, station, stop, traffic_calming, traffic_signal, turning_loop]

    #     # for model in model_list:
    #     #     if model == request[env]:
    #     #         envQ = model.query
    #     # weaList = distinct_weather.query.with_entities(distinct_weather.weather_condition).all()
    #     weaQ = db_2019.query
    #     weaFilt = weaQ.filter_by(weather_condition={weather})
    #     # jsonWea = json.dumps(weaList)
    #     # print 
    #     # for object in jsonWea:
    #     #     print(object)
    #     #     if item == weather:
    #     #         weaQ = db_2019.query.with_entities(db_2019.weather_condition == item).all()
    
    # # # for row in weaList:
    # # #     pp.pprint(row.__dict__)
    # # #     weaList = pp.pprint(weaList)

    # # return jsonify(envQ, weaQ)
    # # return json.dumps([row.__dict__ for row in weaQ])
    # # return json.dumps([row.__dict__ for row in query])
    # return jsonify(weaFilt.all().as_dict())
    #     weaC = db_2019(weather_condition="Fair")
    #     weaC_schema = db_2019Schema()
    #     dump_data = weaC_schema(weaC)
    #     session.add(weaC)
    #     session.commit()

    #     print(dump_data)
    # return dump_data

    
    # -- Out of ideas --
    # can't run list comprehension on result object, tried to convert result to new list, still registers as the response rather than actual list
    # can't run query filter against uncomprehended list elements due to undesired characters
    # json.dumps() returns list by character rather than by item, indicating that each item isn't being properly recognized?
    # jsonify returns proper list of variables
    # unable to set list as jsonified version of itself, leaving me unable to create parseable format
    # psycopg2 can't set values variably, meaning I need to set the variable before I query
    # cannot iterate through response objects
    # iterating through list returns last value in list, unable to apply formatting to conditional in order to return appropriate value regardless
    # attempted to incorporate marshmallow as a means to parse, schema object not callable
    # only option is to hardcode each of the 101 weather variables and run matches against those?
    # would need to then code coditionals for when both the weather variables and the environmental variable match
    # when checking for presence of environmental selection, would need to add check for weather condition selection, and then rerun weather conditionals
    # could create a function to run the weather conditional check and apply from here, but would still result in about 200 lines of code
    # SQLAlchemy has no native ability to jsonify returned list, and I am unable to run parsing against any response objects generated.
    # can't think of efficient way to create variable marker generation as theorhetically working methods would generate massive loadtimes..

        

if __name__ == "__main__":
    app.run(debug=True)