from django.db import models
from users.models import User

class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_chats")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_chats")
    senderName = models.CharField(max_length=250, default="Unknown Sender")
    recipientName = models.CharField(max_length=250, default="Unknown Recipient")
    message = models.CharField(max_length=1000)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']
        verbose_name_plural = "chats"

    def __str__(self):
        return f"{self.sender} -> {self.receiver}"
