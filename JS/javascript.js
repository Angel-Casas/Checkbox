function myFunction() {
  var x = document.getElementById("text-box");
  var text = "";
  var i;
  for (i = 0; i < x.length; i++) {
    text += x.elements[i].value;
  }
  document.getElementById("new").innerHTML = text;
}

function addElement() {
  //Create new div > span,time elements
  var newDiv = document.createElement("div");
  newDiv.className = "card";
  var newSpan = document.createElement("span");
  var newTime = document.createElement("time");
  //add text input to span
  var x = document.getElementsByName("input").value;
  var newSpan.innerHTML = x;
  //add content
  var time = document.getElementbyId("time-range").checked;
  //add content to div > span,time
  newSpan.innerHTML = input;
  newTime.innerHTML = time;
  newDiv.appendChild(newTime);
  newDiv.appendChild(newSpan);
  var element = document.getElementById("display");
  element.appendChild(newDiv)
}

// time Display
var time = document.forms.time;

    var txt = "";
    var i;
    for (i = 0; i < coffee.length; i++) {
        if (coffee[i].checked) {
            txt = txt + coffee[i].value + " ";
        }
    }
