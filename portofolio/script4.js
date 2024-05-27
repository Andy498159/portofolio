let x, y; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  x = width / 2; 
  y = height / 2;

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
  } else {
    console.error('Device orientation wordt niet ondersteund door dit apparaat.');
  }
}

function draw() {
  background(220); 
  fill(255, 0, 0); 
  ellipse(x, y, 50, 50); 
}

function handleOrientation(event) {
  let dx = event.gamma; 
  let dy = event.beta; 

  dx = map(dx, -90, 90, -5, 5);
  dy = map(dy, -90, 90, -5, 5); 

  x += dx;
  y += dy;

  x = constrain(x, 25, width - 25); 
  y = constrain(y, 25, height - 25);
}
