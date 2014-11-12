//This script used to manage the account editor
$(document).ready(function() {
    var notLoggedInBox =  $("#notLoggedIn");
    var loggedInBox = $("#loggedInBox");
    fb.onAuth(function () {
        //We do a timeout to make sure logged in is the right value
        setTimeout(function (){
            if (loggedIn){
                notLoggedInBox.hide();
                loggedInBox.show();
            }
            else{
                notLoggedInBox.show();
                loggedInBox.hide();
            }
        },500);    
    });
    //The custom name 
    $("#customSubmit").click(function () {
        var newUserName = $("#customName").val();
        newUserName = validateName(newUserName);
        if (confirm("Do you want to change your display name to " + newUserName + "?")){
            currentAccount.update({"customUserName": newUserName});
            changeDefaultAccount("custom",userBaseEmail);
        }
    });
    
    $("#customName").keypress(function (k){
        if (k.keyCode == 13){
            $("#customSubmit").click();
        }
    });
    //External account name
    $("#googleDefault").click(function (){
        login("google");
        console.log(userBaseEmail);
        changeDefaultAccount("google",userBaseEmail);
    });
    $("#facebookDefault").click(function (){
        login("facebook");
        changeDefaultAccount("facebook",userBaseEmail);
    });
    $("#githubDefault").click(function (){
        login("github");
        changeDefaultAccount("github",userBaseEmail);
    });
    
});


//Functions
function validateName(nameToValidate){
    var outputName = "";
    for (var i = 0; i < nameToValidate.length; i++){
        if (nameToValidate.charAt(i) != "."){
            outputName += nameToValidate.charAt(i);
        }
    }
    return (outputName);
}