from django.db import models


class Task(models.Model):
    """Task Model."""
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    assignee = models.CharField(max_length=100, blank=True)
    due_date = models.DateField(null=True, blank=True)
    labels = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title
