import $ from 'jquery';

import {
    deleteTask,
    indexTasks,
    markComplete,
    markActive,
    postTask,
} from "./requests.js";

$(document).ready(function() {

    indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
            var taskCompleted = task.completed == 1 ? 'text-decoration-line-through' : '';
            return "<div class='d-flex mb-3 p-2 border rounded task' data-id='" + task.id + "'> " +
                        "<div class='flex-grow-1 " + taskCompleted + "'>" + task.content + "</div>" +
                        "<button class='btn btn-success complete-task me-2' data-id='" + task.id + "'>✔</button>" +
                        "<button class='btn btn-danger delete-task' data-id='" + task.id + "'>X</button>" +
                    "</div>";
        });
        
        $("#tasks").html(htmlString);
    });

    // Event listener for adding new task
    $('#add-new-task').on('submit', function(event) {
        event.preventDefault();

        var content = $('#task-content').val();

        postTask(content, function(response) {
            // Success callback
            location.reload();
        }, function(error) {
            // error callback
            console.error('Failed to add task:', error);
        });
    });

    // Event listener for deleting task
    $('#tasks').on('click', '.delete-task', function() {
        var taskId = $(this).data('id');
        deleteTask(taskId, function(response) {
            location.reload();
        }, function(error) {
            console.error('Failed to delete task:', error);
        });
    });

    // Event listener for marking task active/inactive
    $('#tasks').on('click', '.complete-task', function() {
        var taskId = $(this).data('id');

        if ($(this).siblings('.flex-grow-1').hasClass('text-decoration-line-through')) {
            markActive(taskId, function(response) {
                location.reload();
            }, function(error) {
                console.error('Failed to mark task active:', error);
            });
        } else {
            markComplete(taskId, function(response) {
                location.reload();
            }, function(error) {
                console.error('Failed to mark task complete:', error);
            });
        };
    });
});
