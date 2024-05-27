let handpose;
let video;
let predictions = [];
let balls = [];
let score = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });

  video.hide();

  setInterval(generateBall, 1000); 
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(0);

  image(video, 0, 0, width, height);

  drawKeypoints();

  updateBalls();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].landmarks;

    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(255, 0, 0);
      ellipse(x, y, 10, 10);

      for (let k = balls.length - 1; k >= 0; k--) {
        const ball = balls[k];
        const d = dist(x, y, ball.x, ball.y);
        if (d < 15) { 
          balls.splice(k, 1); 
          score++; 
        }
      }
    }
  }

  textSize(32);
  fill(255);
  text("Score: " + score, 10, 30);
}

function generateBall() {
  const newBall = {
    x: random(width),
    y: random(height),
    radius: 15
  };
  balls.push(newBall);
}

function updateBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];
    fill(0, 0, 255);
    ellipse(ball.x, ball.y, ball.radius * 2);
  }
}
