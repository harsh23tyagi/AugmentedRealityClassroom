const Diagnostics = require("Diagnostics");
const Scene = require("Scene");
const FaceTracking = require("FaceTracking");
const HandTracking = require("HandTracking");
const Networking = require("Networking");
const Animation = require("Animation");
const Patches = require("Patches");
const ReactiveModule = require("Reactive");
const hand = HandTracking.hand(0);

// //const focalDistance = Scene.root.find("Focal Distance");

// var text1 = Scene.root
//   .find("Focal Distance")
//   .child("canvas")
//   .child("rect")
//   .child("text0");

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

// var Patches = require("Patches");

var x = Patches.getVectorValue("input").x;
var y = Patches.getVectorValue("input").y;
var z = Patches.getVectorValue("input").z;
// text1.text = y.toString();

Diagnostics.watch("X: ", x);
Diagnostics.watch("Y: ", y);
Diagnostics.watch("Z: ", z);

//--------Network Call-----------

// rpi requests

const url = "https://e441f8b1.ngrok.io/api/test";
//"https://e9cdc3ab.ngrok.io/testUser";
// http://35.247.106.45:8080/api/test

function networkCall(payload1) {
  const request = {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ topic: "mqtt/demo", payload: payload1 })
  };

  Networking.fetch(url, request)
    .then(function(result) {
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
      // Log the JSON obtained by the successful request
      Diagnostics.log("Successfully sent - " + json.step);
    })
    .catch(function(error) {
      // Log any errors that may have happened with the request
      Diagnostics.log("Error - " + error);
    });
}

//---------Network Call Ends----------
//-----------------Animations-----------------------
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
  timeDriver.start();
}

//------------Axis Rotation--------------
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
//---------Axis rotation-----------------

//--------------Scale------------------
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
  const translationAnimation2 = Animation.animate(
    timeDriver2,
    quadraticSampler2
  );
  childname.transform.x = translationAnimation2;
  timeDriver2.start();
}
//-------------Scale End-------

var flagOne = true;
var flagTwo = true;
var flagChild1 = false;
var myVector = Patches.getVectorValue("input");
Patches.getVectorValue("input")
  .y.monitor()
  .subscribe(function() {
    var x = myVector.x.pinLastValue();
    var y2 = y.pinLastValue();
    if (y2 > 12 && y2 < 16 && flagOne) {
      flagOne = false;
      flagTwo = true;
      move(11.7602, 0);
      rotate(0, 45);
      scale(0.15, 0.2);
      networkCall(1);
      flagChild1 = true;
    }

    if (y2 > 8 && y2 < 12 && flagChild1 && HandTracking.count.eq(1)) {
      flagChild1 = false;

      moveBrainChild(br1, 0, -80, 0, 9);
      networkCall(2);
    }

    if (y2 > -20 && y2 < -15 && flagTwo) {
      flagTwo = false;
      flagOne = true;
      move(0, 11.7602);
      rotate(45, 0);
      scale(0.2, 0.15);
      moveBrainChild(br1, -80, 0, 9, 0);
      networkCall(0);
    }
  });

// // Patches.getVectorValue("distanceFrmBrain")
// //   .y.monitor()
// //   .subscribe(function() {
// //     if (
// //       y.pinLastValue() > 0.11 &&
// //       y.pinLastValue() < 0.2 &&
// //       hand.count == 1 &&
// //       flagOne
// //     ) {
// //       Diagnostics.log("Inside");
// //       Networking.fetch(url, request) // just change the url to urlLock to lock tesla
// //         .then(function(result) {
// //           // Check the status of the result
// //           // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
// //           if (result.status == 200) {
// //             // If the request was successful, chain the JSON forward
// //             Diagnostics.log("Success");
// //             return result.json();
// //           } else {
// //             Diagnostics.log("failure");
// //           }

// //           // If the request was not successful, throw an error
// //           throw new Error("HTTP status code - " + result.status);
// //         })
// //         .then(function(json) {
// //           // Log the JSON obtained by the successful request
// //           Diagnostics.log("Successfully sent - " + json.topic);
// //         })
// //         .catch(function(error) {
// //           // Log any errors that may have happened with the request
// //           Diagnostics.log("Error - " + error);
// //         });
// //       flagOne = false;

// //       flagTwo = true;
// //     }
// //   });

// // const requestLow = {
// //   // The HTTP Method of the request
// //   // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
// //   method: "POST",

// //   // The HTTP Headers of the request
// //   // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
// //   headers: { "Content-type": "application/json; charset=UTF-8" },

// //   // The data to send, in string format
// //   //var obj = J{"topic":"mqtt/demo", "payload":1};
// //   body: JSON.stringify({ topic: "mqtt/demo", payload: 0 })
// // };

// // //--rpi requests end

// // //--tesla requests

// // //--tesla requests end

// // var Patches = require("Patches");

// // var x = Patches.getVectorValue("input").x;
// // var y = Patches.getVectorValue("input").y;
// // // const Reactive = require("Reactive");

// // Diagnostics.watch("X: ", x);
// // Diagnostics.watch("Y: ", y);
// // var flagOne = true;
// // var flagTwo = false;

// // Patches.getVectorValue("input")
// //   .x.monitor()
// //   .subscribe(function() {
// //     if (x.pinLastValue() > 8 && x.pinLastValue() < 15 && flagOne) {
// //       Networking.fetch(url, request) // just change the url to urlLock to lock tesla
// //         .then(function(result) {
// //           // Check the status of the result
// //           // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
// //           if (result.status == 200) {
// //             // If the request was successful, chain the JSON forward
// //             Diagnostics.log("Success");
// //             return result.json();
// //           } else {
// //             Diagnostics.log("failure");
// //           }

// //           // If the request was not successful, throw an error
// //           throw new Error("HTTP status code - " + result.status);
// //         })
// //         .then(function(json) {
// //           // Log the JSON obtained by the successful request
// //           Diagnostics.log("Successfully sent - " + json.topic);
// //         })
// //         .catch(function(error) {
// //           // Log any errors that may have happened with the request
// //           Diagnostics.log("Error - " + error);
// //         });
// //       flagOne = false;
// //       flagTwo = true;
// //     }

// //     if (x.pinLastValue() < 5 && x.pinLastValue() > 1 && flagTwo) {
// //       Networking.fetch(url, requestLow) //just change the url to urlUnlock for unlocking tesla- we are using hard coded tokens for now
// //         .then(function(result) {
// //           // Check the status of the result
// //           // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
// //           if (result.status == 200) {
// //             // If the request was successful, chain the JSON forward
// //             Diagnostics.log("Success");
// //             return result.json();
// //           } else {
// //             Diagnostics.log("failure");
// //           }

// //           // If the request was not successful, throw an error
// //           throw new Error("HTTP status code - " + result.status);
// //         })
// //         .then(function(json) {
// //           // Log the JSON obtained by the successful request
// //           Diagnostics.log("Successfully sent - " + json.topic);
// //         })
// //         .catch(function(error) {
// //           // Log any errors that may have happened with the request
// //           Diagnostics.log("Error - " + error);
// //         });
// //       flagTwo = false;
// //       flagOne = true;
// //     }
// //   });

// //----old projects end--------

// // Patches.getVectorValue("input")
// //   .y.monitor()
// //   .subscribe(function() {
// //     if (y.pinLastValue() < -12 && x.pinLastValue() > -15) {
// //       Networking.fetch(url, requestLow)
// //         .then(function(result) {
// //           // Check the status of the result
// //           // (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
// //           if (result.status == 200) {
// //             // If the request was successful, chain the JSON forward
// //             Diagnostics.log("Success");
// //             return result.json();
// //           } else {
// //             Diagnostics.log("failure");
// //           }

// //           // If the request was not successful, throw an error
// //           throw new Error("HTTP status code - " + result.status);
// //         })
// //         .then(function(json) {
// //           // Log the JSON obtained by the successful request
// //           Diagnostics.log("Successfully sent - " + json.topic);
// //         })
// //         .catch(function(error) {
// //           // Log any errors that may have happened with the request
// //           Diagnostics.log("Error - " + error);
// //         });
// //     }
// //   });

// // //Diagnostics.watch("b:", b);
// // // Patches.getVectorValue("input").subscribe(function(e) {
// // //   Diagnostics.log("Tap!");
// // // });

// // //Diagnostics.log("Hn",hand.center);
// // //Diagnostics.watch("Position - ", hand.cameraTransform);

// //==============================================================================
// // Create the request
// //==============================================================================
