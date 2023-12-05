from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String

db = SQLAlchemy()

class Person(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    surname = Column(String)
    job = Column(String)