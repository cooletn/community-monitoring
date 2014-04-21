from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView, RedirectView

# Project imports
from monitor.collector.views import LandingView, GenerateView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', LandingView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^generate/$', GenerateView.as_view(), name='gen'),
)

if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.conf.urls.static import static

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
