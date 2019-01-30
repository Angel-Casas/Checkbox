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



// 1. DocumentEventListener
(function() {
  document.addEventListener('click', function(event) {
    // One GLOBAL event Listener and a group of if clauses.
    // NAVIGATION
    if (event.target.matches('.navLinks')) {
      navHandler(event.target);
    }
    if (event.target.matches(".close")) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector("#login").style.display = "none";
      return;
    }
    if (event.target.matches("#login .switch label")) {
      event.preventDefault();
      event.stopPropagation();
      closureHandler(event.target);
      return;
    }
  }, false);
})();


// 2. Global Functions

// NAVIGATION
function navHandler(target) {
  let introduction = document.getElementById("main");
  let home = document.getElementById("home");
  let login = document.getElementById("login");
  let about = document.getElementById("about");
  if (target.classList.contains("navRegister")) {
    event.preventDefault();
    login.style.display = "block";
    return;
  } else if (target.classList.contains("navSignOut")) {
    event.preventDefault();
    return;
  } else {
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

// LOGIN
function loginHandler(target) {
  let loginSection = document.querySelector("#login");
  let loginForm = document.querySelector("#loginAccountForm");
  let registerForm = document.querySelector("#registerAccountForm");
  let loginRadio = document.querySelector("#loginRadioForm");
  // Display loginSection
  loginSection.style.display = "block";
  // Toogle register / login
  console.log("a");
}

function closureHandler(target) {
  if (target.matches("#rewardList .close")) {
    document.querySelector("#rewardList").style.display = "none";
    return;
  }
  if (target.matches("#login .close")) {
    document.querySelector("#login").style.display = "none";
    return;
  }
  if (target.matches(".switch label")) {
    let inputRadio = document.querySelectorAll("#login .switch-input");
    console.log(!inputRadio[1].checked);
    inputRadio[0].checked = !inputRadio[0].checked;
    inputRadio[1].checked = !inputRadio[0].checked;
    if (document.querySelector("#loginInput").checked) {
      console.log("login");
      document.querySelector(".register").style.display = "none";
      document.querySelector(".login").style.display = "flex";
      return;
    }
    else if (document.querySelector("#registerInput").checked) {
      console.log("register");
      document.querySelector(".login").style.display = "none";
      document.querySelector(".register").style.display = "flex";
      return;
    }
  }
}
// 3. User Management




// 4. Reward Management
