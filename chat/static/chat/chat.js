var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);

// Clean string
function clean_str(s){
  s = DOMPurify.sanitize(s, {ALLOWED_TAGS: []});
  return s;
}

// Formats chat message in table
chatsock.onmessage = function(message){
  var data = JSON.parse(message.data);

  // Sanitize
  var clean_handle = clean_str(data.handle);
  var clean_message = clean_str(data.message);

  $('#chat').prepend(
    '<tr>' +
    '<td><font color="green" dir="ltr">' + clean_handle + ":</font> " + clean_message + '</td>'
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
    handle: clean_str($('#handle').val()),
    message: clean_str($('#message').val()),
  }
  chatsock.send(JSON.stringify(message));

  // clear message
  document.getElementById("message").value = "";

  return false;
});
