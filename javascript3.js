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
        cardToHTML(objective, time, "", "");
        return;
      }
      return;
    }
    // EDIT CARD HANDLER
    if (event.target.matches("#home #cardEditor i")) {
      event.preventDefault();
      event.target.classList.toggle("activeEditor");
      if (event.target.classList.contains("activeEditor")) {
        var span = document.querySelectorAll("#home .card .cardIndex");
        document.querySelector("#cardEditorInfo").style.display = "block";
        document.querySelectorAll("#home .card .close").forEach(el => el.style.display = "block");
        document.querySelectorAll("#home .card .cardIndex").forEach(ci => ci.style.display = "block");
        for (var i=0; i<span.length; i++) {
          var self = span[i];
          self.addEventListener('click', function(event) {
            event.preventDefault();
            var card = this.parentElement;
            cardIdx = this.classList[1];
            editRewardHandler(card, cardIdx);
            return;
          }, false);
        }
        return;
      }
      else {
        document.querySelector("#cardEditorInfo").style.display = "none";
        document.querySelectorAll("#home .card .close").forEach(el => el.style.display = "none");
        document.querySelectorAll("#home .card .cardIndex").forEach(ci => ci.style.display = "none");
      }
      return;
    }
    // REWARD HANDLER
    if (event.target.matches("#home .rewardAsk") || event.target.matches("#home .rewardAsk i")) {
      if (logged) {
        let main = document.querySelector("#home #mainObjectives");
        cardIdx = Array.from(main.children).indexOf(event.target.parentElement.parentElement);
        handleRewards();
      }
      return;
    }
    // SUBMIT EDITED CARD
    if (event.target.matches("#home #editRewards #editFormSubmit")) {
      event.preventDefault();
      editCards(document.querySelectorAll("#home #mainObjectives .card")[cardIdx], cardIdx);
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
    if (event.target.matches("#home #editRewards input")) {
      autoEditor(event.target, document.querySelector("#home #editRewards .card"));
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
    scrollHandler(true, login);
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
    var box = document.querySelector("#rewardList");
    box.style.display = "none";
  }
  if (target.matches("#login .close")) {
    var box = document.querySelector("#login");
    box.style.display = "none";
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
      for (var i=0; i<cards.length; i++) {
        if (target.nextSibling.classList[1] == activeUser.card[i].cardIdx) {
          cardIdx = i;
        }
      }
      if (activeUser.card[cardIdx].creator === activeUser.name) {
        console.log("Removed: " + activeUser.card[cardIdx]);
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
    var box = document.querySelector("#home #rewardList");
    document.querySelector("#rewardUndo").style.display = "none";
    document.querySelector("#rewardList").style.display = "none";
    document.querySelector("#bitcoinDialogBox").style.display = "none";
    document.querySelector("#giftCardDialogBox").style.display = "none";
    document.querySelector("#paypalDialogBox").style.display = "none";
    document.querySelector("#rewardList .rewardBox").style.display = "flex";
    document.querySelector("#rewardMainBox").style.display = "block";
  }
  if (target.matches("#home #editRewards a.close")) {
    console.log("editBox");
    var box = document.querySelector("#home #editRewards");
    box.style.display = "none";
  }
  scrollHandler(false, box);
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
        scrollHandler(false, document.querySelector("#login"));
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
        scrollHandler(false, document.querySelector("#login"));
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
function scrollHandler(bool, box) {
  let body = document.body;
  let section = box;
  if (bool) {
    if (!section.hasAttribute("ariaHidden")) {
      section.setAttribute('ariaHidden', true);
      section.scrollTop = 0;
    }
    if (!body.classList.contains("noScroll")) {
      body.classList.add("noScroll");
    }
    return;
  }
  else {
    section.removeAttribute('ariaHidden');
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
      var color = users[i].card[j].color;
      var bckgr = users[i].card[j].bkcgr;
      user.card[j] = new Card(objective, time, reward, color);
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
  for (var i=0; i<cards.length; i++) {
    if (target.cardIdx === cards[i].cardIdx) {
      cardIdx = i;
      break;
    }
  }
  return cardIdx;
}

// CARDTOHTML
function cardToHTML(objective, time, reward, colors, i) {
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
  var newIndex = document.createElement("span");
  var randomColor1 = getRandomColor();
  var randomColor2 = getRandomColor();
  newClose.classList.add("close");
  newIndex.className = "cardIndex";
  newIndex.classList.add(i);
  newIndex.innerHTML = i;
  if (time == 1) {
    txt = time + " day remining!";
  }
  else {
    txt = time + " days remaining!";
  }
  if (colors.length) {
    newCard.style.background = "linear-gradient(30deg, " + colors[0] + ", " + colors[1] + ")";
  }
  else {
    newCard.style.background = "linear-gradient(30deg, " + randomColor1 + ", " + randomColor2 + ")";
  }
  //add classes
  newButton.className = "rewardAsk";
  newCard.className = "card";
  newRewardDisplay.className = "rewardItem";
  newObjective.className = "objective";
  // check if reward has been set
  if(reward.length) {
    newRewardIcon.className = "";
    newRewardIcon.innerHTML = "&#10004;";
    newRewardDisplay.innerHTML = reward;
  }
  else {
    newRewardIcon.className = "fa fa-gift";
    newRewardDisplay.innerHTML = "";
  }
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
  newCard.appendChild(newIndex);
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

// EDIT REWARDS
function editRewardHandler(card, index) {
  let editRewards = document.querySelector("#home #editRewards");
  let newCard = card.cloneNode(true);
  let viewer = document.querySelector("#home #cardViewer");
  let color1 = activeUser.card[index].color[0];
  let color2 = activeUser.card[index].color[1];
  let inputColor1 = document.querySelector("#editColor1");
  let inputColor2 = document.querySelector("#editColor2");
  scrollHandler(true, editRewards);
  viewer.innerHTML = "";
  newCard.children[2].style.display = "none";
  inputColor1.value = color1;
  inputColor2.value = color2;
  viewer.appendChild(newCard);
  document.querySelector("#home #editRewards").style.display = "block";
  minDate();
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
        console.log(cardIdx);
        document.querySelectorAll("#home .rewardAsk")[cardIdx].innerHTML = "&#10004;";
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

// AUTO CARD EDITOR
function autoEditor(target, card) {
  switch (target) {
    case document.querySelector("#home #editRewards #editColor1"):
      var colorOne = document.querySelector("#home #editRewards #editColor1").value;
      var colorTwo = document.querySelector("#home #editRewards #editColor2").value;
      card.style.background = "linear-gradient(30deg, " + colorOne + ", " + colorTwo + ")";
      break;
    case document.querySelector("#home #editRewards #editColor2"):
      var colorOne = document.querySelector("#home #editRewards #editColor1").value;
      var colorTwo = document.querySelector("#home #editRewards #editColor2").value;
      card.style.background = "linear-gradient(30deg, " + colorOne + ", " + colorTwo + ")";
      break;
    case document.querySelector("#home #editRewards input[type='text']"):
      var newObjective = document.querySelector("#home #editRewards input[type='text']").value;
      card.children[0].children[0].innerHTML = newObjective;
      break;
    case document.querySelector("#home #editRewards input[type='date']"):
      var newTime = document.querySelector("#home #editRewards input[type='date']").value;
      card.children[0].children[1].innerHTML = newTime;
      break;
    default:
      return;
  }
  return;
}

// SET TIME CALENDAR
function minDate() {
  //JavaScript:
  let today = new Date(),
  day = today.getDate(),
  month = today.getMonth()+1, //January is 0
  year = today.getFullYear();
  if(day<10){
    day='0'+day
  }
  if(month<10){
    month='0'+month
  }
  today = year+'-'+month+'-'+day;
  document.querySelector("#home #editRewards input[type='date']").setAttribute("min", today);
  return;
}

// EDITED CARDS
function editCards(target, index) {
  var color1 = document.querySelector("#home #editRewards #editColor1").value;
  var color2 = document.querySelector("#home #editRewards #editColor2").value;
  var newObjective = document.querySelector("#home #editRewards input[type='text']").value;
  var newTime = document.querySelector("#home #editRewards input[type='date']").value;
  if (logged) {
    activeUser.card[cardIdx].objective = newObjective;
    activeUser.card[cardIdx].time = newTime;
    activeUser.card[cardIdx].color = [color1, color2];
  }
  target.children[0].children[0].innerHTML = newObjective;
  target.children[0].children[1].innerHTML = newTime;
  target.style.background = "linear-gradient(30deg, " + color1 + ", " + color2 + ")";
  document.querySelector("#home #editRewards #cardViewer").innerHTML = "";
  closureHandler(document.querySelector("#home #editRewards a.close"));
  localStorageUsers(users, true);
  return;
}

// FUNCTION RGB TO HEX
function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) {hex = "0" + hex; }
  return hex;
}
function rgbToHex(r, g, b) {
  return "#" +  toHex(r) + toHex(g) + toHex(b);
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
    var newCard = new Card(objective, time, "", [getRandomColor(), getRandomColor()]);
    cardToHTML(objective, time, "", newCard.color);
    this.card.push(newCard);
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
      for (var i=0; i<activeUser.card.length; i++) {
        cardToHTML(this.card[i].objective, this.card[i].time, this.card[i].reward, this.card[i].color, i);
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
  constructor(objective, time, reward, colors) {
    this.objective = objective;
    this.time = time;
    this.reward = reward || "";
    this.creator = users[userIdx].name || "";
    this.participants = [users[userIdx].name] || "";
    this.bckgr = "";
    this.color = colors || "";
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
  modifyBckgr(input1, input2) {
    let card = document.querySelectorAll("#home #mainObjectives .card");
    this.bckgr = "linear-gradient(30deg, " + input1 + ", " + input2 + ")";
    card[this.cardIdx].style.background = "linear-gradient(30deg, " + input1 + ", " + input2 + ")";
    return this.bckgr;
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
