window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const roadImg = new Image();
    roadImg.src = "./images/road.png";
    ctx.drawImage(roadImg, 0, 0, 500, 700);

    class Car {
      constructor() {
        this.x = 220;
        this.y = 500;

        const img = new Image();
        img.addEventListener("load", () => {
          this.img = img;
          this.draw();
        });
        img.src = "./images/car.png";
      }
      moveLeft() {
        if (this.x > 10) { this.x -= 10;}
      }
      moveRight() {
        if (this.x < 430) {this.x += 10;}
      }
      draw() {
        ctx.drawImage(this.img, this.x, this.y, 60, 120);
      }
    }

    const car = new Car();

    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37:
          car.moveLeft();
          break;
        case 39:
          car.moveRight();
          break;
      }
    });

    class Obstacle {
      constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      move() {
        this.y += 5; // adjust speed as needed
      }
    }

    let obstacles = [];
    let score = 0;

    function createObstacle() {
      let x = Math.floor(Math.random() * (canvas.width - 50));
      let y = -50;
      let width = Math.floor(Math.random() * 250 + 50);
      let height = 20;
      let color = "red";
      let obstacle = new Obstacle(x, y, width, height, color);
      obstacles.push(obstacle);
    }

    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
      car.draw();
      updateScore();

      for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        obstacles[i].move();
      }

      if (obstacles[i].y > canvas.height) {
        obstacles.splice(i, 1); 
        i--; 
    }
  }

    function updateScore() {
      score++;
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);
    }

    setInterval(() => {
      createObstacle();
    }, 2000);

    setInterval(() => {
      updateCanvas();
    }, 40);
  }
};
