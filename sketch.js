let video;
let poseNet;
let pose;
let left;
let prev_left = 0;
let right;
let prev_right = 0;

function preload() {
  drum1 = loadSound("sounds/loetom.wav");
  drum2 = loadSound("sounds/midtom.wav");
  drum3 = loadSound("sounds/hietom.wav");
  drum4 = loadSound("sounds/acoustic_snare.wav");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log("Posenet ready");
}

function draw() {
  push();
  scale(-1, 1);
  image(video, -640, 0);
  pop();
  if (pose) {
    if (pose.leftWrist.x < width / 4) {
      left = 1;
    } else if (pose.leftWrist.x > width / 4 && pose.leftWrist.x < width / 2) {
      left = 2;
    } else if (
      pose.leftWrist.x > width / 2 &&
      pose.leftWrist.x < (3 * width) / 4
    ) {
      left = 3;
    } else if (pose.leftWrist.x > (3 * width) / 4) {
      left = 4;
    }
    if (pose.rightWrist.x < width / 4) {
      right = 1;
    } else if (pose.rightWrist.x > width / 4 && pose.rightWrist.x < width / 2) {
      right = 2;
    } else if (
      pose.rightWrist.x > width / 2 &&
      pose.rightWrist.x < (3 * width) / 4
    ) {
      right = 3;
    } else if (pose.rightWrist.x > (3 * width) / 4) {
      right = 4;
    }
    if (left != prev_left) {
      prev_left = left;
      if (left == 1) {
        drum1.play();
      } else if (left == 2) {
        drum2.play();
      } else if (left == 3) {
        drum3.play();
      } else {
        drum4.play();
      }
    }
    if (right != prev_right) {
      prev_right = right;
      if (right == 1) {
        drum1.play();
      } else if (right == 2) {
        drum2.play();
      } else if (right == 3) {
        drum3.play();
      } else {
        drum4.play();
      }
    }
    fill(0, 0, 255);
    ellipse(-pose.leftWrist.x, pose.leftWrist.y, 32);
    ellipse(-pose.rightWrist.x, pose.rightWrist.y, 32);
  }
  fill(0, 0, 255);
  ellipse(-width/2, height/2, 32);
  line(-width,height/2,0,height/2);
}
