//This script used to manage the account editor
$(document).ready(function() {
    var notLoggedInBox =  $("#notLoggedIn");
    var loggedInBox = $("loggedInBox");
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
    
    $("#customSubmit").click(function () {
        var newUserName = $("#customName").val();
        newUserName = validateName(newUserName);
        if (confirm("Do you want to change your display name to " + newUserName + "?")){
            currentAccount.update({"userName": newUserName});
        }
    });
    
    $("#customName").keypress(function (k){
        if (k.keyCode == 13){
            $("#customSubmit").click();
        }
    });
});

function validateName(nameToValidate){
    var outputName = "";
    for (var i = 0; i < nameToValidate.length; i++){
        if (nameToValidate.charAt(i) != "."){
            outputName += nameToValidate.charAt(i);
        }
    }
    return (outputName);
}