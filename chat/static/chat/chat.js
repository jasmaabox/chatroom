var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + window.location.pathname);

// Clean string
function clean_str(s){
  s = DOMPurify.sanitize(s, {ALLOWED_TAGS: []});
  return s;
}

function fix_color(s){
  if(/^#[0-9A-F]{6}$/i.test(s)){
    return s;
  }
  else{
    return "#00ff00";
  }
}

// Formats chat message in table
chatsock.onmessage = function(message){
  var data = JSON.parse(message.data);

  // Sanitize
  var clean_handle = clean_str(data.handle);
  var clean_handle_color = fix_color(data.handle_color);
  var clean_message = clean_str(data.message);

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
    handle: clean_str($('#handle').val()),
    handle_color: fix_color(glob_handle_color),
    message: clean_str($('#message').val()),
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
