function getInput() {
  var x = document.getElementById("text-box");
  var input = "";
  var i;
  for (i = 0; i < x.length; i++) {
    input += x.elements[i].value;
  }
  return input;
}

function addElement() {
  //Create new div > span,time elements
  var newDiv = document.createElement("div");
  var newSpan = document.createElement("span");
  var newTime = document.createElement("time");
  var section = document.getElementById("display");
  //Save time
  var time = document.getElementbyId("checkbox").checked;
  //save input
  var input = getInput();
  //add content to div > span,time
  newDiv.className = "card";
  newSpan.innerHTML = input;
  newTime.innerHTML = time;
  newDiv.appendChild(newTime);
  newDiv.appendChild(newSpan);
  section.appendChild(newDiv);
}
