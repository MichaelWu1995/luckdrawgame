var mainApp = {};

(function () {
  var firebase = app_firebase;
  var userid = null;
  var price1 = "";
  var price2 = "";
  var price3 = "";
  var price4 = "";
  var price5 = "";
  var price6 = "";
  var price7 = "";
  var price8 = "";

  var percent1 = "";
  var percent2 = "";
  var percent3 = "";
  var percent4 = "";
  var percent5 = "";
  var percent6 = "";
  var percent7 = "";
  var percent8 = "";

  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "signin.html";
    }

    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      userid = user.uid;
      document.getElementById("email").innerHTML = "Welcome User: " + email_id;
      fnRead();
    }
  });

  $("#out_btn").click(function () {
    firebase.auth().signOut();
  });

  $("#add_btn").click(function () {
    price1 = $("#price1").val();
    price2 = $("#price2").val();
    price3 = $("#price3").val();
    price4 = $("#price4").val();
    price5 = $("#price5").val();
    price6 = $("#price6").val();
    price7 = $("#price7").val();
    price8 = $("#price8").val();

    percent1 = $("#percent1").val() * 1;
    percent2 = $("#percent2").val() * 1;
    percent3 = $("#percent3").val() * 1;
    percent4 = $("#percent4").val() * 1;
    percent5 = $("#percent5").val() * 1;
    percent6 = $("#percent6").val() * 1;
    percent7 = $("#percent7").val() * 1;
    percent8 = $("#percent8").val() * 1;
    var result =
      percent1 +
      percent2 +
      percent3 +
      percent4 +
      percent5 +
      percent6 +
      percent7 +
      percent8;
    console.log(result);

    if (
      price1 != "" &&
      price2 != "" &&
      price3 != "" &&
      price4 != "" &&
      price5 != "" &&
      price6 != "" &&
      price7 != "" &&
      price8 != "" &&
      percent1 != "" &&
      percent2 != "" &&
      percent3 != "" &&
      percent4 != "" &&
      percent5 != "" &&
      percent6 != "" &&
      percent7 != "" &&
      percent8 != ""
    ) {
      if (result == 100) {
        fnCreate();
        window.location.href = "index.html";
      } else {
        alert("Total Percentage should be equal to 100%!");
      }
    } else {
      alert("Please Fill Out All Fields!");
    }
  });

  function messageHandler(err) {
    if (!!err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }

  function fnCreate() {
    var path = "users/" + userid;

    var data = [
      {
        id: 101,
        award: price1,
        percent: percent1,
      },

      {
        id: 102,
        award: price2,
        percent: percent2,
      },

      {
        id: 103,
        award: price3,
        percent: percent3,
      },

      {
        id: 104,
        award: price4,
        percent: percent4,
      },

      {
        id: 105,
        award: price5,
        percent: percent5,
      },

      {
        id: 106,
        award: price6,
        percent: percent6,
      },

      {
        id: 107,
        award: price7,
        percent: percent7,
      },

      {
        id: 108,
        award: price8,
        percent: percent8,
      },
    ];

    app_firebase.databaseApi.create(path, data, messageHandler);
  }

  async function fnRead() {
    var path = "users/" + userid;
    app_firebase.databaseApi.read(path, successFn, messageHandler);

    function successFn(snapShot) {
      if (snapShot) {
        console.log(snapShot.val()[0].award);
        $("#price1").attr("value", snapShot.val()[0].award);
        $("#price2").attr("value", snapShot.val()[1].award);
        $("#price3").attr("value", snapShot.val()[2].award);
        $("#price4").attr("value", snapShot.val()[3].award);
        $("#price5").attr("value", snapShot.val()[4].award);
        $("#price6").attr("value", snapShot.val()[5].award);
        $("#price7").attr("value", snapShot.val()[6].award);
        $("#price8").attr("value", snapShot.val()[7].award);

        $("#percent1").attr("value", snapShot.val()[0].percent);
        $("#percent2").attr("value", snapShot.val()[1].percent);
        $("#percent3").attr("value", snapShot.val()[2].percent);
        $("#percent4").attr("value", snapShot.val()[3].percent);
        $("#percent5").attr("value", snapShot.val()[4].percent);
        $("#percent6").attr("value", snapShot.val()[5].percent);
        $("#percent7").attr("value", snapShot.val()[6].percent);
        $("#percent8").attr("value", snapShot.val()[7].percent);
      } else {
        console.log("no data found");
      }
    }
  }

  mainApp.Create = fnCreate;
  mainApp.Read = fnRead;
})();
