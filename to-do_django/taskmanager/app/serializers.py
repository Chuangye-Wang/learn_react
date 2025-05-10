from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    # To make id to be post or written. Otherwise, it is automatically generated and
    # can only be read
    id = serializers.IntegerField()

    class Meta:
        model = Task
        fields = ["id", "title", "description", "assignee", "due_date", "labels"]
        # fields = "__all__"
