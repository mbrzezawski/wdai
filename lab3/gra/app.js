document.addEventListener("DOMContentLoaded", function () {
  function generateGame(x) {
    var lives = 3;
    var score = x + 30;

    var scoreValue = document.querySelector(".score span");
    var scoreValue2 = document.querySelector(".game-over-container span");
    var livesImages = document.querySelectorAll(".lives img");
    var restartDiv = document.querySelector(".game-over-container");
    restartDiv.id = "xd";
    var plansza = document.querySelector(".plansza");

    var timer = setInterval(function () {
      var zombie = document.createElement("div");
      zombie.classList.add("zombie");

      //Scale
      var scale = 0.8 + Math.random() * 0.5;
      zombie.style.transform = "scale(" + scale + ")";

      //blur
      if (bottomPos > 200) {
        zombie.style.filter = "blur(2px)";
      } else if (bottomPos > 100) {
        zombie.style.filter = "blur(1px)";
      } else {
      }

      var min = 10;
      var max = 360;
      var bottomPos = Math.floor(Math.random() * (max - min + 1) + min);

      zombie.style.bottom = bottomPos + "px";

      zombie.style.zIndex = 360 - bottomPos;

      //movement speed
      var min = 10;
      var max = 20;
      var walkSpeed = Math.floor(Math.random() * (max - min + 1) + min);
      var anim = "0.5s," + walkSpeed + "s";
      zombie.style.animationDuration = anim;

      //zombie life
      zombie.live = 1;

      plansza.appendChild(zombie);
      document.addEventListener("mousemove", function (e) {
        let image = document.getElementById("image");
        let left = e.clientX - image.width / 2;
        let top = e.clientY - image.width / 2;
        image.style.left = left + "px";
        image.style.top = top + "px";
      });

      zombie.addEventListener("animationend", function (e) {
        if (e.animationName === "zombieWalk") {
          if (lives > 0) {
            lives--;
            updateLives();
            this.remove();
            scoreValue2.innerText = score;
            scoreValue.innerText = score;
          }
          if (lives <= 0) {
            clearInterval(timer);
            displayGameOver();
            scoreValue2.innerText = score;
            scoreValue.innerText = score;
          }
        }
        scoreValue2.innerText = score;
        scoreValue.innerText = score;
      });
    }, 500);

    plansza.addEventListener("click", function (e) {
      if (score > 0) {
        if (e.target.classList.contains("zombie")) {
          e.target.live--;
          if (e.target.live <= 0) {
            score += 10;
            e.target.remove();
          }
        } else {
          // Jeśli kliknięcie nie trafia w zombie, odejmij 3 punkty
          score -= 3;
        }
        scoreValue.innerText = score;
        scoreValue2.innerText = score;
      }
    });

    function displayGameOver() {
      // Usuń wszystkie zombie z planszy
      var zombies = document.querySelectorAll(".zombie");
      zombies.forEach(function (zombie) {
        zombie.remove();
      });

      // Zatrzymaj interwał
      clearInterval(timer);

      // Pokaż przycisk restartu
      restartDiv.style.display = "block";
      restartDiv.addEventListener("click", restartGame);
    }

    function updateLives() {
      for (var i = 0; i < livesImages.length; i++) {
        if (i >= lives) {
          console.log(livesImages);
          livesImages[i].src = "./png/empty_heart.png";
        }
      }
      if (lives == 0) {
        displayGameOver();
      }
    }
  }
  function restartGame() {
    var gameOverDiv = document.getElementById("xd");
    gameOverDiv.style.display = "none";
    var livesImages = document.querySelectorAll(".lives img");
    for (var i = 0; i < 3; i++) {
      livesImages[i].src = "./png/full_heart.png";
    }
    generateGame(3);
  }

  generateGame(0);
});
