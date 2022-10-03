var $ = function(id) {
    return document.getElementById(id);
}

window.onload = function() {
    let myButton1 = $("toNotesAndCoins");
    myButton1.onclick = changeToNotesAndCoins;
    let myButton2 = $("toCoins");
    myButton2.onclick = changeToCoins;
} 

function changeToCoins() {
    clearNotes();
    if ( processEntry()) {
        var totalCents = getCents();
        makeChangeToCoins( totalCents );
    }
}

function changeToNotesAndCoins() {
    if ( processEntry()) {
        var totalCents = getCents();
        makeChangeToNotesAndCoins( totalCents );
    }
}

function processEntry() {
    // clear output box
    $("dollars").addEventListener("input", resetBoxes);
    $("cents").addEventListener("input", resetBoxes);

    var dollars = $("dollars").value;
    var cents = $("cents").value;

    if( isNaN(dollars) || isNaN(cents) 
     || dollars == "" || cents == "" 
     || dollars < 0 || cents < 0  ) {
        $("dollars").value = "";
        $("cents").value = "";
        playAudioFailed();
        clearImage();
        showImageFailed();
        alert("Invalid amount. Please enter 0 or a larger number!"); 
        
        return false; 
    } else{
        return true;
    }
}

function getCents() {
    var dollarInput = $("dollars").value;

    // in case user enter dollars with more than 2 decimal numbers
    dollarInput = (Math.floor(parseFloat(dollarInput)*100)/100).toFixed(2);

    // replace input with round down number
    $("dollars").value = dollarInput;
    
    var centInput = $("cents").value;
    
    // in case user enter cents with decimal numbers
    centInput = Math.floor(parseFloat(centInput)); 

    // replace input (with decimal numbers) with round down number
    $("cents").value = centInput;
    
    var totalCents = dollarInput * 100 + centInput;

    return totalCents;
}

function makeChangeToNotesAndCoins( totalCents ) {

    // play audio of cash counting
    playAudioCash();
    
    var cents = totalCents % 100;
    var dollars = Math.floor( totalCents / 100 );

    // calculate dollar notes
    var notes100 = Math.floor( dollars / 100 );
    var remainder =  dollars % 100;
    var notes50 = Math.floor( remainder / 50 );
    remainder = remainder % 50;
    var notes20 = Math.floor( remainder / 20 );
    remainder = remainder % 20;
    var notes10 = Math.floor( remainder / 10 );
    remainder = remainder % 10;
    var notes5 = Math.floor( remainder / 5 );
    remainder = remainder % 5;
    var notes2 = Math.floor( remainder / 2 );
    var notes1 = remainder % 2;
    
    //display dollar notes
    $("notes100").value = notes100;
    $("notes50").value = notes50;
    $("notes20").value = notes20;
    $("notes10").value = notes10;
    $("notes5").value = notes5;
    $("notes2").value = notes2;
    $("notes1").value = notes1;

    // calculate and display coins
    makeChangeToCoins( cents );
}

function makeChangeToCoins( cents ) {
    var quarters = Math.floor( cents / 25 );
    var remainder = cents % 25;
    var dimes = Math.floor( remainder / 10 );
    remainder = remainder % 10;
    var nickels = Math.floor( remainder / 5 );
    var pennies = remainder % 5;

    // display coins
    $("quarters").value = quarters;
    $("dimes").value = dimes;
    $("nickels").value = nickels;
    $("pennies").value = pennies;

    // clear old image and show new one
    clearImage();
    showImagePassed();

    // play sound
    playAudioCoins();
}

// clear output box
function clearNotes() {
    $("notes100").value = "";
    $("notes50").value = "";
    $("notes20").value = "";
    $("notes10").value = "";
    $("notes5").value = "";
    $("notes2").value = "";
    $("notes1").value = "";
}

// clear output box
function clearCoins() {
    $("quarters").value = "";
    $("dimes").value = "";
    $("nickels").value = "";
    $("pennies").value = "";
}

function resetBoxes() {
    clearNotes();
    clearCoins();

    // reset Image
    clearImage();
    showImageHome();
}

function clearImage() {
    var image_x = document.getElementById('displayImage');
    image_x.parentNode.removeChild(image_x);
}

function showImageHome() {
    var x = document.createElement("IMG");
    x.setAttribute("id", "displayImage");
    x.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mr._Smiley_Face.svg/2000px-Mr._Smiley_Face.svg.png");
    x.setAttribute("width", "100");
    x.setAttribute("height", "100");
    x.setAttribute("alt", "Smiley Face");
    x.setAttribute("style", "margin-left: auto; margin-right: auto ; display: block");
    document.body.appendChild(x);
}

function showImagePassed() {
    
    var x = document.createElement("IMG");
    x.setAttribute("id", "displayImage");
    x.setAttribute("src", "https://icon-library.com/images/all-done-icon/all-done-icon-4.jpg");
    x.setAttribute("width", "100");
    x.setAttribute("height", "100");
    x.setAttribute("alt", "Successful");
    x.setAttribute("style", "margin-left: auto; margin-right: auto ; display: block");
    document.body.appendChild(x);
}

function showImageFailed() {
    var x = document.createElement("IMG");
    x.setAttribute("id", "displayImage");
    x.setAttribute("src", "https://previews.123rf.com/images/aquir/aquir1308/aquir130800099/21442615-failed-red-stamp.jpg");
    x.setAttribute("width", "100");
    x.setAttribute("height", "100");
    x.setAttribute("alt", "Failed");
    x.setAttribute("style", "margin-left: auto; margin-right: auto ; display: block");
    document.body.appendChild(x);
}

function buttonFreeze() {
    $("notesAndCoins").disabled = true;
    $("coins").disabled = true;
}

function playAudioCash() {
    var x = $("audioCash");
    x.play();
}

function playAudioCoins() {
    var x = $("audioCoins");
    x.play();
}

function playAudioFailed() {
    var x = $("audio-failed");
    x.play();
}

