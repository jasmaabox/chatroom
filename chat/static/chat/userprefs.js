var glob_handle_color = "#00ff00";

function setCookie(name, val){
  document.cookie = name+"="+val;
}

function setColorPref(picker){
  glob_handle_color = picker.toHEXString();
  setCookie('handle_color', glob_handle_color);
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
  glob_handle_color = handle_color;
  document.getElementById('handle-color').jscolor.fromString(glob_handle_color);
}
