"use strict";

// Elke slide heeft een aparte afbeelding
let photos = [
    { url: "/Project/SNEAKERHEAD QUIZ/img/home.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag1.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag2.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag3.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag4.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag5.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag6.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag7.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag8.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag9.jpg" },
    { url: "/Project/SNEAKERHEAD QUIZ/img/vraag10.jpg" }
  ],
  i = 0,
  score = 0,
  antwoordVier,
  timer = 5,
  myTimer,
  oldScore = score,
  text = document.createElement("H1"),
  showText = document.createTextNode("Time's Out!");

//Wat er gebeurt wnr de pagina wordt geladen
window.addEventListener("load", function() {
  hideQuestions();
  createQuestion();

  //Wat er gebeurt bij het clicken van btnStart
  document.getElementById("btnStart").addEventListener("click", function() {
    showQuestion();
    createButton();
    showPhoto();
    createScore();
    createTimer();
    showTimer();
  });

  //Wat er gebeurt bij het clicken van btnNext
  document.getElementById("btnNext").addEventListener("click", function() {
    checkAnswer();
    showScore();
    showQuestion();
    showPhoto();
    clearTimer();
    showTimer();
  });
});

//Toevoegen van alle vragen en antwoorden
function createQuestion() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "question.json");
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var question = JSON.parse(xhr.responseText);
      var qList = "";
      for (var i = 0; i < question.length; i += 1) {
        qList += '<ul class="question"><li class="vraag">';
        qList += question[i].question + "</li>";
        if (question[i].type == "MCSA") {
          for (var x = 0; x < question[i].answers.length; x += 1) {
            qList += `<li><label><input name="answer${i}"`;
            qList += ' value="';
            qList += question[i].answers[x].right;
            qList += '" type="radio">';
            qList += question[i].answers[x].answer + "</label> </li>";
          }
        }
        if (question[i].type == "open") {
          for (var y = 0; y < question[i].answers.length; y += 1) {
            qList += '<li><input type="text" value="YYYY"></li>';
            antwoordVier = question[i].answers[y].answer;
          }
        }
        qList += "</ul>";
      }
      document.getElementById("questions").innerHTML = qList;
    }
  });
  xhr.send();
}

// Het tonen van vragen
function showQuestion() {
  $("#questions").show();

  if (i > 0) {
    var x = i - 1;
    document.querySelectorAll(".question")[x].removeAttribute("id");
  }
  document
    .querySelectorAll(".question")
    [i].setAttribute("id", "currentQuestion");
  i++;
}

// Next button creëren en Start en How To Play verwijderen
function createButton() {
  $("#btnNext").show();
  $("#btnStart").hide();
  $("#btnHowTo").hide();
}

// Toon de gepaste foto bij elke vraag
function showPhoto() {
  document.getElementById("imgBig").src = photos[i].url;
}

//Check de antwoord
function checkAnswer() {
  if ($("#currentQuestion input:checked").val() == "true") {
    score++;
  }
  if (document.querySelector("#currentQuestion input").value == antwoordVier) {
    score++;
  }
}

//Creëer een score
function createScore() {
  $("#score").show();
  document.getElementById("score").innerHTML = score + "/10";
}

//Hide de div questions
function hideQuestions() {
  $("#questions").hide();
}

//Creër een timer
function createTimer() {
  $("#timer").show();
}
//Toon score
function showScore() {
  document.getElementById("score").innerHTML = score + "/10";
  if (oldScore != score) {
    document.getElementById("score").style.color = "green";
   showText = document.createTextNode("RIGHT!");
   text.appendChild(showText);
      document.body.appendChild(text);
      setTimeout(function() {
        showText.nodeValue="";
      }, 1000);
  } else {
    document.getElementById("score").style.color = "red";
    showText = document.createTextNode("WRONG!");
   text.appendChild(showText);;
      document.body.appendChild(text);
      setTimeout(function() {
        showText.nodeValue="";
      }, 1000);
  }
  oldScore = score;
}

// Toon score zonder heading
function showScoreAfterTimeOut() {
document.getElementById("score").innerHTML = score + "/10";
  if (oldScore != score) {
    document.getElementById("score").style.color = "green";
  } else {
    document.getElementById("score").style.color = "red";
  }
  oldScore = score;
}

//Toon timer
function showTimer() {
  myTimer = setInterval(function() {
    if (timer >= "10") {
      document.getElementById("timer").innerHTML = "00:" + timer;
    } else {
      document.getElementById("timer").innerHTML = "00:0" + timer;
    }
    timer--;

    if (timer == "-1") {
      clearInterval(myTimer);
      checkAnswer();
      showScoreAfterTimeOut()
      showQuestion();
      showPhoto();
      clearTimer();
      showTimer();
      showText = document.createTextNode("Time's Out!");
      text.appendChild(showText);
      document.body.appendChild(text);
      setTimeout(function() {
        showText.nodeValue="";
      }, 1000);
    }
  }, 750);
}

//Stop timer
function clearTimer() {
  clearInterval(myTimer);
  timer = "15";
}

