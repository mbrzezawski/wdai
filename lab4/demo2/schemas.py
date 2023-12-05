from flask_marshmallow import Marshmallow
from models import Person

ma = Marshmallow()

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

    @ma.post_load
    def make_user(self, data, **kwargs):
        return Person(**data)