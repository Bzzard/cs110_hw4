'use strict';

const getTODOs = function() {
    $.get('getTODOs?searchString='+encodeURIComponent($('#searchTODO').val()), function(data) {
        let todos = data;
        let html;
        if (todos && todos.length > 0) {
            html = '<table border="0" cellspacing="1" cellpadding="5">';
            let todo;
            for (let i = 0; i < todos.length; i++) {
                todo = todos[i];
                html += '<tr>' +
                            '<td><li/></td><td>' + todo.message + '</td>' +
                            '<td><input type="checkbox" onclick="markTODO(this, \'' + todo.id + '\');"' + (todo.completed ? ' checked' : '') + '/></td>' +
                            '<td><input type="button" value="Delete" onclick="removeTODO(this, \'' + todo.id + '\');" /></td>' +
                        '</tr>';
            }
            html += '</table>'
        } else {
            html = 'No TODOs Exist';
        }
            $('#todoList').html(html);
    });
}

const addTODO = function() {
    let message = $('#newTODO').val();
    if (message.length > 0) {
        $.post('addTODO?message=' + encodeURIComponent(message), function(data) {
            if (data.exist) {
                alert('Current TODO already exist.');
            } else {
                $(newTODO).val('');
                getTODOs();
            }
        });
    } else {
        alert('Please enter TODO message.');
    }
}

const removeTODO = function(btn, id) {
    $.get('removeTODO?id=' + encodeURIComponent(id), function(data) {
        getTODOs();
    });
}

const markTODO = function(checkbox, id) {
    $.get('markTODO?id=' + encodeURIComponent(id) + '&completed='+checkbox.checked, function(data) {
    });
}

const start = function() {
    $('#searchTODO').on('keyup', function (e) {
        if (e.keyCode == 13) {
            getTODOs();
        }
    });
    $('#newTODO').on('keyup', function (e) {
        if (e.keyCode == 13) {
            addTODO();
        }
    });
    getTODOs();
}

start();