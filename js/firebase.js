var app_firebase = {};

(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyD6golx8dpnG2Og0DgbeLK0DVP-9WdjhaM",
    authDomain: "lucky-draw-d0e28.firebaseapp.com",
    databaseURL: "https://lucky-draw-d0e28.firebaseio.com",
    projectId: "lucky-draw-d0e28",
    storageBucket: "lucky-draw-d0e28.appspot.com",
    messagingSenderId: "625429235786",
    appId: "1:625429235786:web:eb3eb08d79fab42b0cbeb3",
  };

  firebase.initializeApp(firebaseConfig);

  app_firebase = firebase;

  function fnCreate(path, body, callback) {
    if (!path || !body) return;
    app_firebase.database().ref(path).set(body, callback);
  }

  function fnRead(path, successFunction, errorFunction) {
    if (!path || !successFunction || !errorFunction) return;
    app_firebase.database().ref(path).once("value").then(successFunction, errorFunction);
  }

  app_firebase.databaseApi = {
    create: fnCreate,
    read: fnRead,
  };
})();
