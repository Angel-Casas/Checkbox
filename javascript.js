function getInput() {
  var x = document.getElementsByTagName("input")[0];
  var text = "";
  if (x.length !== 0) {
    for (var i = 0; i < x.length; i++) {
      text += x.elements[i].value;
    }
  }
  return text;
}
let button = document.getElementById("postit");
button.addEventListener('click', function() {
  //Create new div > span,time elements
  var newDiv = document.createElement("div");
  var newSpan = document.createElement("span");
  var newTime = document.createElement("time");
  var section = document.getElementById("display");
  //save input
  var input = getInput();
  //Save time
  var period = document.getElementsByTagName("input");
  var txt = "";
  for (var count = 0; count < period.length; count++) {
    if (period[count].checked == true) {
      txt = period[count].value;
      break;
    }
  }
  for (var count=0; count < txt; count++) {
    if (txt == 1){
      txt = txt - count + " " + "day remaining!";
    }
    else {
      txt = txt - count + " " + "days remaining";
    }
  }
  //add content to div > span,time
  newDiv.className = "card";
  newSpan.innerHTML = input;
  newTime.innerHTML = txt;
  newDiv.appendChild(newTime);
  newDiv.appendChild(newSpan);
  section.appendChild(newDiv);
}, false);

// Random quotes
var quotes = [
  "We all want to be famous people, and the moment we want to be something we are no longer free. - Jiddu Krishnamurti",
  "Tradition becomes our security, and when the mind is secure it is in decay. - Jiddu Krishnamurti",
  "Die to everything of yesterday so that your mind is always fresh, always young, innocent, full of vigor and passion. - Jiddu Krishnamurti",
  "Education is what remains after one has forgotten what one has learned in school. - Albert Einstein",
  "Anyone who has never made a mistake has never tried anything new. - Albert Einstein",
  "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science. - Albert Einstein",
  "Stay hungry, stay foolish. - Steve Jobs",
  "I believe life is an intelligent thing: that things aren't random. - Steve Jobs",
  "Self-education is, I firmly believe, the only kind of education there is. - Isaac Asimov",
  "In all chaos there is a cosmos, in all disorder a secret order. - Carl Gustav Jung",
  "Imagination will often carry us to worlds that never were. But without it we go nowhere. - Carl Sagan",
  "The first principle is that you must not fool yourself and you are the easiest person to fool. - Richard P. Feynman",
  "The secret of genius is to carry the spirit of the child into old age, which means never losing your enthusiasm. - Aldous Huxley",
  "Clean your room. - Jordan B. Peterson"
  ]
function nextQuote() {
  var randomNumber = Math.floor(Math.random()*quotes.length);
  document.getElementById("quote").innerHTML = quotes[randomNumber];
}
setInterval(nextQuote, 10000);
// end random quotes script
