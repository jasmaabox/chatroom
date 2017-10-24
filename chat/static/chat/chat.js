var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);

// Formats chat message in table
chatsock.onmessage = function(message){
  var data = JSON.parse(message.data);

  // Sanitize
  var clean_handle = data.handle;
  var clean_handle_color = data.handle_color;
  var clean_message = data.message;

  $('#chat').prepend(
    '<tr>' +
    '<td><font style="color:'+ clean_handle_color +'" dir="ltr">' + clean_handle + ":</font> " + clean_message + '</td>'
    + '</tr>'
  );

  var table = document.getElementById('chat');
  var rowCount = table.rows.length;
  var msg = document.getElementById('message');
  // pop if greater than limit
  if(rowCount > 50){
    table.deleteRow(rowCount - 1);
  }
};

// Sends data when form is submitted
$('#chatform').on('submit', function(event){
  var message = {
    handle: $('#handle').val(),
    handle_color: glob_handle_color,
    message: $('#message').val(),
  }

  console.log();

  chatsock.send(JSON.stringify(message));

  // clear message
  document.getElementById("message").value = "";

  if(message['handle'].trim() != ""){
    setCookie('handle', message['handle'])
    $('#handle').prop('disabled', true);
  }

  return false;
});
