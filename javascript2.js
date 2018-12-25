// global variables
var userUpdatedGlobal = {};
var logged = false;
var users = [];

// // Mobile Viewport Height correction
//
// let vh = window.innerHeight * 0.01;
//
// document.documentElement.style.setProperty('--mobilevh', `${vh}px`);
//
// window.addEventListener('resize', () => {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--mobilevh', `${vh}px`);
// });
//

//hide loginNav when scrolling down

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("#quickLoginDiv").style.top = "70px";
  } else {
    document.querySelector("#quickLoginDiv").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


// window init
window.onload = init;
function init() {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  users = JSON.parse(localStorage.getItem("users"));
  console.log(users);
  document.querySelector("#clearUsers").addEventListener("click", function() {
    localStorage.removeItem("users");
    location.reload();
  }, false);
}
// quick Login eventListener
document.querySelector("#quickLoginForm").addEventListener('submit', quickLogin, false);

// Introduction javascript
var exampleCreateForm = document.querySelector("#exampleCreateForm");
function timeRange(exampleRange) {
  if (exampleRange == 1) {
    txt = exampleRange + " day remining!";
  }
  else {
    txt = exampleRange + " days remaining!";
  }
  return txt;
}
function introCard(e) {
  let exampleRange = document.querySelector("#exampleCreateForm input[type=radio]:checked").value;
  let objectiveExample = document.querySelectorAll(".objectiveExample");
  let time = timeRange(exampleRange);

  objectiveExample[0].childNodes[1].innerHTML = document.querySelector("#exampleEntry").value || "Example";
  objectiveExample[1].childNodes[1].innerHTML = document.querySelector("#exampleEntry").value || "Example";
  objectiveExample[0].childNodes[3].innerHTML = time;
  objectiveExample[1].childNodes[3].innerHTML = time;
  e.preventDefault();
  return;
}

exampleCreateForm.addEventListener('submit', introCard, false);


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
  else {
    login.style.display = "none";
  }
  return;
}

document.querySelector(".close").addEventListener('click', function() {
  document.getElementById("login").style.display = "none";
});

// modifyCards
function modifyCards() {
  let cardClose = document.querySelectorAll("#home #mainObjectives .close");
  if (this.getAttribute("class") === "") {
    this.classList.add("activeEditor");
    document.querySelector("#cardEditorInfo").style.display = "block";
    for (var i = 0; i < cardClose.length; i++) {
      cardClose[i].style.display = "block";
      cardClose[i].addEventListener("click", deleteCard, false);
    }
    return;
  }
  else {
    this.classList.remove("activeEditor");
    document.querySelector("#cardEditorInfo").style.display = "none";
    for (var i = 0; i < cardClose.length; i++) {
      cardClose[i].style.display = "none";
    }
    return;
  }
}
document.querySelector("#cardEditor").addEventListener("click", modifyCards, false);

// delete Card
function deleteCard() {
  if (logged) {
    let idx = userUpdatedGlobal.card.indexOf(this.parentElement);
    userUpdatedGlobal.card.splice(idx, 1);
    saveUserState();
  }
  this.parentElement.outerHTML = "";
}

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
  var self = this;
  // constructor function for user functionality
  self.email = email;
  self.name = fullName;
  self.password = password;
  self.card = [];
  self.cardLength = 0;
  // methods
  self.checkCardLength = function() {
    self.cardLength = Object.keys(self.card).length;
    return self.cardLength;
  }
  self.addCard = function(objective, time) {
    let idx = self.checkCardLength();
    let newCard = {
      "idx": idx,
      "objective": objective,
      "time": time,
      "creator": self.name,
      "participants": self.name
    }
    self.displayCards();
    self.card[idx] = newCard;
    return newCard;
  }
  self.removeCard = function(idx) {
    for (var i=0; i < this.cardLength; i++) {
      if (this.card[i].idx == idx) {
        delete this.card[i];
        return;
      }
    }
    return;
  }
  self.displayCards = function() {
    for (i=0; i<self.card.length; i++) {
      createCards(self.card[i].objective, self.card[i].time);
    }
    return;
  }
  self.addReward = function() {
    return;
  }
  self.changeReward = function() {
    return;
  }
  self.removeReward = function() {
    return;
  }
  self.personalizeCard = function() {
    return;
  }
  self.participate = function(participant, idx) {
    this.card[idx].participants += ", " + participant;
    return this.card[idx].participants;
  }
}
// save User state

function saveUserState() {
  localStorage.setItem("users", JSON.stringify(users));
}
// display Cards
function createCards(objective, time) {
  var newCard = document.createElement("div");
  var newObjective = document.createElement("div");
  var newCardReward = document.createElement("span");
  var newButton = document.createElement("button");
  var newP = document.createElement("p");
  var newTime = document.createElement("time");
  var section = document.querySelector("#mainObjectives");
  var txt = "";
  var cardObj = {};
  // needed for Editor
  var newClose = document.createElement("div");
  newClose.classList.add("close");

  if (time == 1) {
    txt = time + " day remining!";
  }
  else {
    txt = time + " days remaining!";
  }
  // create card object passed later to user
  cardObj.objective = objective;
  cardObj.time = time;
  newCard.style.background = "linear-gradient(30deg, " + get_random_color() + ", " + get_random_color() + ")";
  //add classes
  newButton.className = "rewardAsk";
  newCard.className = "card";
  newCardReward.className = "cardReward";
  newObjective.className = "objective";
  //add content to div > span,time
  newButton.innerHTML = "R";
  newP.innerHTML = objective || "I could'nt think of any objectives";
  newTime.innerHTML = time || txt;
  newObjective.appendChild(newP);
  newObjective.appendChild(newTime);
  newObjective.appendChild(newButton);
  newObjective.appendChild(newCardReward);
  newCard.appendChild(newClose);
  newCard.appendChild(newObjective);
  section.appendChild(newCard);
  return cardObj;
}

// create Cards
document.querySelector("#homeForm").addEventListener('submit', function(e) {
  e.preventDefault();
  var objective = document.getElementById("entry").value || "I can't think of any Objectives.";
  var time = document.querySelector("#home .time-range input:checked").value;
  var cardObj = createCards(objective, time);
  try {
    if (logged) {
      userUpdatedGlobal.card.push(cardObj);
      saveUserState();
    }
  } catch(e) {
    throw new Error(e.message);
  }
}, false);

// display cards

function displayCards() {
  for (var i=0; i<userUpdatedGlobal.card.length; i++) {
    createCards(userUpdatedGlobal.card[i].objective, userUpdatedGlobal.card[i].time);
  }
  return;
}
// loop over users
function userId(name) {
  let idx = 0;
  for (var i=0; i<users.length; i++) {
    if (users[i].name === name) {
      idx = i;
      return idx;
    }
    idx = i;
  }
  return idx;
}
// check if users exists

function checkUser(name) {
  try {
    for (var i=0; i<users.length; i++) {
      if (users[i].name === name) {
        return true;
      }
    }
    return false;
  } catch (e) {
    throw new Error(e.message);
  }
}
// Local Storage
// createAccount LocalStorage
function createAccount(e) {
  e.preventDefault();
  try {
    var emailCreate = document.querySelector("#email").value;
    var userNameCreate = document.querySelector("#name").value;
    var passwordCreate = window.btoa(document.querySelector("#password").value);
    var confirmPasswordCreate = window.btoa(document.querySelector("#confirm_password").value);
    var successCreate = document.querySelector("#successCreate");
    var passwordError = document.querySelector("#passwordError");
    successCreate.innerHTML = "";
    passwordError.innerHTML = "";
    if (window.atob(passwordCreate) !== window.atob(confirmPasswordCreate)) {
      passwordError.innerHTML = "Password do Not Match, please check again.";
      return;
    }
    else if (window.atob(passwordCreate) === "") {
      passwordError.innerHTML = "Please type in a password.";
      return;
    }
    else if (checkUser(userNameCreate)) {
      passwordError.innerHTML = "Username already exists in this group, please choose another one.";
      return;
    }
    else {
      let user = new User(emailCreate, userNameCreate, passwordCreate);
      users.push(user);
      saveUserState();
      passwordError.innerHTML = "";
      successCreate.innerHTML = "Account successfully created, welcome <span id='userNameCreate'>" + userNameCreate + "</span>!";
      successCreate.style.display = "inline-block";
      return;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

// sign Out
function signOut() {
  userUpdatedGlobal = {};
  logged = false;
  location.reload();
}
// Login LocalStorage
function quickLogin(e) {
  let name = document.querySelector("#quickLogin").value;
  let password = window.btoa(document.querySelector("#quickPassword").value);
  let error = document.querySelector("#quickLoginError");
  let success = document.querySelector("#quickLoginSuccess");
  let quickLogin = document.querySelector("#quickLoginForm");
  let registerNav = document.querySelector("#mainNav #registerNav");
  let signOutNav = document.querySelector("#mainNav #signOutNav");
  e.preventDefault();
  error.innerHTML = "";
  success.innerHTML = "";
  if (name !== "" && window.atob(password) !== "") {
    let id = userId(name);
    if (!checkUser(name)) {
      error.innerHTML = "No user found, please check again.<br>Don't miss the Caps!";
      return false;
    }
    else if (password !== users[id].password) {
      error.innerHTML = "Wrong password, please try again.";
      return false;
    }
    else {
      success.innerHTML = "Successfull login, welcome <span id='quickSuccessUserName'>" + name + "</span>!";
      logged = true;
      userUpdatedGlobal = users[id];
      console.log(userUpdatedGlobal);
      displayCards();
      registerNav.style.display = "none";
      signOutNav.style.display = "flex";
      signOutNav.addEventListener("click", signOut, false);
      window.setTimeout(function() {success.innerHTML = "";}, 2000);
      quickLogin.style.display = "none";
    }
  }
  else {
    error.innerHTML = "Fill in the input.";
  }
  return;
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

  createForm.addEventListener("submit", createAccount, false);
} else {
  // Sorry! No Web Storage support..
}
