const boxLoader = document.getElementById("box-loader");

let isLoad = false;
let page = 1;

window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (!isLoad) {
      isLoad = true;

      const xhttp = new XMLHttpRequest();

      xhttp.open("post", "/dashboard/getRequets");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.responseType = "json";

      xhttp.onloadstart = function () {
        boxLoader.innerHTML =
          '<span class="loader d-block m-auto"style="width: 50px; height: 50px"></span>';
      };
      xhttp.onloadend = function () {
        let htmlData = "";
        boxLoader.innerHTML = "";

        xhttp.response.data.forEach((item) => {
          htmlData += `
            <tr>
              <th>${item.ip}</th>
              <th>${item.os}</th>
              <th>${item.pageView}</th>
              <th>${item.pagePrevious}</th>
              <th>${item.isLogin ? "دارد" : "ندارد"}</th>
              <th>${item.role}</th>
            </tr>
          `;
        });
        document.getElementsByTagName("tbody")[0].innerHTML += htmlData;

        page++
        isLoad = false;
      };

      xhttp.send(JSON.stringify({ page }));
    }
  }
};
