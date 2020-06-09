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
from .models import (
    db2016, db2017, db2018, db2019
    )

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///all_data.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


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
    results = db.session.query(db2016.Weather_Condition, 
                               db2017.Weather_Condition, 
                               db2018.Weather_Condition, 
                               db2019.Weather_Condition).all()
    
    return jsonify(results)

@app.route("/api/data2016")
def data2016():
    results = db2016.query.all()

    return jsonify(results)

@app.route("/api/data2017")
def data2017():
    results = db2017.query.all()

    return jsonify(results)

@app.route("/api/data2018")
def data2018():
    results = db2018.query.all()

    return jsonify(results)

@app.route("/api/data2019")
def data2019():
    results = db2019.query.all()

    return jsonify(results)

if __name__ == "__main__":
    app.run()
    