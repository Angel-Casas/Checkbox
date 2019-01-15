// bitcoin Address
function handlePaste(e) {
  var clipboardData;
  //stop data actually being pasted into div
  e.stopPropagation();
  e.preventDefault();

  // get clipboard address data
  clipboardData = e.clipboardData || "Please copy a valid address";
  document.querySelector("#bitcoinDialogAddress").placeholder = clipboardData;
  return;
}
document.querySelector("#bitcoinAddressPaste").addEventListener("click", handlePaste, false);

// save reward to card
function saveBitcoinReward(address, amount, cardNumber) {
  userUpdatedGlobal.card[cardNumber].reward = {"rewardType": "Bitcoin", "rewardAmount": amount, "rewardAddress": address};
  return;
}

function handleRewards(e) {
  console.log(this);
  return;
}
document.querySelectorAll(".rewardAsk").addEventListener("click", handleRewards, false);


// example rewards setup
function listenRewardButton() {
  var nodes = document.querySelector(".rewardBox").childNodes;
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener("click", handleRewardMenu, false);
  }
  return;
}
function handleRewardMenu() {
  console.log(this);
  return;
}
