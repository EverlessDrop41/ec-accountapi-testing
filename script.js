//Google login test for firebase
var fb = new Firebase("https://everlesslychatting.firebaseio.com/");
var authData = fb.getAuth();

var userName = "";
var userEmail = "";
var accountType = "";

fb.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
});

$(document).ready(function(){
  $("#Login").click(function() {
    login("google");
  });
  //Account Check
  if(authData){
    $("#Login").hide();
    accountType = authData.provider;
    //Go through possible account types
    switch (accountType){
      case "google":
        userName = authData.google.displayName;
        userEmail = authData.google.email;
        displayAccountInfo();
        break;
      }
  }
  else{
    alert("failed");
  }
})

function login(accountSys){
  if (accountSys == "google") {
    fb.authWithOAuthRedirect("google", function(error, authInfo) {
      if(error){
        alert(error);
      }
    }, {
      remember: "sessionOnly",
      scope: "email"
    });
  }
}

function displayAccountInfo(){
  accountData = "Name: " + userName + "<br>" + "Email: " + userEmail + "<br>" + "Account Type: " + accountType;
  console.log(accountData);
  $("#accountInfo").append(accountData);
}

function displayChatMessage(name, text) {
  $messageToDisplay = "<div class='message'> <em class='userNameDisplayer'>" + name + "</em>  :" + "&#9;&#9;&#9;" + text + "</div>";
  $('#messageBox').prepend($messageToDisplay);
};
