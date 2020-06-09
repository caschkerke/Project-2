# import necessary libraries
import os
import sqlalchemy
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///all_data.sqlite"

# # Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from .models import ( db2016, 
                      db2017, 
                      db2018, 
                      db2019 )

# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine
# engine = create_engine("sqlite:///all_data.sqlite")
# Base = declarative_base()
# Base.metadata.reflect(engine)
# class db2016(Base):
#     __table__ = Base.metadata.tables['db_2016']
# session = Session(engine)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/weather")
def weather():
    results = db.session.query(db_2016.Weather_Condition, 
                               db_2017.Weather_Condition, 
                               db_2018.Weather_Condition, 
                               db_2019.Weather_Condition).all()
    
    return jsonify(results)

@app.route("/api/environment")
def environment():

    environments = db.session.query(func.count)
        
    return jsonify(environments)

@app.route("/api/db2016")
def db2016():
    results = db.sess

@app.route("/api/db2017")
def db2017():
    

@app.route("/api/db2018")
def db2018():
    

@app.route("/api/db2019")
def db2019():
    