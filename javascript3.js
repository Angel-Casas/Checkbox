// Check Official Javascript Functions
// 0. Global Variables
// 1. DocumentEventListener
// 2. Global Functions
// 3. User Management
// 4. Reward Management

//  0. Global Variables:
var users = [];
var activeUser = {};
var userIdx = 0;
var cardIdx = 0;
var logged = false;

// WINDOW INIT
window.onload = init;

// 1. DOCUMENTEVENTLISTENER
(function() {
  document.addEventListener("click", function(event) {
    // One GLOBAL event Listener and a group of if clauses.
    // NAVIGATION HANDLER
    if (event.target.matches(".navLinks")) {
      event.preventDefault();
      navHandler(event.target);
      return;
    }
    // CLOSURE HANDLER
    if (event.target.matches(".close")) {
      event.preventDefault();
      event.stopPropagation();
      closureHandler(event.target);
      return;
    }
    // LOGIN/REGISTER
    if (event.target.matches("#login .switch label")) {
      event.preventDefault();
      event.stopPropagation();
      closureHandler(event.target);
      return;
    }
    // INTRODUCTION HANDLER
    if (event.target.matches("#main button") || event.target.matches("#main label")) {
      event.preventDefault();
      event.stopPropagation();
      introductionHandler(event.target);
      return;
    }
    // LOGIN HANDLER
    if (event.target.matches("#login button")) {
      event.preventDefault();
      loginHandler(event.target);
      return;
    }
    // CREATE CARD HANDLER
    if (event.target.matches("#home #cardCreate")) {
      let objective = document.querySelector("#home #entry").value || "I can't think of any Objectives.";
      let time = document.querySelector("#home .timeRange input:checked").value;
      event.preventDefault();
      if (logged) {
        var addedCard = activeUser.addCard(objective, time);
        cardIdx = findCardIdx(addedCard);
        console.log("CardIdx: " + cardIdx);
        return;
      }
      else {
        cardToHTML(objective, time, "");
        return;
      }
      return;
    }
    // EDIT CARD HANDLER
    if (event.target.matches("#home #cardEditor i")) {
      event.preventDefault();
      event.target.classList.toggle("activeEditor");
      if (event.target.classList.contains("activeEditor")) {
        document.querySelector("#cardEditorInfo").style.display = "block";
        document.querySelectorAll("#home .card .close").forEach(el => el.style.display = "block");
        return;
      }
      else {
        document.querySelector("#cardEditorInfo").style.display = "none";
        document.querySelectorAll("#home .card .close").forEach(el => el.style.display = "none");
      }
      return;
    }
    // REWARD HANDLER
    if (event.target.matches("#home .rewardAsk") || event.target.matches("#home .rewardAsk i")) {
      if (logged) {
        cardIdx = findCardIdx();
        handleRewards();
      }
      return;
    }
    // EXTRA FUNCTIONALITY - DELETE USER LIST
    if (event.target.matches("#clearUsers")) {
      localStorage.removeItem("users");
      location.reload();
      return;
    }
    else {
    }
  }, false);
})();
// INPUTEVENTLISTENER
(function() {
  document.addEventListener("input", function(event) {
    // REGISTER PASSWORD INPUT
    if (event.target.matches("#registerAccountDiv input[type='password']")) {
      validPass(event.target, true);
      return;
    }
  }, false);
})();

// 2. Global Functions
// INIT HANDLER
function init() {
  if (localStorageUsers(users, false) === null) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  else {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
  }
  reloadUsers();
  for (var i=0; i<users.length; i++) {
    if (users[i].keepLogged === true) {
      logged = true;
      activeUser = users[i];
      activeUser.display();
      document.querySelector("#mainNav #navRegister").style.display = "none";
      document.querySelector("#mainNav #navSignOut").style.display = "flex";
      console.log(activeUser);
    }
  }
  return;
}

// NAVIGATION HANDLER
function navHandler(target) {
  let introduction = document.getElementById("main");
  let home = document.getElementById("home");
  let login = document.getElementById("login");
  let about = document.getElementById("about");
  if (target.classList.contains("navRegister")) {
    login.style.display = "block";
    scrollHandler(true);
    return;
  } else if (target.classList.contains("navSignOut")) {
    document.querySelector("#mainNav #navRegister").style.display = "flex";
    document.querySelector("#mainNav #navSignOut").style.display = "none";
    document.querySelector("#home #mainObjectives").innerHTML = "";
    activeUser.keepLogged = false;
    localStorageUsers(users, true);
    logged = false;
    return;
  } else {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // reset pages displayed at start
    introduction.style.display = "none";
    home.style.display = "none";
    login.style.display = "none";
    about.style.display = "none";
    // check Nav button clicked
    if (target.classList.contains("navIntroduction")) {
      introduction.style.display = "flex";
      return;
    }
    else if (target.classList.contains("navHome")) {
      home.style.display = "flex";
      return;
    }
    else if (target.classList.contains("navAbout")) {
      about.style.display = "block";
      return;
    }
  }
}

// CLOSURE HANDLER
function closureHandler(target) {
  if (target.matches("#rewardList .close")) {
    document.querySelector("#rewardList").style.display = "none";
  }
  if (target.matches("#login .close")) {
    document.querySelector("#login").style.display = "none";
  }
  if (target.matches(".switch label")) {
    let inputRadio = document.querySelectorAll("#login .switch-input");
    inputRadio[0].checked = !inputRadio[0].checked;
    inputRadio[1].checked = !inputRadio[0].checked;
    if (document.querySelector("#loginInput").checked) {
      document.querySelector(".register").style.display = "none";
      document.querySelector(".login").style.display = "flex";
      return;
    }
    else if (document.querySelector("#registerInput").checked) {
      document.querySelector(".login").style.display = "none";
      document.querySelector(".register").style.display = "flex";
      return;
    }
  }
  if (target.matches("#home #mainSection a.close")) {
    if (logged) {
      var cards = document.querySelectorAll("#home .card");
      console.log(target.parentElement.classList[1] + activeUser.card[0].cardIdx);
      for (var i=0; i<cards.length; i++) {
        console.log("yes");
        if (target.parentElement.classList[1] == activeUser.card[i].cardIdx) {
          console.log("inside: " + cardIdx);
          cardIdx = i;
        }
      }
      if (activeUser.card[cardIdx].creator === activeUser.name) {
        activeUser.removeCard(cardIdx, true);
        localStorageUsers(users, true);
        target.parentElement.outerHTML = "";
      }
    }
    else {
      target.parentElement.outerHTML = "";
    }
    return;
  }
  if (target.matches("#home #rewardList a.close")) {
    document.querySelector("#rewardUndo").style.display = "none";
    document.querySelector("#rewardList").style.display = "none";
    document.querySelector("#bitcoinDialogBox").style.display = "none";
    document.querySelector("#giftCardDialogBox").style.display = "none";
    document.querySelector("#paypalDialogBox").style.display = "none";
    document.querySelector("#rewardList .rewardBox").style.display = "flex";
    document.querySelector("#rewardMainBox").style.display = "block";
  }
  scrollHandler(false);
  return;
}

// INTRODUCTION HANDLER
function introductionHandler(target) {
  let card = document.querySelectorAll("#main .card");
  let radio = document.querySelectorAll("#main #exampleTimeRange label");
  let rewardBool = false;
  switch (target) {
    case document.querySelector("#postIt"):
      let objective = document.querySelector("#exampleEntry").value;
      let time = document.querySelector("#exampleTimeRange input:checked").value;
      let pOne = card[0].getElementsByTagName("p");
      let pTwo = card[1].getElementsByTagName("p");
      pOne[0].innerHTML = pTwo[0].innerHTML = objective || "Can't think of any Objectives!";
      pOne[1].innerHTML = pTwo[1].innerHTML = time + " Days remaining";
      break;
    case radio[0]:
      target.previousSibling.checked = true;
      break;
    case radio[1]:
      target.previousSibling.checked = true;
      break;
    case radio[2]:
      target.previousSibling.checked = true;
      break;
    case document.querySelectorAll("#rewardFrame label")[0]:
      document.querySelector("#rewardGift").checked = true;
      var radioReward = document.querySelector("input[name=rewardSelector]:checked").value;
      rewardBool = true;
      break;
    case document.querySelectorAll("#rewardFrame label")[1]:
      document.querySelector("#rewardBitcoin").checked = true;
      var radioReward = document.querySelector("input[name=rewardSelector]:checked").value;
      rewardBool = true;
      break;
    case document.querySelectorAll("#rewardFrame label")[2]:
      document.querySelector("#rewardPaypal").checked = true;
      var radioReward = document.querySelector("input[name=rewardSelector]:checked").value;
      rewardBool = true;
      break;
    case document.querySelector("#main .completeButton"):
      document.querySelector("#main").style.display = "none";
      document.querySelector("#home").style.display = "flex";
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      break;
    default:
  }
  if (rewardBool) {
    document.querySelector("#successRewardInfo").style.display = "block";
    card[0].getElementsByTagName("p")[2].innerHTML = radioReward;
    card[1].getElementsByTagName("p")[2].innerHTML = radioReward;
    return;
  }

  return;
}

// LOGIN HANDLER
function loginHandler(target) {
  document.querySelector("#loginAccountDiv #loginError").innerHTML = "";
  document.querySelector("#registerAccountDiv #registerError").innerHTML = "";
  document.querySelector("#loginAccountDiv #successLogin").innerHTML = "";

  if (target === document.querySelector("#loginAccountDiv .submit")) {
    // Login
    var nameInput = document.querySelector("#loginAccountDiv .username");
    userIdx = findUser(nameInput.value);
    try {
      if (nameInput.value === users[userIdx].name || nameInput.value === users[userIdx].email) {
        var userStr = document.querySelector("#loginAccountDiv .username").value;
      }
      else {
        // Return Error Invalid Email
        document.querySelector("#loginAccountDiv #loginError").innerHTML = "No user found, please check again!";
        return;
      }
    }
    catch(error) {
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "No user found, please check again!";
      console.log(error);
      return;
    }
    if (validPass(document.querySelector("#loginAccountDiv .password"), false)) {
      // Successfully Logged in
      let pass = window.btoa(document.querySelector("#loginAccountDiv .passwordInput").value);

      // check if KeepUserLogged is checked
      if (document.querySelector("#login .rememberContainer input").checked) {
        users[userIdx].keepLogged = true;
      }
      activeUser = users[userIdx];
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "";
      document.querySelector("#loginAccountDiv #successLogin").innerHTML = "Successfull login, welcome <span id='successUserName'>" + users[userIdx].name + "</span>!";
      setTimeout(function() {
        document.querySelector("#loginAccountDiv #successLogin").innerHTML = "";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#mainNav #navRegister").style.display = "none";
        document.querySelector("#mainNav #navSignOut").style.display = "flex";
        scrollHandler(false);
        document.querySelector("#loginAccountForm").reset();
      }, 2000);
      document.querySelector("#home #mainObjectives").innerHTML = "";
      logged = true;
      reloadUsers();
      activeUser.display();
    }
    else {
      // Return Error Invalid Password
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "Wrong password, please check again!";
      return;
    }
  } else if (target === document.querySelector("#registerAccountDiv .submit")) {
    // Register
    var email = document.querySelector("#registerAccountDiv .email");
    if (validEmail(email, document.querySelector("#registerAccountDiv .email").value) && document.querySelector("#registerAccountDiv .username").value !== "") {
      // Successfully verified Email
      var emailStr = document.querySelector("#registerAccountDiv .email").value;
      var name = document.querySelector("#registerAccountDiv .username").value;
    }
    else {
      // Return Error Invalid Email
      document.querySelector("#registerAccountDiv #registerError").innerHTML = "Make sure the Email is valid and you have typed a Name!";
      return;
    }
    if (validPass(document.querySelector("#registerAccountDiv .passwordInput"), true)) {
      // Successfully Registered
      let pass = window.btoa(document.querySelector("#registerAccountDiv .passwordInput").value);
      document.querySelector("#registerAccountDiv .passwordTipDiv").classList.remove("tip");
      document.querySelector("#registerAccountDiv #successCreate").innerHTML = "Account successfully created, welcome <span id='userNameCreate'>" + name + "</span>!";
      setTimeout(function() {
        document.querySelector("#registerAccountDiv #successCreate").innerHTML = "";
        document.querySelector("#login").style.display = "none";
        document.querySelector("#mainNav #navRegister").style.display = "none";
        document.querySelector("#mainNav #navSignOut").style.display = "flex";
        scrollHandler(false);
        document.querySelector("#registerAccountForm").reset();
      }, 2000);
      var user = new User(name, emailStr, pass);
      users.push(user);
      localStorageUsers(users, true);
      logged = true;
      userIdx = findUser(name);
      activeUser = users[userIdx];
      return;
    }
    else {
      // Return Error Invalid Password
      document.querySelector("#registerAccountDiv #registerError").innerHTML = "Password invalid, please check again!";
      return;
    }
  }
  return;
}

// SCROLL HANDLER
function scrollHandler(bool) {
  let body = document.body;
  let loginSection = document.querySelector("#login");
  if (bool) {
    if (!loginSection.hasAttribute("ariaHidden")) {
      loginSection.setAttribute('ariaHidden', true);
      loginSection.scrollTop = 0;
    }
    if (!body.classList.contains("noScroll")) {
      body.classList.add("noScroll");
    }
    return;
  }
  else {
    loginSection.removeAttribute('ariaHidden');
    body.classList.remove('noScroll');
    return;
  }
}

// VALIDATE EMAIL
function validEmail(email, emailStr) {
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(emailStr)) {
    email.focus;
    return false;
  }
  return true;
}

// VALIDATE PASSWORD
function validPass(passInput, bool) {
  var letter = document.querySelector("#passwordLetter");
  var capital = document.querySelector("#passwordCapital");
  var number = document.querySelector("#passwordNumber");
  var length = document.querySelector("#passwordLength");
  var passwordTip = document.querySelector("#registerAccountDiv .passwordTipDiv");
  var registerError = document.querySelector("#login #registerError");

  // check if login or register
  if (bool) {
    var password = document.querySelector("#registerAccountDiv .passwordInput").value;
    var confirm = document.querySelector("#registerAccountDiv #confirmPassword").value;
    // display password Tip
    if (!passwordTip.classList.contains("tip")) {
      passwordTip.classList.toggle("tip");
    }
    if (passInput.value === "") {
      passwordTip.classList.toggle("tip");
    }
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (passInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (passInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (passInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (passInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
    if (password === confirm && password.length >= 8) {
      registerError.innerHTML = "";
      return true;
    }
    return false;
  }
  else {
    var password = document.querySelector("#loginAccountDiv .passwordInput").value;
    try {
      if (password === window.atob(users[userIdx].pass)) {
        registerError.innerHTML = "";
        return true;
      }
      else {
        return false;
      }
    }
    catch(error) {
      registerError.innerHTML = ""
    }
  }
}

// LOCALSTORAGE HANDLER
function localStorageUsers(users, bool) {
  // if true Set new local Storage with updated Users
  if (bool) {
    try {
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Saved");
    }
    catch(error) {
      console.log("Error caught at LocalStorageUsers true: " + error);
    }
  }
  else {
    try {
      return JSON.parse(localStorage.getItem("users"));
    }
    catch(error) {
      console.log("Error caught at LocalStorageUsers false: " + error);
    }
  }
}

// ITERATOR FOR USERS ARRAY
function findUser(name) {
  for (var i=0; i<users.length; i++) {
    if (users[i].name === name) {
      return i;
    }
    return userIdx;
  }
}

// RELOAD USERS
function reloadUsers() {
  for (var i=0; i<users.length; i++) {
    var name = users[i].name;
    var email = users[i].email;
    var pass = users[i].pass;
    var keepLogged = users[i].keepLogged;
    var user = new User(name, email, pass, keepLogged);
    for (var j=0; j<users[i].card.length; j++) {
      var objective = users[i].card[j].objective;
      var time = users[i].card[j].time;
      var reward = users[i].card[j].reward;
      var creator = users[i].card[j].creator;
      var participants = users[i].card[j].participants;
      var bckgr = users[i].card[j].bckgr;
      user.card[j] = new Card(objective, time, reward);
      user.card[j].creator = creator;
      user.card[j].participants = participants;
      user.card[j].bckgr = bckgr;
    }
    users[i] = user;
  }
  localStorageUsers(users, true);
  return;
}

// FIND CARD INDEX
function findCardIdx(target) {
  var cards = document.querySelectorAll("#home .card");
  console.log("target idx: " + target);
  for (var i=0; i<cards.length; i++) {
    if (target.cardIdx === cards[i].cardIdx) {
      console.log("inside: " + cardIdx);
      cardIdx = i;
      break;
    }
  }
  console.log(activeUser.card);
  return cardIdx;
}

// CARDTOHTML
function cardToHTML(objective, time, reward, i) {
  var newCard = document.createElement("div");
  var newObjective = document.createElement("div");
  var newRewardIcon = document.createElement("i");
  var newButton = document.createElement("button");
  var newP = document.createElement("p");
  var newTime = document.createElement("p");
  var newRewardDisplay = document.createElement("p");
  var section = document.querySelector("#mainObjectives");
  var txt = "";
  // needed for Editor
  var newClose = document.createElement("a");
  newClose.classList.add("close");
  if (time == 1) {
    txt = time + " day remining!";
  }
  else {
    txt = time + " days remaining!";
  }
  newCard.style.background = "linear-gradient(30deg, " + getRandomColor() + ", " + getRandomColor() + ")";
  //add classes
  newButton.className = "rewardAsk";
  newRewardIcon.className = "fa fa-gift";
  newCard.className = "card";
  newCard.classList.add(i);
  newRewardDisplay.className = "rewardItem";
  newObjective.className = "objective";
  // check if reward has been set
  newRewardDisplay.innerHTML = reward || "";
  //add content to div > span,time
  newP.innerHTML = objective || "I could'nt think of any objectives";
  newTime.innerHTML = txt;
  newButton.appendChild(newRewardIcon);
  newObjective.appendChild(newP);
  newObjective.appendChild(newTime);
  newObjective.appendChild(newRewardDisplay);
  newObjective.appendChild(newButton);
  newCard.appendChild(newObjective);
  newCard.appendChild(newClose);
  section.appendChild(newCard);
  return;
}

// HANDLE REWARDS
function handleRewards() {
  var rewardList = document.querySelector("#home #rewardList");
  var rewardBitcoinUser = document.querySelector("#rewardBitcoinUser");
  var rewardGiftCardUser = document.querySelector("#rewardGiftUser");
  var rewardPaypalUser = document.querySelector("#rewardPaypalUser");
  if (rewardList.style.display === "none" || rewardList.style.display === "") {
    rewardList.style.display = "block";
    document.querySelector("#rewardUndo").addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector("#rewardMainBox").style.display = "block";
      document.querySelector("#giftCardDialogBox").style.display = "none";
      document.querySelector("#bitcoinDialogBox").style.display = "none";
      document.querySelector("#paypalDialogBox").style.Display = "none";
      document.querySelector("#rewardUndo").style.display = "none";
    }, false);
    rewardGiftCardUser.addEventListener('click', function() {
      document.querySelector("#rewardUndo").style.display = "inline-block";
      document.querySelector("#rewardMainBox").style.display = "none";
      document.querySelector("#giftCardDialogBox").style.display = "flex";
      rewardGiftCardUser.checked = false;
      if (giftCardRewards()) {
        return true;
      }
      return false;
    }, false);
    rewardBitcoinUser.addEventListener('click', function() {
      document.querySelector("#rewardUndo").style.display = "inline-block";
      document.querySelector("#rewardMainBox").style.display = "none";
      document.querySelector("#bitcoinDialogBox").style.display = "flex";
      rewardBitcoinUser.checked = false;
      document.querySelector("#bitcoinDialogSubmit").addEventListener('click', bitcoinRewards, false);
      return;
    }, false);
    rewardPaypalUser.addEventListener('click', function() {
      document.querySelector("#rewardUndo").style.display = "inline-block";
      document.querySelector("#rewardMainBox").style.display = "none";
      document.querySelector("#paypalDialogBox").style.Display = "flex";
      rewardPaypalUser.checked = false;
    }, false);
  }
  return;
}
// BITCOIN REWARD
function saveBitcoinReward(address, amount, cardNumber) {
  userUpdatedGlobal.card[cardNumber].reward = {"rewardType": "Bitcoin", "rewardAmount": amount, "rewardAddress": address};
  return;
}

// GIFTCARD REWARD
function giftCardRewards() {
  var giftCards = document.querySelectorAll("#giftCardDialogBox #cardCatalog .cardElement");
  try {
    for (var i=0; i<giftCards.length; i++) {
      giftCards[i].addEventListener('click', function() {
        reward = this.innerHTML;
        document.querySelector("#home .rewardAsk").innerHTML = "&#10004;";
        if (activeUser.card[cardIdx].modifyReward(reward)) {
          activeUser.display();
          localStorageUsers(users, true);
          return;
        }
      }, false);
    }
    return true;
  }
  catch(error) {
    console.log("GiftCardRewards error: " + error);
    return false;
  }
}

// RANDOM COLOR GEN
function getRandomColor() {
  function c() {
    var hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2); // pad with zero
  }
  return "#"+c()+c()+c();
}

// 3. USER MANAGEMENT
class User {
  constructor(name, email, pass, keepLogged) {
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.card = [];
    this.keepLogged = keepLogged || false;
  }
  cardLength() {
    return this.card.length;
  }
  addCard(objective, time) {
    var newCard = new Card(objective, time);
    this.card.push(newCard);
    cardToHTML(objective, time, "", this.card.length);
    localStorageUsers(users, true);
    return newCard;
  }
  removeCard(idx, boolean) {
    if (boolean) {
      //Creator can Delete Cards
      this.card.splice(idx, 1);
      return true;
    }
    // Participants can't Delete Cards
    return false;
  }
  editCard(target, idx, boolean) {
    if (boolean) {
      //Creators can Edit cards
      return true;
    }
    return false;
  }
  personalizeCard(idx) {
    // TO DO Personalize Card background
    return;
  }
  display() {
    try {
      document.querySelector("#home #mainObjectives").innerHTML = "";
      for (var i=0; i<users[userIdx].card.length; i++) {
        cardToHTML(this.card[i].objective, this.card[i].time, this.card[i].reward, i);
      }
      return true;
    }
    catch(error) {
      console.log("error in cardToHTML: " + error);
      return false;
    }
  }
}


// CARD MANAGEMENT
class Card {
  constructor(objective, time, reward) {
    this.objective = objective;
    this.time = time;
    this.reward = reward || "";
    this.creator = users[userIdx].name || "";
    this.participants = [users[userIdx].name] || "";
    this.bckgr = "";
    this.cardIdx = cardIdx++;
  }
  modifyObjective(objective) {
    if (objective !== "") {
      this.objective = objective;
      return true;
    }
    return false;
  }
  modifyTime(time) {
    var d = new Date();
    if (time !== "" && time > d.now()) {
      this.time = time;
      return true;
    }
    return false;
  }
  modifyReward(reward) {
    this.reward = reward;
    return true;
  }
  addParticipant(user) {
    var part = findUser(user);
    for (var i=0; i<users.length; i++) {
      if (users.includes(user) && !this.participants.includes(user)) {
        this.participants.push(user);
        return true;
      }
    }
    return false;
  }
  speak() {
    console.log(
      "Objective: " + this.objective
      + " Time: " + this.time
      + " Reward: " + this.reward
      + " Creator: " + this.creator
      + " Participants: " + this.participants
      + " Bckgr: " + this.bckgr
    );
  }
}


// 4. Reward Management
