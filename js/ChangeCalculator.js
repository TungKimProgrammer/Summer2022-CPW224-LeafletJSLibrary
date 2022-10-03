var $ = function(id) {
    return document.getElementById(id);
}

window.onload = function() {
    let myButton = $("toCoins");
    myButton.onclick = changeToCoins;
} 

function changeToCoins() {
    if ( processEntry()) {
        var centIn = getCents();
        makeChange( centIn );
    }
}

function processEntry() {
    // clear output box
    $("cents").addEventListener("input", resetBoxes); 

    var cents = $("cents").value;

    if( isNaN(cents) || cents == "" || cents < 0 || cents >= 100 ) {
        $("cents").value = "";
        alert("Amount of change should be a number from 0 to 99!");
        return false; 
    } else {
        return true;
    }
}

function getCents() {
    var centInput = $("cents").value;
    centInput = Math.floor(parseFloat(centInput));
    return centInput;
}

function makeChange( cents ) {
    var quarters = Math.floor( cents / 25 );
    var remainder = cents % 25;
    var dimes = Math.floor( remainder / 10 );
    remainder = remainder % 10;
    var nickels = Math.floor( remainder / 5 );
    var pennies = remainder % 5;
    $("quarters").value = quarters;
    $("dimes").value = dimes;
    $("nickels").value = nickels;
    $("pennies").value = pennies;
}

function resetBoxes() {
    $("quarters").value = "";
    $("dimes").value = "";
    $("nickels").value = "";
    $("pennies").value = "";
}