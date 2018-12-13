// Mobile Viewport Height correction
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--mobilevh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--mobilevh', `${vh}px`);
});

// card Functionality
function getInput() {
  var x = document.getElementById("entry").value;
  return x;
}
var anchors = document.getElementsByTagName('a');
for (var i = 0; i<anchors.length; i++) {
  anchors[i].addEventListener('click', handler, false);
}
function handler(event) {
  var introduction = document.getElementById("main");
  var home = document.getElementById("home");
  var login = document.getElementById("login");
  var about = document.getElementById("about");
  event.preventDefault();
  if (this.name == "introduction") {
    introduction.style.display = "block";
    home.style.display = "none";
    login.style.display = "none";
    about.style.display = "none";
    return;
  }
  else if (this.name == "home") {
    introduction.style.display = "none";
    home.style.display = "flex";
    login.style.display = "none";
    about.style.display = "none";
    return;
  }
  else if (this.name == "login") {
    loginPopup();
    return;
  }
  else if (this.name == "about") {
    introduction.style.display = "none";
    home.style.display = "none";
    about.style.display = "block";
    return;
  }
}
function Div(className) {
  let div = document.createElement("div");
  div.className = className;
  return div;
}
let button = document.getElementById("cardCreate");
button.addEventListener('click', function() {
  //Create new div > span,time elements
  var newCard = Div("card");
  let newObjective = Div("objective");
  let newCardReward = document.createElement("span");
  var newButton = document.createElement("button");
  var newP = document.createElement("p");
  var newTime = document.createElement("time");
  var section = document.getElementById("mainObjectives");
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
  // add eventlistener to new Buttons

  //add Color to cards
  newCard.style.background = "linear-gradient(30deg, " + get_random_color() + ", " + get_random_color() + ")";
  //add content to div > span,time
  newButton.className = "rewardAsk";
  newButton.innerHTML = "R";
  newP.innerHTML = input;
  newTime.innerHTML = txt;
  newCardReward.className = "cardReward";
  newObjective.appendChild(newP);
  newObjective.appendChild(newButton);
  newObjective.appendChild(newTime);
  newObjective.appendChild(newCardReward);
  newCard.appendChild(newObjective);
  section.appendChild(newCard);
}, false);
// Login popup
function loginPopup() {
  let login = document.getElementById("login");
  if (login.style.display == "none") {
    login.style.display = "block";
  }
  else {
    login.style.display = "none";
  }
  return;
}
let close = document.getElementsByClassName("close")[0];
close.addEventListener('click', function() {
  login.style.display = "none";
});
// Random quotes
let quotes = {
  "Aim at the highest good, tool yourself into something that can attain it and go out there and manifest it in the world, so everything that comes your way will be a blessing. All you have to do is give up your resentment and hatred.": "- Jordan Bernt Peterson -",
  "We all want to be famous people, and the moment we want to be something we are no longer free.": "- Jiddu Krishnamurti -",
  "Tradition becomes our security, and when the mind is secure it is in decay.": "- Jiddu Krishnamurti -",
  "Die to everything of yesterday so that your mind is always fresh, always young, innocent, full of vigor and passion.": "- Jiddu Krishnamurti -",
  "Education is what remains after one has forgotten what one has learned in school.": "- Albert Einstein -",
  "Anyone who has never made a mistake has never tried anything new.": "- Albert Einstein -",
  "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.": "- Albert Einstein -",
  "Stay hungry, stay foolish.": "- Steve Jobs -",
  "I believe life is an intelligent thing: that things aren't random.": "- Steve Jobs -",
  "Self-education is, I firmly believe, the only kind of education there is.": "- Isaac Asimov -",
  "In all chaos there is a cosmos, in all disorder a secret order.": "- Carl Gustav Jung -",
  "Imagination will often carry us to worlds that never were. But without it we go nowhere.": "- Carl Sagan -",
  "The first principle is that you must not fool yourself and you are the easiest person to fool.": "- Richard P. Feynman -",
  "The secret of genius is to carry the spirit of the child into old age, which means never losing your enthusiasm.": "- Aldous Huxley -",
  "Clean your room.": "- Jordan B. Peterson -"
};
let previous = null;
function nextQuote() {
  let randomQuote = document.getElementById("randomQuote");
  if (!randomQuote.classList.contains('quoteAnimation')) {
    randomQuote.classList.add("quoteAnimation");
  }
  var randomNumber = Math.floor(Math.random()*Object.keys(quotes).length);
  if (previous == randomNumber) {
    randomNumber = Math.floor(Math.random()*Object.keys(quotes).length);
  }
  document.getElementById("quote").innerHTML = Object.keys(quotes)[randomNumber];
  document.getElementById("author").innerHTML = Object.values(quotes)[randomNumber];
  previous = randomNumber;
  return;
}
setInterval(nextQuote, 10000);
// end random quotes script

// reward dialog
// var rewardframe = document.getElementsByClassName("reward-frame")[0];
// var span = document.getElementsByClassName("close")[0];
// var btn = document.querySelectorAll(".reward-ask");
// var arrBtn = [].slice.call(btn, 0);
// // create function to add eventListener to buttons
// function rewardListener () {
//   for (var i = 0; i < arrBtn.length; i++) {
//     var self = arrBtn[i];
//     self.addEventListener('click', function (event) {
//       // Prevent browser's default action
//       event.preventDefault();
//       // call function
//       setTimeout(function() {
//         rewardframe.style.display = "block";
//       }, 500);
//     })
//   }
// };
// // Run rewardListener first time for example postit.
// rewardListener();
// span.onclick = function () {
//   rewardframe.style.display = "none";
// }
// window.onclick = function(event) {
//   if (event.target == rewardframe) {
//     rewardframe.style.display = "none";
//   }
// }
//
// // set btc payments
// (function () {
//
//     var iframe = document.createElement('iframe');
//     iframe.name = 'setgetgo';
//     iframe.class = 'setgetgo';
//     iframe.setAttribute('allowtransparency', 'true');
//     iframe.style.display = 'none';
//     iframe.style.border = 0;
//     iframe.style.position = 'fixed';
//     iframe.style.top = 0;
//     iframe.style.left = 0;
//     iframe.style.height = '100%';
//     iframe.style.width = '100%';
//     iframe.style.zIndex = '2147483647';
//
//     var hostname = "https://setgetgo.com";
//
//     window.onload = function () { init() };
//
//     function init() {
//         var btn = window.document.getElementById("sgg_create-payment-btn");
//
//         btn.onclick = function (event) { showPaymentModal(event, btn) };
//     }
//
//     function showPaymentModal(e, btn) {
//         e.preventDefault();
//
//         var amount = btn.getAttribute('sgg-amount');
//         var merchAddr = btn.getAttribute('sgg-merch-addr');
//         var merchEmail = btn.getAttribute('sgg-merch-email');
//         var testnet = btn.getAttribute('sgg-testnet');
//
//         window.document.body.appendChild(iframe);
//         iframe.src = hostname + "/payment/create-payment-html?amount=" + amount + "&merch_addr=" + merchAddr + "&merch_email=" + merchEmail + "&testnet=" + testnet;
//         iframe.style.display = 'block';
//     }
//
//     function receiveMessage(event) {
//         var uri;
//
//         if (hostname !== event.origin) {
//             return;
//         }
//
//         if (event.data === 'close') {
//             hideFrame();
//         }
//     }
//
//     window.addEventListener('message', receiveMessage, false);
//
//     function hideFrame() {
//         iframe.style.display = 'none';
//         iframe = window.document.body.removeChild(iframe);
//     }
//
// })();
//
// //random color
function get_random_color() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
}

// transition pages
// Navigation pages
