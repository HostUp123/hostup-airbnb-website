from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, validators
from wtforms.validators import DataRequired, Email, Length, Optional

class ContactForm(FlaskForm):
    name = StringField('Full Name', [
        DataRequired(message='Name is required'),
        Length(min=2, max=100, message='Name must be between 2 and 100 characters')
    ])
    
    email = StringField('Email Address', [
        DataRequired(message='Email is required'),
        Email(message='Please enter a valid email address')
    ])
    
    phone = StringField('Phone Number', [
        Optional(),
        Length(min=10, max=20, message='Please enter a valid phone number')
    ])
    
    property_location = SelectField('Property Location', 
        choices=[
            ('', 'Select a city'),
            ('jaipur', 'Jaipur'),
            ('delhi', 'Delhi'),
            ('mumbai', 'Mumbai'),
            ('other', 'Other')
        ],
        validators=[Optional()]
    )
    
    message = TextAreaField('Message', [
        DataRequired(message='Message is required'),
        Length(min=10, max=1000, message='Message must be between 10 and 1000 characters')
    ])
