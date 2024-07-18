# app/routes.py

from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/register')
def register():
    return render_template('register.html')

@main.route('/feed')
def feed():
    return render_template('feed.html')

@main.route('/logout')
def logout():
    return render_template('logout.html')

@main.route('/signup')
def signup():
    return render_template('signup.html')
