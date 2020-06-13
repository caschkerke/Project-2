# from .app import db

# class db2019(db.Model):

#     __tablename__ = 'db_2019'

#     id = db.Column(db.Text, primary_key=True)
#     severity = db.Column(db.Integer)
#     start_time = db.Column(db.Timestamp)
#     end_time = db.Column(db.Text)
#     start_lat = db.Column(db.Real)
#     start_lng = db.Column(db.Real)
#     city = db.Column(db.Text)
#     state = db.Column(db.Text)
#     zipcode = db.Column(db.Text)
#     weather_timestamp = db.Column(db.Text)
#     temperature = db.Column(db.Real)
#     wind_chill = db.Column(db.Real)
#     humidity = db.Column(db.Real)
#     pressure = db.Column(db.Real)
#     visibility = db.Column(db.Real)
#     wind_direction = db.Column(db.Text)
#     wind_speed = db.Column(db.Real)
#     precipitation = db.Column(db.Real)
#     weather_condition = db.Column(db.Text)
#     bump = db.Column(db.Integer)
#     crossing = db.Column(db.Integer)
#     give_way = db.Column(db.Integer)
#     junction = db.Column(db.Integer)
#     no_exit = db.Column(db.Integer)
#     railway = db.Column(db.Integer)
#     roundabout = db.Column(db.Integer)
#     station = db.Column(db.Integer)
#     stop = db.Column(db.Integer)
#     traffic_calming = db.Column(db.Integer)
#     traffic_signal = db.Column(db.Integer)
#     turning_loop = db.Column(db.Integer)

# class distwea(db.Model):

#     id = db.Column(db.Text, primary_key=True)
#     weather_condition = db.Column(db.Text)