
// SETTINGS 
var autoRun = true;
var retries = -1; 

var balance = -1;
var balanceSet = false;
(function() {
    console.log(timeString() + " [CLAIM] Begin ChannelPoints Autoclaim by H1CH444M.");
    if (autoRun) {
        console.log(timeString() + " [CLAIM] Running...");
        run();
    }
})();

function run() {
    clickChest();
    var oldBalance = balance;
    balance = getBalance();
    if (balance > -1) {balanceSet = true; retries = 999;}
    if (balance != oldBalance && oldBalance != -1) {
        console.log(timeString() + " [CLAIM] Balance has changed by: " + (balance - oldBalance));
    }
    if (retries-- > 0 || retries < -1) {
        setTimeout(function(){ run(); }, 5000);
    } else {
        console.log(timeString() + " [CLAIM] No channel points found. Shutting down.");
    }
}

function clickChest() {
    var plays = document.getElementsByClassName("claimable-bonus__icon");
    for (var i = 0; i < plays.length; i++) {
        plays[i].click();
        console.log(timeString() + " [CLAIM] Clicked a bonus chest.");
    }
}

function getBalance() { 
    var balances = document.getElementsByClassName("tw-tooltip tw-tooltip--align-center tw-tooltip--right");
    var balance = -1;
    if (balances.length >= 3) { 
        try {
            var balanceHTML = balances[2].innerHTML;
            var patt = /\d*,?\d*/;
            var balanceRegEx = patt.exec(balanceHTML)[0];
            balance = parseInt(balanceRegEx.replace(",", ""));
        } catch(err) {
            console.log(timeString() + " [CLAIM] Couldn't find balance, err: " + err);
        }
    }
    return balance;
}

function getRewards() { 
    try {
    var rewardBox = document.getElementsByClassName("rewards-list");
    if (rewardBox.length >= 1) {
        var rewards = rewardBox[0].getElementsByClassName("reward-list-item");
        return rewards; 
    }
    return -1;
    } catch(err) {
        console.log(timeString() + " [CPA] Error getting channel's rewards. Err: " + err);
        return -1;
    }
}

function timeString() {
    let d = new Date();
    let h = (d.getHours()<10?'0':'') + d.getHours();
    let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    let dstr = h + ':' + m + ":" + s;
    return dstr;
}
