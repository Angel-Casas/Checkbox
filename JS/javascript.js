function myFunction() {
  var x = document.getElementById("text-box");
  var text = "", i;
  for (i = 0; i < x.length; i++) {
    text += x.elements[i].value;
  }
  document.getElementById("new").innerHTML = text;
}

function addElement() {
  //Create new div > span,time elements
  var newDiv = document.createElement("div");
  var newSpan = document.createElement("span");
  var newTime = document.createElement("time");
  var element = document.getElementById("display");
  var time = document.forms.time;
  //add text input to span
  var x = document.getElementsByName("input").value;
  var newSpan.innerHTML = x;
  //add content
  var time = document.getElementbyId("time-range").checked;
  newDiv.className = "card";
  //add content to div > span,time
  newSpan.innerHTML = input;
  newTime.innerHTML = time;
  newDiv.appendChild(newTime);
  newDiv.appendChild(newSpan);
  element.appendChild(newDiv)
}

// time Display
function timeDisplay() {
  var txt = "";
  var i;
  for (i = 0; i < coffee.length; i++) {
    if (coffee[i].checked) {
        txt = txt + coffee[i].value + " ";
    }
  }
}
