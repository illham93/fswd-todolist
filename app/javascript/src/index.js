import $ from 'jquery';

import {
    indexTasks,
    postTask,
} from "./requests.js";

$(document).ready(function() {

    indexTasks(function (response) {
        var htmlString = response.tasks.map(function(task) {
            return "<div class='d-flex mb-3 p-2 border rounded task' data-id='" + task.id + "'> " +
                        "<div class='flex-grow-1'>" + task.content + "</div>" +
                        "<button class='btn btn-success me-2' id='complete-task-" + task.id + "'>✔</button>" +
                        "<button class='btn btn-danger' id='delete-task-" + task.id + "'>X</button>" +
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
            // location.reload();
            console.log(success);
        }, function(error) {
            // error callback
            console.error('Failed to add task:', error);
        });
    });
})
