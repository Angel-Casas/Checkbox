// Check Official Javascript Functions
// 0. Global Variables
// 1. DocumentEventListener
// 2. Global Functions
// 3. User Management
// 4. Reward Management

//  0. Global Variables:
var LoggedUser = {};
var logged = false;
var cardIdx;



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
    var email = document.querySelector("#loginAccountDiv .email");
    if (validEmail(email, email.value)) {
      var emailStr = document.querySelector("#loginAccountDiv .email").value;
    }
    else {
      // Return Error Invalid Email
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "Invalid email address, please check again!";
      return;
    }
    if (validPass(document.querySelector("#loginAccountDiv .password"), false)) {
      // Successfully Logged in
      let pass = window.btoa(document.querySelector("#loginAccountDiv .passwordInput").value);
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "";
      document.querySelector("#loginAccountDiv #successLogin").innerHTML = "Successfull login, welcome <span id='successUserName'>" + emailStr + "</span>!";
    }
    else {
      // Return Error Invalid Password
      document.querySelector("#loginAccountDiv #loginError").innerHTML = "Wrong password, please check again!";
      return;
    }
  } else if (target === document.querySelector("#registerAccountDiv .submit")) {
    var email = document.querySelector("#registerAccountDiv .email");
    if (validEmail(email, document.querySelector("#registerAccountDiv .email").value)) {
      // Successfully verified Email
      var emailStr = document.querySelector("#registerAccountDiv .email").value;
    }
    else {
      // Return Error Invalid Email
      document.querySelector("#registerAccountDiv #registerError").innerHTML = "Make sure the Email is valid";
      return;
    }
    if (validPass(document.querySelector("#registerAccountDiv .passwordInput"), true)) {
      // Successfully Registered
      let pass = window.btoa(document.querySelector("#registerAccountDiv .passwordInput").value);
      document.querySelector("#registerAccountDiv .passwordTipDiv").classList.remove("tip");
      document.querySelector("#registerAccountDiv #successCreate").innerHTML = "Account successfully created, welcome <span id='userNameCreate'>" + emailStr + "</span>!";
    }
    else {
      // Return Error Invalid Password
      document.querySelector("#registerAccountDiv #registerError").innerHTML = "Password invalid, please check again!";
      return;
    }
  }
  console.log("success");
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
    console.log("false");
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
    if (password.length >= 8) {
      registerError.innerHTML = "";
      return true;
    }
    else {
      return false;
    }
  }
}
// 3. User Management




// 4. Reward Management
