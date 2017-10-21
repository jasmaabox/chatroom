function setCookie(name, val){
  document.cookie = name+"="+val;
}

function setColorPref(picker){
  setCookie('handle_color', picker.toHEXString());
}

function loadUserPrefs(){
  var prefs = document.cookie.split(";");
  handle = "";
  handle_color = "";

  // Get pref
  for(i=0; i < prefs.length; i++){
    var current = prefs[i].split("=");
    if(current[0].trim() == "handle"){
      handle = current[1].trim();
    }
    else if(current[0].trim() == "handle_color"){
      handle_color = current[1].trim();
    }
  }

  //Set pref
  if(handle != ""){
    $('#handle').prop('value', handle);
    $('#handle').prop('disabled', true);
  }
  document.getElementById('handle-color').jscolor.fromString(handle_color);
}
