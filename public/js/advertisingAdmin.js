const btnDeleteAdvertisings = document.querySelectorAll(".deleteAdvertising");
const btnAccAdvertisings = document.querySelectorAll(".accAdvertising");

btnAccAdvertisings.forEach((item) => {
  item.addEventListener("click", (event) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("post", "/dashboard/accAdvertising");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.responseType = "json";

    xhttp.onloadstart = function () {
      item.innerHTML = '<span class="loader"></span>';
    };
    xhttp.onloadend = function () {
      item.innerHTML = '<span class="material-symbols-outlined">done</span>';

      if (xhttp.status == 200) {
        item.parentElement.parentElement.remove();
      }
    };

    xhttp.send(JSON.stringify({ id: item.dataset.id }));
  });
});

btnDeleteAdvertisings.forEach((item) => {
  item.addEventListener("click", (event) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/dashboard/deleteAdvertising");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.responseType = "json";

    xhttp.onloadstart = function () {
      item.innerHTML = '<span class="loader"></span>';
    };
    xhttp.onloadend = function () {
      item.innerHTML = '<span class="material-symbols-outlined">delete</span>';

      if (xhttp.status == 200) {
        item.parentElement.parentElement.remove();
      }
    };

    xhttp.send(JSON.stringify({ id: item.dataset.id }));
  });
});
