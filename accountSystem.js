var fb = new Firebase("https://everlesslychatting.firebaseio.com/");
var userBase = fb.child("users");
var authData = fb.getAuth();

/*
An account in JSON

The user's name is their email with all dots removed

"test@testcom": {
    "googleUid": "G00g1e",
    "facebookUid": "Fac3b00k",
    "twitterUid": "Twitt3r",
    "githubUid": "G1thu|3"
    }
}

*/

var userName = "";
var userEmail = "";
var accountType = "";

fb.onAuth(function (authInfo ) {
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
        console.log(authData.uid);
        switch (accountType){
          case "google":
            userName = authData.google.displayName;
            userEmail = authData.google.email;
            //Check account with account database
            if (userBase.child(convertEmail(userEmail.toString()))){
                //Account exists
            }
            else {
                //Account doesn't exist
            }
            displayAccountInfo();
            break;
          case "github":
            userName = authData.github.username;
            userEmail = authData.github.email;
            //Check account with account database
            if (userBase.child(convertEmail(userEmail.toString()))){
                //Account exists
            }
            else {
                //Account doesn't exist
            }
            displayAccountInfo();
            break;
          case "twitter":
            /*
            userName = authData.twitter.displayName;
            userEmail = "Twitter does not let us access email";
            displayAccountInfo();
            */
            break;
          case "facebook":
            userName = authData.facebook.displayName;
            userEmail = authData.facebook.email;
            //Check account with account database
            if (userBase.child(convertEmail(userEmail.toString()))){
                //Account exists
            }
            else {
                //Account doesn't exist
            }
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

function convertEmail(emailAdr){
    if (!(emailAdr.constructor === String)) {
        return false;
    }
    else {
        var outputStr = "";
        for(var i = 0; i < emailAdr.length; i++){
            letter = emailAdr.charAt(i);
            if (letter === "."){
                outputStr += "";
            }
            else{
                outputStr += letter;
            }
        }
        return (outputStr);
    }
}

function createAccount(userEmail,googleUid,facebookUid,githubUid){
    if(!convertEmail(userEmail)){
        return false;
    }
    else {
        userEmail = convertEmail(userEmail);
    }
    var userAccount = userBase.child(userEmail);
    userAccount.set({
        googleId: googleUid,
        facebookId: facebookUid,
        githubId: githubUid
    });
}

function updateAccount(){
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
          alert("Due to lack of email access we are removing twitter login for now");
    /*
      fb.authWithOAuthRedirect("twitter", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        remember: "sessionOnly"
      });
    */
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