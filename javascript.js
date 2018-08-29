function getInput() {
  var x = document.getElementsByTagName("input")[0];
  var text = "";
  if (x.length !== 0) {
    for (var i = 0; i < x.length; i++) {
      text += x.elements[i].value;
    }
  }
  return text;
}
let button = document.getElementById("postit");
button.addEventListener('click', function() {
  //Create new div > span,time elements
  var newDiv = document.createElement("div");
  var newButton = document.createElement("button");
  var newSpan = document.createElement("span");
  var newTime = document.createElement("time");
  var section = document.getElementById("main-box");
  //save input
  var input = getInput();
  //Save time
  var period = document.getElementsByTagName("input");
  var txt = "";
  for (var count = 0; count < period.length; count++) {
    if (period[count].checked == true) {
      txt = period[count].value;
      break;
    }
  }
  for (var count=0; count < txt; count++) {
    if (txt == 1){
      txt = txt - count + " " + "day remaining!";
    }
    else {
      txt = txt - count + " " + "days remaining";
    }
  }
  // add new reward Button to array list
  arrBtn.push(newButton);
  // add eventlistener to new Buttons
  rewardListener();
  //add content to div > span,time
  newDiv.className = "card";
  newButton.className = "reward-ask";
  newButton.innerHTML = "Select Reward";
  newSpan.innerHTML = input;
  newTime.innerHTML = txt;
  newDiv.appendChild(newButton);
  newDiv.appendChild(newTime);
  newDiv.appendChild(newSpan);
  section.appendChild(newDiv);
}, false);

// Random quotes
var quotes = [
  "We all want to be famous people, and the moment we want to be something we are no longer free. - Jiddu Krishnamurti",
  "Tradition becomes our security, and when the mind is secure it is in decay. - Jiddu Krishnamurti",
  "Die to everything of yesterday so that your mind is always fresh, always young, innocent, full of vigor and passion. - Jiddu Krishnamurti",
  "Education is what remains after one has forgotten what one has learned in school. - Albert Einstein",
  "Anyone who has never made a mistake has never tried anything new. - Albert Einstein",
  "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science. - Albert Einstein",
  "Stay hungry, stay foolish. - Steve Jobs",
  "I believe life is an intelligent thing: that things aren't random. - Steve Jobs",
  "Self-education is, I firmly believe, the only kind of education there is. - Isaac Asimov",
  "In all chaos there is a cosmos, in all disorder a secret order. - Carl Gustav Jung",
  "Imagination will often carry us to worlds that never were. But without it we go nowhere. - Carl Sagan",
  "The first principle is that you must not fool yourself and you are the easiest person to fool. - Richard P. Feynman",
  "The secret of genius is to carry the spirit of the child into old age, which means never losing your enthusiasm. - Aldous Huxley",
  "Clean your room. - Jordan B. Peterson"
  ]
function nextQuote() {
  var randomNumber = Math.floor(Math.random()*quotes.length);
  document.getElementById("quote").innerHTML = quotes[randomNumber];
}
setInterval(nextQuote, 10000);
// end random quotes script

// reward dialog
var rewardframe = document.getElementsByClassName("reward-frame")[0];
var span = document.getElementsByClassName("close")[0];
var btn = document.querySelectorAll(".reward-ask");
var arrBtn = [].slice.call(btn, 0);
// create function to add eventListener to buttons
function rewardListener () {
  for (var i = 0; i < arrBtn.length; i++) {
    var self = arrBtn[i];
    self.addEventListener('click', function (event) {
      // Prevent browser's default action
      event.preventDefault();
      // call function
      rewardframe.style.display = "block";
    })
  }
};
// Run rewardListener first time for example postit.
rewardListener();
span.onclick = function () {
  rewardframe.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == rewardframe) {
    rewardframe.style.display = "none";
  }
}

// set btc payments
(function () {

    var iframe = document.createElement('iframe');
    iframe.name = 'setgetgo';
    iframe.class = 'setgetgo';
    iframe.setAttribute('allowtransparency', 'true');
    iframe.style.display = 'none';
    iframe.style.border = 0;
    iframe.style.position = 'fixed';
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.zIndex = '2147483647';

    var hostname = "https://setgetgo.com";

    window.onload = function () { init() };

    function init() {
        var btn = window.document.getElementById("sgg_create-payment-btn");

        btn.onclick = function (event) { showPaymentModal(event, btn) };
    }

    function showPaymentModal(e, btn) {
        e.preventDefault();

        var amount = btn.getAttribute('sgg-amount');
        var merchAddr = btn.getAttribute('sgg-merch-addr');
        var merchEmail = btn.getAttribute('sgg-merch-email');
        var testnet = btn.getAttribute('sgg-testnet');

        window.document.body.appendChild(iframe);
        iframe.src = hostname + "/payment/create-payment-html?amount=" + amount + "&merch_addr=" + merchAddr + "&merch_email=" + merchEmail + "&testnet=" + testnet;
        iframe.style.display = 'block';
    }

    function receiveMessage(event) {
        var uri;

        if (hostname !== event.origin) {
            return;
        }

        if (event.data === 'close') {
            hideFrame();
        }
    }

    window.addEventListener('message', receiveMessage, false);

    function hideFrame() {
        iframe.style.display = 'none';
        iframe = window.document.body.removeChild(iframe);
    }

})();
