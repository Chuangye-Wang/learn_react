from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    # task_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "description", "assignee", "due_date", "labels"]
        # fields = "__all__"
