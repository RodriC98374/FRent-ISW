from django.db import models
from users.models import Friend, Client

class NotificacionInterno(models.Model):
    from_user = models.ForeignKey(Friend, on_delete=models.CASCADE)
    to_user = models.ForeignKey(Client, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=50)
    is_reading = models.BooleanField(null=True, default=False, blank=True)
    
    class Meta():
        ordering = ['-created']


