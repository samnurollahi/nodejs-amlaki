const name = document.getElementById("name");
const phone = document.getElementById("phone");
const text = document.getElementById("text");
const btnSubmit = document.getElementById("submit");
const row = document.querySelector(".row");

let isLoad = false;

btnSubmit.addEventListener("click", () => {
  if (!isLoad) {
    isLoad = true;

    const xhttp = new XMLHttpRequest();

    xhttp.open("post", "/dashboard/karshnas");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.responseType = "json";

    xhttp.onloadstart = function () {
      btnSubmit.innerHTML = "<span class='loader'></span>";
      btnSubmit.disabled = true;
    };

    xhttp.onloadend = function () {
      isLoad = false;
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = "درخواست";

      if (xhttp.status == 201) {
        row.innerHTML += `      <div
          class="alert box-alert alert-success z-2 d-flex py-3 px-4 user-select-none justify-content-between flex-row-reverse align-items-center position-fixed overflow-hidden"
          style="
            width: 350px;
            transition: 0.5s;
            top: 10px;
            right: 10px;
            cursor: pointer;
          "
        >
          <button class="btn-close" id="btn-close"></button>
          <div class="d-flex align-items-center">
            <span
              class="material-symbols-outlined text-success fs-3 fw-bold me-2"
            >
              done
            </span>
            درخواست با موفقیت ثبت شد
          </div>
          <div
            id="prog"
            class="position-absolute bg-success bottom-0 end-0"
            style="height: 3px"
          ></div>
        </div>`;

        try {
          const btnClose = document.getElementById("btn-close");
          const prog = document.getElementById("prog");
          const boxAlert = document.querySelector(".box-alert");
          btnClose.addEventListener("click", (event) => {
            event.target.parentElement.style.opacity = 0;
          });

          var withProg = 100;
          prog.style.width = "100%";
          let time = setInterval(() => {
            if (withProg <= 0) {
              prog.parentElement.remove();
            }
            withProg--;
            prog.style.width = `${withProg}%`;
          }, 80);

          boxAlert.addEventListener("mousemove", () => {
            withProg = 100;
            console.log("muse");
          });
        } catch (err) {
          err = err;
        }
      } else {
        let element = null;
        xhttp.response.forEach((item) => {
          element = document.querySelector(`*[name=${item.name}]`);
          element.classList.add("border");
          element.classList.add("border-danger");

          element.parentElement.lastElementChild.innerHTML = item.msg;
        });
      }
    };

    xhttp.send(
      JSON.stringify({
        name: name.value,
        phone: phone.value,
        map: [lat, lng],
        text: text.value,
      })
    );
  }
});
