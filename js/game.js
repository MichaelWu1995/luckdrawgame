var spin = true;
var deg = 0;
var wheel = document.querySelector(".box");
var element = document.getElementById("mainbox");
var music = document.getElementById("bgm");
var loseMusic = document.getElementById("lose");
var sucessMusic = document.getElementById("success");
var canvas = document.getElementById("canvas");
var awardList = [
  {
    id: 101,
    award: "SAVE $0",
    percent: 12.5,
  },

  {
    id: 102,
    award: "COLES $100",
    percent: 12.5,
  },

  {
    id: 103,
    award: "SAVE $3",
    percent: 12.5,
  },

  {
    id: 104,
    award: "SAVE $4",
    percent: 12.5,
  },

  {
    id: 105,
    award: "SAVE $5",
    percent: 12.5,
  },

  {
    id: 106,
    award: "SAVE $6",
    percent: 12.5,
  },

  {
    id: 107,
    award: "SAVE $7",
    percent: 12.5,
  },

  {
    id: 108,
    award: "SAVE $8",
    percent: 12.5,
  },
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
    document.getElementById("btn-spin").disabled = true;
    music.play();
    var percentage = Math.random() * 100;
    var totalPercent = 0;
    var deg;
    for (var i = awardList.length - 1; i >= 0; i--) {
      totalPercent += awardList[i].percent;
      if (percentage <= totalPercent) {
        console.log(totalPercent);
        console.log(percentage);
        deg = 3982.5 - 45 * i - Math.floor(Math.random() * 46);
        break;
      }
    }
    
    wheel.style.transition = "all 10s ease-out";
    wheel.style.transform = "rotate(" + deg + "deg)";

    wheel.addEventListener(
      "transitionend",
      () => {
        wheel.style.transition = "none";
        var actualDeg = deg % 360;
        console.log(actualDeg);
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        music.pause();
        if (actualDeg >= 0 && actualDeg < 22.5) {
          loseMusic.play();
          losePop();
        } else if (actualDeg > 22.5 && actualDeg < 67.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[7].award);
        } else if (actualDeg > 67.5 && actualDeg < 112.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[6].award);
        } else if (actualDeg > 112.5 && actualDeg < 157.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[5].award);
        } else if (actualDeg > 157.5 && actualDeg < 202.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[4].award);
        } else if (actualDeg > 202.5 && actualDeg < 247.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[3].award);
        } else if (actualDeg > 247.5 && actualDeg < 292.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[2].award);
        } else if (actualDeg > 292.5 && actualDeg < 337.5) {
          sucessMusic.play();
          startFire();
          succPop(awardList[1].award);
        } else if (actualDeg > 337.5 && actualDeg < 360) {
          loseMusic.play();
          losePop();
        } else {
          loseMusic.play();
          losePop();
        }
        spin = true;
        document.getElementById("btn-spin").disabled = false;
      },
      { once: true }
    );
  }
}

//Update the price in the wheel
function updatePrice() {
  document.getElementById("span1_one").innerHTML = awardList[6].award;
  document.getElementById("span1_two").innerHTML = awardList[2].award;
  document.getElementById("span1_three").innerHTML = awardList[4].award;
  document.getElementById("span1_four").innerHTML = awardList[0].award;

  document.getElementById("span2_one").innerHTML = awardList[3].award;
  document.getElementById("span2_two").innerHTML = awardList[7].award;
  document.getElementById("span2_three").innerHTML = awardList[1].award;
  document.getElementById("span2_four").innerHTML = awardList[5].award;
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
        awardList[0].award = snapShot.val()[0].award;
        awardList[1].award = snapShot.val()[1].award;
        awardList[2].award = snapShot.val()[2].award;
        awardList[3].award = snapShot.val()[3].award;
        awardList[4].award = snapShot.val()[4].award;
        awardList[5].award = snapShot.val()[5].award;
        awardList[6].award = snapShot.val()[6].award;
        awardList[7].award = snapShot.val()[7].award;

        awardList[0].percent = snapShot.val()[0].percent;
        awardList[1].percent = snapShot.val()[1].percent;
        awardList[2].percent = snapShot.val()[2].percent;
        awardList[3].percent = snapShot.val()[3].percent;
        awardList[4].percent = snapShot.val()[4].percent;
        awardList[5].percent = snapShot.val()[5].percent;
        awardList[6].percent = snapShot.val()[6].percent;
        awardList[7].percent = snapShot.val()[7].percent;
        // console.log(
        //   awardList[0].percent,
        //   awardList[1].percent,
        //   awardList[2].percent,
        //   awardList[3].percent,
        //   awardList[4].percent,
        //   awardList[5].percent,
        //   awardList[6].percent,
        //   awardList[7].percent
        // );
        updatePrice();
      } else {
        console.log("no data found");
      }
    }
  }

  mainApp.Read = fnRead;
})();
