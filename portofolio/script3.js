let classifier;
let img;
let resultDiv;
let video; 

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  resultDiv = select('#result');
  video = createCapture(VIDEO); 
  video.size(320, 240); 
  video.hide(); 
}

function takePicture() {
  img = video.get();
  classifyImage();
}

function classifyImage() {
  if (img) {
    classifier.classify(img, gotResult);
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    resultDiv.html('Resultaat: ' + results[0].label);
  }
}
