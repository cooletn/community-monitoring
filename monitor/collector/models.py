from django.db import models
from django.utils.translation import ugettext_lazy as _


class Node(models.Model):
    node_id = models.IntegerField(
        verbose_name=_('Node identificator'),
        db_index=True,
        help_text=_('Identificator of the Node'),
    )

    temperature = models.DecimalField(
        verbose_name=_('Temperature'),
        db_index=True,
        help_text=_('Temperature of the Node in C'),
        max_digits=4,
        decimal_places=4
    )

    moisture = models.IntegerField(
        verbose_name=_('Moisture'),
        help_text=_('Moisture of tehe Node'),
    )

    date = models.DateTimeField(
        verbose_name=_('Date'),
        help_text=_('Date of the capture'),
        auto_now=True,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _('Node')
        verbose_name_plural = _('Nodes')

    def __unicode__(self):
        return "%s - %s" % (self.node_id,self.temperature)