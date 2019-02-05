// Check Official Javascript Functions
// 0. Global Variables
// 1. DocumentEventListener
// 2. Global Functions
// 3. User Management
// 4. Reward Management

//  0. Global Variables:
var users = [];
var userIdx = 0;
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
    if (event.target.matches("#clearUsers")) {
      localStorage.removeItem("users");
      location.reload();
      return;
    }
    if (event.target.matches("#home #cardCreate")) {
      let objective = document.querySelector("#home #entry").value || "I can't think of any Objectives.";
      let time = document.querySelector("#home .timeRange input:checked").value;
      event.preventDefault();
      if (logged) {
        var addedCard = users[userIdx].addCard(objective, time);
        console.log(addedCard);
        return;
      }
      else {
        var newCard = new Card(objective, time);
        cardToHTML(objective, time);
        return;
      }
      return;
    }
  }, false);
})();
// INPUTEVENTLISTENER
(function() {
  document.addEventListener("input", function(event) {
    // LOGIN PASSWORD INPUT
    if (event.target.matches("#loginAccountDiv .passwordInput")) {
      validPass(event.target, false);
      return;
    }
    else if (event.target.matches("#registerAccountDiv input[type='password']")) {
      validPass(event.target, true);
      return;
    }
  }, false);
})();

// 2. Global Functions
// INIT HANDLER
function init() {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  else {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users[userIdx]);
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
    localStorageLogin(users, false);
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
  scrollHandler(false);
  return;
}

// INTRODUCTION HANDLER
function introductionHandler(target) {
  let card = document.querySelectorAll("#main .card");
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
    if (nameInput.value === users[userIdx].name || nameInput.value === users[userIdx].email) {
      var userStr = document.querySelector("#loginAccountDiv .username").value;
    }
    else {
      // Return Error Invalid Email
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "No user found, please check again!";
      return;
    }
    if (validPass(document.querySelector("#loginAccountDiv .password"), false)) {
      // Successfully Logged in
      let pass = window.btoa(document.querySelector("#loginAccountDiv .passwordInput").value);
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
      reloadUsers();
      localStorageLogin(users, true);
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
      localStorageLogin(users, true);
      console.log(users[userIdx]);
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
    if (password === window.atob(users[userIdx].pass)) {
      registerError.innerHTML = "";
      return true;
    }
    else {
      return false;
    }
  }
}

// LOCALSTORAGE LOGIN HANDLER (When succesfully logged in with LoginHandler)
function localStorageLogin(users, bool) {
  if (bool) {
    localStorage.setItem("users", JSON.stringify(users));
    logged = true;
  }
  else {
    logged = false;
  }
  return;
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
    var user = new User(name, email, pass);
    for (var j=0; j<users[i].card.length; j++) {
      var objective = users[i].card[j].objective;
      var time = users[i].card[j].time;
      var reward = users[i].card[j].reward;
      var creator = users[i].card[j].creator;
      var participants = users[i].card[j].participants;
      var bckgr = users[i].card[j].bckgr;
      users[i].card[j] = new Card(objective, time, reward);
      users[i].card[j].creator = creator;
      users[i].card[j].participants = participants;
      users[i].card[j].bckgr = bckgr;
    }
    users[i] = user;
  }
  users[userIdx].display();
  console.log(users[userIdx]);
  return;
}
// CARDTOHTML
function cardToHTML(objective, time) {
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
  var newClose = document.createElement("div");
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
  newCard.className = "card";
  newRewardDisplay.className = "rewardItem";
  newRewardIcon.className = "fa fa-gift";
  newObjective.className = "objective";
  // check if reward has been set
  newRewardDisplay.innerHTML = "";
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
  constructor(name, email, pass) {
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.card = [];
  }
  cardLength() {
    return this.card.length;
  }
  addCard(objective, time) {
    let len = this.cardLength();
    console.log("len: " + len);
    var newCard = new Card(objective, time);
    this.card.push(newCard);
    cardToHTML(objective, time);
    localStorageLogin(users, true);
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
      for (var i=0; i<users[userIdx].card.length; i++) {
        cardToHTML(users[userIdx].card[i].objective, users[userIdx].card[i].time);
      }
      return true;
    }
    catch(error) {
      console.log("error in cardToHTML");
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
