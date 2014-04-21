from random import random, randint
from django.shortcuts import render

from django.views.generic import TemplateView
from monitor.collector.models import Node

class LandingView(TemplateView):
    template_name = 'landing.html'


class GenerateView(TemplateView):
    template_name = 'generate.html'

    def get(self, request, *args, **kwargs):
        context = super(GenerateView, self).get(request, args, kwargs)

        x=[randint(0,10) for p in range(0,10)]
        for i in range(0, 200):
            node = Node()
            node.node_id = randint(0, 10)
            node.moisture = randint(0, 100)
            node.temperature = random()
            node.save()
        return context





