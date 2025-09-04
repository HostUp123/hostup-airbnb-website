from flask import render_template, request, flash, redirect, url_for
from app import app, db
from forms import ContactForm
from models import Contact

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/testimonials')
def testimonials():
    return render_template('testimonials.html')

@app.route('/faqs')
def faqs():
    return render_template('faqs.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    
    if form.validate_on_submit():
        try:
            contact_entry = Contact(
                name=form.name.data,
                email=form.email.data,
                phone=form.phone.data,
                property_location=form.property_location.data,
                message=form.message.data
            )
            
            db.session.add(contact_entry)
            db.session.commit()
            
            flash('Thank you for your message! We will get back to you within 24 hours.', 'success')
            return redirect(url_for('contact'))
            
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error saving contact form: {e}")
            flash('There was an error submitting your message. Please try again.', 'error')
    
    return render_template('contact.html', form=form)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500
