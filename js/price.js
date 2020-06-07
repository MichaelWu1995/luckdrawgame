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

    if (
      price1 != "" &&
      price2 != "" &&
      price3 != "" &&
      price4 != "" &&
      price5 != "" &&
      price6 != "" &&
      price7 != "" &&
      price8 != ""
    ) {
      fnCreate();
      window.location.href = "index.html";
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

    var data = {
      item1: price1,
      item2: price2,
      item3: price3,
      item4: price4,
      item5: price5,
      item6: price6,
      item7: price7,
      item8: price8,
    };

    app_firebase.databaseApi.create(path, data, messageHandler);
  }

  async function fnRead() {
    var path = "users/" + userid;
    app_firebase.databaseApi.read(path, successFn, messageHandler);

    function successFn(snapShot) {
      if (snapShot) {
        $("#price1").attr("value", snapShot.val().item1);
        $("#price2").attr("value", snapShot.val().item2);
        $("#price3").attr("value", snapShot.val().item3);
        $("#price4").attr("value", snapShot.val().item4);
        $("#price5").attr("value", snapShot.val().item5);
        $("#price6").attr("value", snapShot.val().item6);
        $("#price7").attr("value", snapShot.val().item7);
        $("#price8").attr("value", snapShot.val().item8);
      } else {
        console.log("no data found");
      }
    }
  }

  mainApp.Create = fnCreate;
  mainApp.Read = fnRead;
})();
