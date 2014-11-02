var fb = new Firebase("https://everlesslychatting.firebaseio.com/");
var authData = fb.getAuth();

var userName = "";
var userEmail = "";
var accountType = "";

fb.onAuth(function(authInfo){
    authData = fb.getAuth();
    accountCheck();
});

$(document).ready(function(){
  $("#loginWithGoogle").click(function() {
    login("google");
  });
  $("#loginWithGithub").click(function() {
    login("github");
  });
  $("#loginWithTwitter").click(function() {
    login("twitter");
  });
  $("#loginWithFacebook").click(function() {
    login("facebook");
  });
  $("#logout").click(function() {
    fb.unauth();
  });
  accountCheck();
});

function accountCheck(){
    if(authData){
        //User is logged in
        $("#accountInfo").show();
        $("#loginSection").hide();
        $("#messageInputArea").show();
        $("#logout").show();
        accountType = authData.provider;
        console.log(accountType);
        switch (accountType){
          case "google":
            userName = authData.google.displayName;
            userEmail = authData.google.email;
            displayAccountInfo();
            break;
          case "github":
            userName = authData.github.username;
            userEmail = authData.github.email;
            displayAccountInfo();
            break;
          case "twitter":
            userName = authData.twitter.displayName;
            userEmail = "Twitter does not let us access email";
            displayAccountInfo();
            break;
          case "facebook":
            userName = authData.facebook.displayName;
            userEmail = authData.facebook.email;
            displayAccountInfo();
            break;
          default :
            $("logout").hide();
        }
    }
    else{
        $("#loginSection").show();
        $("#messageInputArea").hide();
        $("#logout").hide();
        $("#accountInfo").hide();
    }
}

function login(accountSys){
  switch (accountSys){
    case "google":
      fb.authWithOAuthRedirect("google", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        remember: "sessionOnly",
        scope: "email"
      });
      break;
    case "github":
      fb.authWithOAuthRedirect("github", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        remember: "sessionOnly",
        scope: "user"
      });
      break;
    case "twitter":
      fb.authWithOAuthRedirect("twitter", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        remember: "sessionOnly"
      });
      break;
    case "facebook":
      fb.authWithOAuthRedirect("facebook", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        remember: "sessionOnly",
        scope: "email, public_profile"
      });
      break;      
  }
}

function displayAccountInfo(){
  accountData = "Hello " + userName + " you are logged in using " + accountType + ".";
  console.log(accountData);
  $("#accountInfo").text(accountData);
}