// Mobile Viewport Height correction

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--mobilevh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--mobilevh', `${vh}px`);
});

// Login form
function loginForm() {
  let buttons = document.querySelectorAll(".inner a");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      if (this.id == 'signIn') {
        document.querySelector("#createAccountForm").style.display = "none";
        document.querySelector("#loginForm").style.display = "block";
      }
      if (this.id == 'createAccount') {
        document.querySelector("#loginForm").style.display = "none";
        document.querySelector("#createAccountForm").style.display = "flex";
      }
      return;
    });
  }
}
loginForm();

// Introduction javascript
var exampleTimeRange = document.querySelectorAll("#exampleTimeRange > input[type=radio]");
var createButton = document.querySelector("#postIt");
var exampleRange = document.querySelector("input[type=radio]:checked").value + " Days Remaining" || "";
function timeRange() {
  exampleRange = this.value + " Days Remaining";
  return;
};
function introCard(e) {
  let objectiveExample = document.querySelectorAll(".objectiveExample");
  objectiveExample[0].childNodes[1].innerHTML = document.querySelector("#exampleEntry").value || "Example";
  objectiveExample[1].childNodes[1].innerHTML = document.querySelector("#exampleEntry").value || "Example";

  objectiveExample[0].childNodes[3].innerHTML = exampleRange;
  objectiveExample[1].childNodes[3].innerHTML = exampleRange;
  e.preventDefault();
  return;
}
for (var i = 0; i < exampleTimeRange.length; i++) {
  exampleTimeRange[i].addEventListener("change", timeRange, false);
}

createButton.addEventListener("click", introCard, false);


// card Functionality
function getInput() {
  var x = document.getElementById("entry").value;
  return x;
}
var anchors = document.querySelectorAll(".navLinks");
for (var i = 0; i<anchors.length; i++) {
  anchors[i].addEventListener('click', handler, false);
}
// When the user clicks on the nav buttons, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function handler(event) {
  var introduction = document.getElementById("main");
  var home = document.getElementById("home");
  var login = document.getElementById("login");
  var about = document.getElementById("about");
  event.preventDefault();
  if (this.childNodes[0].name == "introduction") {
    introduction.style.display = "block";
    home.style.display = "none";
    login.style.display = "none";
    about.style.display = "none";
    topFunction();
    return;
  }
  else if (this.childNodes[0].name == "home") {
    introduction.style.display = "none";
    home.style.display = "flex";
    login.style.display = "none";
    about.style.display = "none";
    topFunction();
    return;
  }
  else if (this.childNodes[0].name == "login") {
    loginPopup();
    return;
  }
  else if (this.childNodes[0].name == "about") {
    introduction.style.display = "none";
    home.style.display = "none";
    about.style.display = "block";
    topFunction();
    return;
  }
}

// Login popup

function loginPopup() {
  let login = document.getElementById("login");
  if (login.style.display == "none") {
    login.style.display = "block";
  }
  return;
}
document.querySelector(".close").addEventListener('click', function() {
  document.getElementById("login").style.display = "none";
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
// creator Function User

function User( email, fullName, password) {
  // constructor function for user functionality
  this.email = email;
  this.name = fullName;
  this.password = password;
  this.card = {};
  this.cardLength = this.card.length;
}
// methods
User.prototype.checkCardLength = function() {
  if (this.cardLength !== this.card.length) {
    this.cardLength = this.card.length;
  }
  return this.cardLength;
}
User.prototype.addCard = function(objective, timePeriod) {
  let idx = checkCardLength();
  let newCard = {
    "idx": idx,
    "objective": objective,
    "time": timePeriod,
    "creator": 1,
    "participants": this.name
  }
  displayCards();
  this.card.push(newCard);
  return newCard;
}
User.prototype.removeCard = function() {
  let idx = checkCardLength();
  for (var i=0; i < this.cardLength; i++) {
    if (this.card[i].idx == idx) {
      delete this.card[i];
      return;
    }
  }
  return;
}
User.prototype.showCards = function() {
  console.log("inside");
  let idx = checkCardLength();
  for (i=0; i<idx; i++) {
    let objective = this.card[i].objective;
    let time = this.card[i].time;
    displayCards(objective, time);
  }
  return;
}
User.prototype.addReward = function() {
  return;
}
User.prototype.changeReward = function() {
  return;
}
User.prototype.removeReward = function() {
  return;
}
User.prototype.personalizeCard = function() {
  return;
}
User.prototype.participate = function(participant, idx) {
  this.card[idx].participants += ", " + participant;
  return this.card[idx].participants;
}

// display Cards
function displayCards(objective, time) {
  var newCard = document.createElement("div");
  var newObjective = document.createElement("div");
  var newCardReward = document.createElement("span");
  var newButton = document.createElement("button");
  var newP = document.createElement("p");
  var newTime = document.createElement("time");
  var section = document.querySelector("#mainObjectives");
  var txt = "";
  if (time == 1) {
    txt = time + " day remining!";
  }
  else {
    txt = time + " days remaining!";
  }
  newCard.style.background = "linear-gradient(30deg, " + get_random_color() + ", " + get_random_color() + ")";
  //add classes
  newButton.className = "rewardAsk";
  newCard.className = "card";
  newCardReward.className = "cardReward";
  newObjective.className = "objective";
  //add content to div > span,time
  newButton.innerHTML = "R";
  newP.innerHTML = objective || "I could'nt think of any objectives";
  newTime.innerHTML = txt;
  newObjective.appendChild(newP);
  newObjective.appendChild(newTime);
  newObjective.appendChild(newButton);
  newObjective.appendChild(newCardReward);
  newCard.appendChild(newObjective);
  section.appendChild(newCard);
}

// create Cards

document.getElementById("cardCreate").addEventListener('click', createCards, false);
function createCards() {
  var newCard = document.createElement("div");
  var newObjective = document.createElement("div");
  var newCardReward = document.createElement("span");
  var newButton = document.createElement("button");
  var newP = document.createElement("p");
  var newTime = document.createElement("time");
  var section = document.querySelector("#mainObjectives");
  var input = getInput();
  var period = document.querySelectorAll("#home .time-range input");
  var txt = "";

  for (i=0; i<period.length; i++) {
    if (period[i].checked) {
      txt = period[i].value;
    }
  }

  if (period == 1) {
    txt = txt + " day remaining!";
  }
  else {
    txt = txt + " days remaining!";
  }

  //add Color to cards
  newCard.style.background = "linear-gradient(30deg, " + get_random_color() + ", " + get_random_color() + ")";

  //add classes
  newButton.className = "rewardAsk";
  newCard.className = "card";
  newCardReward.className = "cardReward";
  newObjective.className = "objective";

  //add content to div > span,time
  newButton.innerHTML = "R";
  newP.innerHTML = input || "I could'nt think of any objectives";
  newTime.innerHTML = txt;
  newObjective.appendChild(newP);
  newObjective.appendChild(newTime);
  newObjective.appendChild(newButton);
  newObjective.appendChild(newCardReward);
  newCard.appendChild(newObjective);
  section.appendChild(newCard);
}

// Local Storage
// createAccount LocalStorage
function createAccount(e) {
  var emailCreate = document.querySelector("#email").value;
  var userNameCreate = document.querySelector("#name").value;
  var passwordCreate = window.btoa(document.querySelector("#password").value);
  var confirmPasswordCreate = window.btoa(document.querySelector("#confirm_password").value);
  var successCreate = document.querySelector("#successCreate");
  var passwordError = document.querySelector("#passwordError");
  if (window.atob(passwordCreate) !== window.atob(confirmPasswordCreate)) {
    passwordError.innerHTML = "";
    passwordError.innerHTML = "Password do Not Match, please check again.";
  }
  else if(localStorage.getItem(userNameCreate) == null) {
    let user = new User(emailCreate, userNameCreate, passwordCreate);
    localStorage.setItem( userNameCreate, JSON.stringify(user));
    passwordError.innerHTML = "";
    successCreate.innerHTML = "Account successfully created, welcome <span id='userNameCreate'>" + userNameCreate + "</span>!";
    successCreate.style.display = "inline-block";
  }
  else if (localStorage.getItem(userNameCreate) !== null) {
    passwordError.innerHTML = "";
    passwordError.innerHTML = "Username already exists in this group, please choose another one.";
  }
  e.preventDefault();
}

// Login LocalStorage
function login(e) {
  e.preventDefault();
  try {
    var loginError = document.querySelector("#loginError");
    var successLogin = document.querySelector("#successLogin");
    var userName = document.querySelector("#loginForm #userNameLogin").value;
    var password = window.btoa(document.querySelector("#passwordLogin").value);
    var user = localStorage.getItem(userName);
    var userObj = JSON.parse(user);
    // check if user exists
    if (JSON.parse(user).name == null) {
      loginError.innerHTML = "";
      loginError.innerHTML = "No username found with that name.";
    }
    else if (JSON.parse(user).password == password) {
      console.log(userObj);
      successLogin.innerHTML = "";
      successLogin.innerHTML = "Successfully logged in, welcome <span id='successUserName'>" + JSON.parse(user).name + "</span>!";
    }
    else if (JSON.parse(user).password !== password) {
      loginError.innerHTML = "";
      loginError.innerHTML = "Password do Not Match, please check again.";
    }
  } catch (e) {
    throw new Error(e.message);
  }
  return false;
}

// check if localStorage is available

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

if (storageAvailable('localStorage')) {
  // Code for localStorage/sessionStorage.
  var createForm = document.querySelector("#createAccountForm");
  var loginForm = document.querySelector("#loginForm");

  createForm.addEventListener("submit", createAccount, false);
  loginForm.addEventListener("submit", login, false);
} else {
  // Sorry! No Web Storage support..
}
