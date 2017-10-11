var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);

// Formats chat message in table
chatsock.onmessage = function(message){
  var data = JSON.parse(message.data);
  $('#chat').append(
    '<tr>' +
    '<td>' + data.handle + ": " + data.message + '</td>'
    + '</tr>'
  );
};

// Sends data when form is submitted
$('#chatform').on('submit', function(event){
  var message = {
    handle: $('#handle').val(),
    message: $('#message').val(),
  }
  chatsock.send(JSON.stringify(message));
  return false;
});
