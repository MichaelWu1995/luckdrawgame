$(function () {
  $(".register").click(function () {
    $(".other").show();
    $(".content").hide();
    $(".register").addClass("active");
    $(".login").removeClass("active");
  });
});

$(function () {
  $(".login").click(function () {
    $(".content").show();
    $(".other").hide();
    $(".login").addClass("active");
    $(".register").removeClass("active");
  });
});

(function () {
  var firebase = app_firebase;
  var auth = firebase.auth();

  auth.onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = "price.html";
    }
  });

  $("#sub-btn1").click(function () {
    var userEmail = $("#in_email").val();
    var userPassword = $("#in_password").val();
    console.log(userEmail + userPassword);
    if (userEmail != "" && userPassword != "") {
      const promise = auth.signInWithEmailAndPassword(userEmail, userPassword);
      promise.catch((error) => alert("Error Message: " + error.message));
    } else {
      alert("Please Fill Out All Fields");
    }
  });

  $("#sub-btn2").click(function () {
    var userEmail = $("#up_email").val();
    var userEnterPassword = $("#up_password1").val();
    var userConfirmPassword = $("#up_password2").val();
    if (
      userEmail != "" &&
      userEnterPassword != "" &&
      userConfirmPassword != ""
    ) {
      if (userEnterPassword == userConfirmPassword) {
        const promise = auth.createUserWithEmailAndPassword(
          userEmail,
          userConfirmPassword
        );
        promise.catch((error) => alert(error.message));
      } else {
        alert("Two Passwords don't Match.");
      }
    } else {
      alert("Please Fill Out All Fields");
    }
  });
})();
