import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
location = lambda x: os.path.realpath(os.path.join(BASE_DIR, x))

SECRET_KEY = 'a*656y-p4xh%o^6-1gaa27ip)#nlf^$fez9vqh%q$1-6^6o16-'

DEBUG = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'monitor.collector',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'monitor.urls'

WSGI_APPLICATION = 'monitor.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': location('monitor.db'),
    }
}

LANGUAGE_CODE = 'es-BO'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = location('public/static/')

MEDIA_URL = '/media/'
MEDIA_ROOT = location('public/media/')

STATICFILES_DIRS = (
    location('monitor/static'),
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

TEMPLATE_DIRS = (
    location('monitor/templates'),
)

WEBSITE_NAME = 'monitor'
WEBSITE_DESCRIPTION = 'application'
WEBSITE_AUTHOR = 'Victor Aguilar - @jvacx'