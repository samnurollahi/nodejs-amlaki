function userController() {
  var data = {};

  //get ip user
  fetch("https://api.ipify.org", {
    method: "get",
  })
    .then((result) => {
      result.text().then((res) => {
        data.ip = res;

        //get data os user
        data.os = navigator.platform;

        //get page view user
        data.pageView = location.href;

        //get page previous  user
        data.pagePrevious = document.referrer;

        const xhttp = new XMLHttpRequest();

        xhttp.open("post", "/userController");
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.send(JSON.stringify(data));
      });
    })
}
userController()