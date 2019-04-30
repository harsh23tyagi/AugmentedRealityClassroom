const Diagnostics = require("Diagnostics");
const Scene = require("Scene");
const Networking = require("Networking");
const Time = require("Time");
const url = "https://e441f8b1.ngrok.io/api/test";
const Animation = require("Animation");
const NativeUI = require('NativeUI');
var ReactiveModule = require("Reactive");
const Audio = require('Audio');
const playbackController = Audio.getPlaybackController('Audio Playback Controller');

var ft = Scene.root
  .child("Device")
  .child("Camera")
  .child("Focal Distance")
  .child("BrainAreas");

var br1 = ft
  .child("container")
  .child("RootNode (model correction matrix)")
  .child("Brain_Model.fbx")
  .child("RootNode")
  .child("Brain")
  .child("Brain_Part_06");

var br2 = ft
  .child("container")
  .child("RootNode (model correction matrix)")
  .child("Brain_Model.fbx")
  .child("RootNode")
  .child("Brain")
  .child("Brain_Part_02");

var br3 = ft
  .child("container")
  .child("RootNode (model correction matrix)")
  .child("Brain_Model.fbx")
  .child("RootNode")
  .child("Brain")
  .child("Brain_Part_03");

var br4 = ft
  .child("container")
  .child("RootNode (model correction matrix)")
  .child("Brain_Model.fbx")
  .child("RootNode")
  .child("Brain")
  .child("Brain_Part_04");
  const text1  = ft.child("3dText0");
  const text2  = ft.child("3dText1");

// rpi requests
const request = {
  // The HTTP Method of the request
  // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  method: "GET",

  // The HTTP Headers of the request
  // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
  headers: { "Content-type": "application/json; charset=UTF-8" }

  // The data to send, in string format
  //var obj = J{"topic":"mqtt/demo", "payload":1};
  //body: JSON.stringify({ topic: "mqtt/demo", payload: 1 })
};

var Patches = require("Patches");

var x = Patches.getVectorValue("input").x;
var y = Patches.getVectorValue("input").y;
// const Reactive = require("Reactive");

//const transformAnimation = Animation.valueDriver(y, -18, -14);
// Create a sampler with a linear change from 1 to 2
//const linearSampler = Animation.samplers.linear(11.7602, 0);
//Diagnostics.log(Animation.samplers);
// Create an animation combining the driver and sampler
//const scaleAnimation = Animation.animate(transformAnimation, linearSampler);
var stepZero = false;
var stepOne = true;
var stepTwo = true;
var stepThree = true;
var stepFour = true;
var stepFive = true;
var stepSix = true;
var stepSeven = true;
var stepEight = true;


const timeDriverParameters = {
  // The duration of the driver
  durationMilliseconds: 3000,

  // The number of iterations before the driver stops
  loopCount: 1,

  // Should the driver 'yoyo' back and forth
  mirror: false
};

function move(start, end) {
  const timeDriver = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler = Animation.samplers.easeInOutQuad(start, end);
  const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
  ft.transform.y = translationAnimation;
  //textNodeName.transform.y= translationAnimation;
  timeDriver.start();
}

function movetext(textname, startx, endx, starty, endy) {
  const timeDriver = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler = Animation.samplers.easeInOutQuad(startx, endx);
  const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
  textname.transform.x= translationAnimation;
  timeDriver.start();

  const timeDriver2 = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler2 = Animation.samplers.easeInOutQuad(starty, endy);
  const translationAnimation2 = Animation.animate(timeDriver2,quadraticSampler2);
  textname.transform.y = translationAnimation2;
  timeDriver2.start();
}

function axisRotation(axis_x, axis_y, axis_z, angle_degrees) {
  var norm = Math.sqrt(axis_x * axis_x + axis_y * axis_y + axis_z * axis_z);
  axis_x /= norm;
  axis_y /= norm;
  axis_z /= norm;
  var angle_radians = (angle_degrees * Math.PI) / 180.0;
  var cos = Math.cos(angle_radians / 2);
  var sin = Math.sin(angle_radians / 2);
  return ReactiveModule.rotation(cos, axis_x * sin, axis_y * sin, axis_z * sin);
}

function rotate(start, end) {
  const timeDriverParameters = {
    // The duration of the driver
    durationMilliseconds: 1000,

    // The number of iterations before the driver stops
    loopCount: 1,

    // Should the driver 'yoyo' back and forth
    mirror: false
  };

  var rotation_sampler = Animation.samplers.polyline({
    keyframes: [axisRotation(0, 1, 0, start), axisRotation(0, 1, 0, end)],
    knots: [0, 1]
  });

  const timeDriver = Animation.timeDriver(timeDriverParameters);
  //const quadraticSampler = Animation.samplers.linear(start, end);
  const translationAnimation = Animation.animate(timeDriver, rotation_sampler);
  ft.transform.rotation = translationAnimation;
  timeDriver.start();
}

function scale(start, end) {
  const timeDriver = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler = Animation.samplers.easeInOutQuad(start, end);
  const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
  ft.transform.scaleY = translationAnimation;
  ft.transform.scaleX = translationAnimation;
  ft.transform.scaleZ = translationAnimation;
  timeDriver.start();
}
function moveBrainChild(childname, startx, endx, starty, endy) {
  const timeDriver = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler = Animation.samplers.easeInOutQuad(starty, endy);
  const translationAnimation = Animation.animate(timeDriver, quadraticSampler);
  childname.transform.y = translationAnimation;
  timeDriver.start();

  const timeDriver2 = Animation.timeDriver(timeDriverParameters);
  const quadraticSampler2 = Animation.samplers.easeInOutQuad(startx, endx);
  const translationAnimation2 = Animation.animate(timeDriver2,quadraticSampler2);
  childname.transform.x = translationAnimation2;
  timeDriver2.start();
}
function stopaudio(){
  playbackController.stop();
}
function callNetwork() {
  Networking.fetch(url, request) // just change the url to urlLock to lock tesla
    .then(function(result) {
      // Check the status of the result
      // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
      if (result.status == 200) {
        // If the request was successful, chain the JSON forward
        Diagnostics.log("Success");
        return result.json();
      } else {
        Diagnostics.log("failure");
      }
      
      // If the request was not successful, throw an error
      throw new Error("HTTP status code - " + result.status);
    })
    .then(function(json) {
      Diagnostics.log(json[0].steps);
      // Log the JSON obtained by the successful request
      //Diagnostics.log("Successfully sent - " + json.topic);
      Diagnostics.log("Successfully sent - " + json[0].steps);

      if (json[0].steps == "1000" && stepOne) {
        move(11.7602, 0);
        rotate(0, 45);
        scale(0.15, 0.20);
        movetext(text1,250,-60,11.7602, 45);
        playbackController.play();
        Time.setTimeout(stopaudio, 2000);
        stepOne = false;
        stepTwo = true;
        stepZero = true;
      }
      if (json[0].steps == "1100" && stepTwo) {
        moveBrainChild(br1, 0, -80, 0, 9);
        movetext(text2, -191,-60,4, -18);
        playbackController.play();
        Time.setTimeout(stopaudio, 2000);
        stepTwo = false;
      }
      if (json[0].steps == "0000" && stepZero) {
        stepOne = true;
        move(0, 11.7602);
        rotate(45, 0);
        scale(0.2, 0.15);
        moveBrainChild(br1, -80, 0, 9, 0);
        movetext(text1,-60,250,45,11.7602);
        movetext(text2, -60,-191,-18, 4);
        playbackController.play();
        Time.setTimeout(stopaudio, 2000);
        stepZero = false;
      }
      if (json[0].steps == "1111" && stepFour) 
      {
        //extra
      }
    })
    .catch(function(error) {
      // Log any errors that may have happened with the request
      Diagnostics.log("Error - " + error);
    });
}
// function mov1() {
//   move(11.7602, 0);
//   rotate(0, 45);
//   scale(0.15, 0.25);
// movetext(text1,250,-100,11.7602, 180);
// playbackController.play();
// Time.setTimeout(stopaudio, 2000);
// }
// function mov2() {
//   move(11.7602, 0);
//   rotate(0, 45);
//   scale(0.15, 0.25);
//   moveBrainChild(br1, 0, -80, 0, 9);
//   movetext(text1,191,-50,11.7602, 50);
//   movetext(text2, -191,-60,4, -18);
// }
// mov2();
const timeInMilliseconds = 3000;
const intervalTimer = Time.setInterval(callNetwork, timeInMilliseconds);
