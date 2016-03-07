$(function () {
    var socket = io.connect();
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chatWindow');
    var $usernameForm = $('#usernameForm');
    var $users = $('#users');
    var $username = $('#username');
    //var $error = $('#error');

    $usernameForm.submit(function (e){
        e.preventDefault();
        socket.emit('new user', $username.val(), function (data) {
            if(data){
                $('#namesWrapper').hide();
                $('#mainWrapper').show();
            } else {
                Materialize.toast('Username is already taken', 4000);
                //$error.html('Username is already taken');
            }
        });
        $username.val('');
    });

    socket.on('usernames', function (data) {
       var html = '<div class="card-panel blue darken-2 white-text"><h5>Members Online</h5><br><div class="divider"></div><br><br>';
        for(var i = 0; i < data.length; i++) {
            html += data[i] + '<br/>';
        }
        html += '</div';
        $users.html(html);
    });

    $messageForm.submit(function (e) {
        e.preventDefault();
        socket.emit('send message', $message.val());  //emit event
        $message.val('');
    });


    // receive server response

    socket.on('new message', function (data) {
        console.log(data.msg);
        $chat.append('<strong class="green-text darken-2">'+ data.user +'</strong> : ' + data.msg + '<br/>');
    })
});