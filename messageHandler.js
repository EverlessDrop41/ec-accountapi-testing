//Google login test for firebase
var fb = new Firebase("https://everlesslychatting.firebaseio.com/");


$(document).ready(function(){
    //Listen for send request
    $("#sendButton").click(function() {
        submitMessageToFireBase();
    });

    $('#messageInput').keypress(function(e){
        if (e.keyCode == 13 ){
            submitMessageToFireBase()
        }
    });
    
    function submitMessageToFireBase(){
        var name = userName;
        var text = $("#messageInput").val().trim();
        isNameValid = isValidMsg(name);
        isMsgValid = isValidMsg(text);
        if (isNameValid && isMsgValid) {
          fb.push({
            name: name,
            text: text
          });
          $('#messageInput').val('');
        }
        else {
            alert("Invalid inputs \n" + "Is name valid: " + boolToYN(isNameValid) + 
            "\n" + "Is message valid: " + boolToYN(isMsgValid));
        }
    }
});

fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    if (!(message.name == undefined || message.text == undefined)){
        displayChatMessage(message.name, message.text);
    }
});

function displayChatMessage(name, text) {
    $messageToDisplay = "<div class='message'> <em class='userNameDisplayer'>" + name + "</em>  :" + "&#9;&#9;&#9;" + text + "</div>";
    $('#messageBox').prepend($messageToDisplay);
};

function isValidMsg(msg) {
  var spaces = 0;
  //Check if value is a string
  if (!(typeof msg == "string")) {
   //alert("String not detected");
    return false;
  }

  if (msg.trim().length == 0) {
    return false;
  }
  return true;
}   

function boolToYN(boolVal) {
  if (boolVal == true) {
    return "Yes";
  } else {
    return "No";
  }
}