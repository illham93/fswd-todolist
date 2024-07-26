import $ from 'jquery';

var api_key = 2;

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export var indexTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=' + api_key,
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var postTask = function (content, successCB, errorCB) {
    var request = {
        type: 'POST',
        url: 'api/tasks?api_key=' + api_key,
        data: {
            task: {
                content: content
            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export var deleteTask = function (taskId, successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: 'api/tasks/' + taskId + '?api_key=' + api_key,
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
}