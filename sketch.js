let video;
let poseNet;
let pose;
let left;
let prev_left = 0;
let right;
let prev_right = 0;

function preload() {
  drum1 = loadSound(loetom);
  drum2 = loadSound(midtom);
  drum3 = loadSound(hietom);
  drum4 = loadSound(acoustic_snare);
}

function setup() {
  createCanvas(640, 480);
  frameRate(15);
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
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();
  if (pose) {
    // leftwrist detection
    if (pose.leftWrist.y > (3 * height) / 4) {
      if (pose.leftWrist.x < width / 4 && pose.leftWrist.x > 0) {
        left = 1;
      } else if (pose.leftWrist.x > width / 4 && pose.leftWrist.x < width / 2) {
        left = 2;
      } else if (
        pose.leftWrist.x > width / 2 &&
        pose.leftWrist.x < (3 * width) / 4
      ) {
        left = 3;
      } else if (
        pose.leftWrist.x > (3 * width) / 4 &&
        pose.leftWrist.x < width
      ) {
        left = 4;
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
    } else {
      prev_left = 0;
    }
    //rightwrist detection
    if (pose.rightWrist.y > (3 * height) / 4) {
      if (pose.rightWrist.x < width / 4 && pose.rightWrist.x > 0) {
        right = 1;
      } else if (
        pose.rightWrist.x > width / 4 &&
        pose.rightWrist.x < width / 2
      ) {
        right = 2;
      } else if (
        pose.rightWrist.x > width / 2 &&
        pose.rightWrist.x < (3 * width) / 4
      ) {
        right = 3;
      } else if (
        pose.rightWrist.x > (3 * width) / 4 &&
        pose.rightWrist.x < width
      ) {
        right = 4;
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
    } else {
      prev_right = 0;
    }
    // draw wrist location
    push();
    translate(width, 0);
    scale(-1, 1);
    fill(0, 0, 255);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 16);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 16);
    pop();
  }
  // trigger line
  line(0, (3 * height) / 4, width, (3 * height) / 4);
  line(width / 4, (3 * height) / 4, width / 4, height);
  line(width / 2, (3 * height) / 4, width / 2, height);
  line((3 * width) / 4, (3 * height) / 4, (3 * width) / 4, height);
}
