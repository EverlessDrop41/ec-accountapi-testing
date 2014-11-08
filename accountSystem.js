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
  $("#loginWithFacebook").click(function() {
    login("facebook");
  });
  $("#loginWithGithub").click(function() {
    login("github");
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
        switch (accountType){
          case "google":
            //Assign some data from the auth
            userName = authData.google.displayName;
            userEmail = authData.google.email;
            userBaseEmail = convertEmail(userEmail.toString());
            userId = authData.google.id;
            //Log the account into the database
            currentAccount = userBase.child(userBaseEmail);
            updateAccount(userBaseEmail, "google", userId);
            checkDefaultAccount(false, "google", userBaseEmail);
            //Display our data
            displayAccountInfo();
            break;
          case "github":
            userName = authData.github.username;
            userEmail = authData.github.email;
            userBaseEmail = convertEmail(userEmail.toString());
            userId = authData.github.id;
            //Log the account into the database
            currentAccount = userBase.child(userBaseEmail);
            updateAccount(userBaseEmail, "github", userId);
            checkDefaultAccount(false, "github", userBaseEmail);
            //Display our data
            displayAccountInfo();
            break;
          case "facebook":
            //Assign data form our auth
            userName = authData.facebook.displayName;
            userEmail = authData.facebook.email;
            userBaseEmail = convertEmail(userEmail.toString());
            userId = authData.facebook.id;
            //Log the account into the database
            currentAccount = userBase.child(userBaseEmail);
            updateAccount(userBaseEmail, "facebook", userId);
            checkDefaultAccount(false, "facebook", userBaseEmail);
            //Display our data
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

/* Create Account
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
}*/

function updateAccount(email,valueToUpdate,data){
    email = convertEmail(email);
    userAccount = userBase.child(email);
    switch (valueToUpdate.toLowerCase()){
        case "g":
        case "google":
            userAccount.update({"googleId":data});
            break;
        case "f":
        case "fb":
        case "facebook":
            userAccount.update({"facebookId":data});
            break;
        case "gh":
        case "github":
            userAccount.update({"githubId":data});
            break;
    }
}

function checkDefaultAccount(forceOveride, accountType, email){
    var dataExists = true;
    if (forceOveride === true){
        userBase.child(email).update({"defaultAccount": accountType});  
    }
    else {
        userBase.child(email).child("defaultAccount").once('value',function(snapshot){
            if (snapshot.val() == null){
                userBase.child(email).update({"defaultAccount": accountType});
            }
        });
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
        scope: "email"
      });
      break;
    case "github":
      fb.authWithOAuthRedirect("github", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        scope: "user"
      });
      break;
    case "facebook":
      fb.authWithOAuthRedirect("facebook", function(error, authInfo) {
        if(error){
          alert(error);
        }
      }, {
        scope: "email, public_profile"
      });
      break;      
  }
}

function displayAccountInfo(){
  accountData = "Hello " + userName + " you are logged in using " + accountType + ".";
  $("#accountInfo").text(accountData);
}