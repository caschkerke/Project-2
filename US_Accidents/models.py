from .app import db

class db2016(db.Model):
    __table__ = db.Model.metadata.tables['db_2016']

class db2017(db.Model):
    __table__ = db.Model.metadata.tables['db_2017']

class db2018(db.Model):
    __table__ = db.Model.metadata.tables['db_2018']

class db2019(db.Model):
    __table__ = db.Model.metadata.tables['db_2019']
