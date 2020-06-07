var spin = true;
var deg = 0;
var wheel = document.querySelector(".box");
var element = document.getElementById("mainbox");
var music = document.getElementById("bgm");
var loseMusic = document.getElementById("lose");
var sucessMusic = document.getElementById("success");
var canvas = document.getElementById("canvas");
var awardList = [
  "SAVE $0",
  "SAVE $2",
  "SAVE $0",
  "SAVE $4",
  "SAVE $0",
  "SAVE $7",
  "SAVE $0",
  "SAVE $5",
];
var coupon = canvas.getContext("2d");
var c = 0;
var mainApp = {};

document.getElementById("shadow").addEventListener(
  "touchstart",
  function () {
    music.load();
    loseMusic.load();
    sucessMusic.load();
  },
  false
);

//The winning effect when user wins the price
function startFire() {
  var end = Date.now() + 15 * 200;

  var colors = ["#ffd700", "#ff0000"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// 中奖弹窗
function succPop(x) {
  if (c == 0) {
    document.getElementById("succPop").style.display = "block";
    document.getElementById("succBox").style.display = "block";
    document.getElementById("result").innerHTML = x;
    c = 1;
  } else {
    document.getElementById("succPop").style.display = "none";
    document.getElementById("succBox").style.display = "none";

    c = 0;
  }
}

// close按钮隐藏窗口
function popClose() {
  if (c == 1) {
    document.getElementById("succPop").style.display = "none";
    document.getElementById("succBox").style.display = "none";
    c = 0;
  }
}

// // 未中奖弹窗
function losePop(x) {
  if (c == 0) {
    document.getElementById("failPop").style.display = "block";
    document.getElementById("loseBox").style.display = "block";
    c = 1;
  } else {
    document.getElementById("failPop").style.display = "none";
    document.getElementById("loseBox").style.display = "none";
    c = 0;
  }
}

// close按钮隐藏窗口
function losePopClose() {
  if (c == 1) {
    document.getElementById("failPop").style.display = "none";
    document.getElementById("loseBox").style.display = "none";
    c = 0;
  }
}

//Spin the wheel
function myfunction() {
  if (spin) {
    spin = false;
    music.play();
    deg = Math.floor(3000 + Math.random() * 3000);
    wheel.style.transition = "all 10s ease-out";
    wheel.style.transform = "rotate(" + deg + "deg)";

    wheel.addEventListener(
      "transitionend",
      () => {
        wheel.style.transition = "none";
        var actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        music.pause();
        if (actualDeg >= 0 && actualDeg < 22.5) {
          loseMusic.play();
          losePop();
        } else if (actualDeg > 22.5 && actualDeg < 67.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[5]);
        } else if (actualDeg > 67.5 && actualDeg < 112.5) {
          loseMusic.play();
          losePop();
        } else if (actualDeg > 112.5 && actualDeg < 157.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[7]);
        } else if (actualDeg > 157.5 && actualDeg < 202.5) {
          loseMusic.play();
          losePop();
        } else if (actualDeg > 202.5 && actualDeg < 247.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[3]);
        } else if (actualDeg > 247.5 && actualDeg < 292.5) {
          loseMusic.play();
          losePop();
        } else if (actualDeg > 292.5 && actualDeg < 337.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[1]);
          // draw(awardList[6]);
        } else if (actualDeg > 337.5 && actualDeg < 360) {
          loseMusic.play();
          losePop();
        } else {
          loseMusic.play();
          losePop();
          // draw("try again");
        }
        spin = true;
      },
      { once: true }
    );
  }
}

//Update the price in the wheel
function updatePrice() {
  document.getElementById("span1_one").innerHTML = awardList[6];
  document.getElementById("span1_two").innerHTML = awardList[2];
  document.getElementById("span1_three").innerHTML = awardList[4];
  document.getElementById("span1_four").innerHTML = awardList[0];

  document.getElementById("span2_one").innerHTML = awardList[3];
  document.getElementById("span2_two").innerHTML = awardList[5];
  document.getElementById("span2_three").innerHTML = awardList[1];
  document.getElementById("span2_four").innerHTML = awardList[7];
}

//Show the pop up input to let user enter the password
function popupPass() {
  var popup = document.getElementById("myPopup");
  popup.style.display = "block";
}

//Hide the pop up input
function popupClose() {
  document.getElementById("myPopup").style.display = "none";
}

(function () {
  var firebase = app_firebase;
  var userid = null;

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      updatePrice();
    } else {
      $("#signout_btn").val("Sign Out");
      $("#signout_btn").click(function () {
        firebase.auth().signOut();
      });
    }

    var user = firebase.auth().currentUser;

    if (user != null) {
      userid = user.uid;
      fnRead();
    }
  });

  function messageHandler(err) {
    if (!!err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }

  async function fnRead() {
    var path = "users/" + userid;
    app_firebase.databaseApi.read(path, successFn, messageHandler);

    function successFn(snapShot) {
      if (!!snapShot) {
        awardList[0] = snapShot.val().item5;
        awardList[2] = snapShot.val().item6;
        awardList[4] = snapShot.val().item7;
        awardList[6] = snapShot.val().item8;
        awardList[1] = snapShot.val().item1;
        awardList[3] = snapShot.val().item2;
        awardList[5] = snapShot.val().item3;
        awardList[7] = snapShot.val().item4;
        updatePrice();
      } else {
        console.log("no data found");
      }
    }
  }

  mainApp.Read = fnRead;
})();
