function myFunction() {
  var x = document.getElementById("text-box");
  var text = "";
  var i;
  for (i = 0, i < x.length ;i++) {
    text += x.elements[i].value;
  }
  document.getElementById("demo").innerHTML = text;
}
