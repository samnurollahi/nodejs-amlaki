const notification = document.getElementById("notifications");
const boxNotifications = document.getElementById("box-notifications");

getNotification();

notification.addEventListener("click", (event) => {
  if (Array.from(boxNotifications.classList).includes("d-none")) {
    boxNotifications.classList.remove("d-none");
  } else {
    boxNotifications.classList.add("d-none");
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/dashboard/isViewNotification");
  xhttp.send();
});

window.addEventListener(
  "click",
  (event) => {
    if (!Array.from(boxNotifications.classList).includes("d-none")) {
      boxNotifications.classList.add("d-none");
    }
  },
  { capture: true }
);

function getNotification() {
  try {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/dashboard/getnotification");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.responseType = "json";

    xhttp.onloadstart = function () {
      boxNotifications.innerHTML +=
        '<center><span class="loader"></span></center>';
    };

    xhttp.onloadend = function () {
      boxNotifications.lastElementChild.remove();
      JSON.parse(xhttp.response)
        .reverse()
        .forEach((item) => {
          let element = `<div class="mx-2 mt-3 mb-3">
        <div class="border-bottom ${
          item.type == "warning" ? "border-danger" : "border-success"
        } rounded-2 mt-2">
          <p
            style="font-size: 15px"
            class="mb-1 d-flex align-items-center"
          >
            <span
              class="material-symbols-outlined user-select-none me-1 ${
                item.type == "warning" ? "text-danger" : "text-success"
              }"
            >
            ${item.type == "warning" ? "warning" : "done"}
            </span>
            ${item.msg}
          </p>
        </div>
      </div>`;

          boxNotifications.innerHTML += element;
        });
    };

    xhttp.send();
  } catch (err) {
  }
}
