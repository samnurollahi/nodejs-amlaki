const btnSell = document.getElementById("sell"),
  btnRent = document.getElementById("rent"),
  boxAdDiv = document.getElementById("adDiv");

const conditions = [
  "رهن کامل",
  "موقعیت اداری",
  "قیمت توافقی",
  "نوساز",
  "پنت هاوس",
];
const possibilities = [
  "پارکینگ",
  "انباری",
  "لابی",
  "سالن ورزش",
  "نگهبان",
  "اسانسور",
  "بالکن",
  "استخر",
  "سونا",
  "درب ریموت",
  "جکوزی",
];
window.addEventListener("load", (event) => {});

btnSell.addEventListener("click", (event) => {
  boxAdDiv.innerHTML = `
  <div class="row justify-content-center">
  <button class="col-4 btn btn-outline-primary m-2 btn-grouping" data-pro='number0'>اپارتمان مسکونی</button>
  <button class="col-4 btn btn-outline-primary m-2 btn-grouping" data-pro='number1'>خانه ویلایی</button>
    </div>`;

  const groupings = Array.from(document.querySelectorAll(".btn-grouping"));

  groupings.forEach((item) => {
    item.addEventListener("click", (e) => {
      // if (e.target.dataset.pro == "number0") {
      let condition = ``;
      let possibilitie = ``;
      conditions.forEach((item) => {
        condition += `
          <div class="form-check d-inline-block">
            <label for="${item}" class="form-check-label">${item}</label>
            <input type="checkbox" name="${item}" id="${item}" class="form-check-input condition">
          </div>`;
      });
      possibilities.forEach((item) => {
        possibilitie += `
          <div class="form-check d-inline-block">
            <label for="${item}" class="form-check-label">${item}</label>
            <input name="${item}" id="${item}" type="checkbox" class="form-check-input possibilitie">
          </div>`;
      });

      boxAdDiv.innerHTML = `<form action="" class="row justify-content-center">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
        <div class="col-10">
          <p class="h5 mt-3">اطلاعات اگهی دهنده</p>
        </div>
        <div class="col-5 mt-2">
          <label for="name" class="form-label">نام و نام خانوادگی</label>
          <input
            type="text"
            id="name"
            name="nameuser"
            placeholder="مثلا: بهنام بازوند"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="phone" class="form-label">شماره مبایل</label>
          <input
            type="number"
            id="phone"
            name="phoneuser"
            placeholder=""
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <br /><br />
        <div class="col-10">
          <p class="h5 mt-3">مشخصات ملک</p>
        </div>
        <div class="col-10 mt-2">
          <label for="titleAd" class="form-label">عنوان اگهی</label>
          <input type="text" id="titleAd" name='titlead' class="form-control" />
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="inputprovinces" class="form-label">استان ملک</label>
          <input
            type="text"
            id="inputprovinces"
            name="provinces"
            list="provinces"
            class="form-control"
          />
          <datalist id="provinces"> </datalist>
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="inputcities" class="form-label">شهر ملک</label>
          <input
            type="text"
            list="cities"
            id="inputcities"
            name="cities"
            class="form-control"
          />
          <datalist id="cities"> </datalist>
          <p class="text-danger"></p>
        </div>
        <div class="col-3 mt-2">
          <label for="life" class="form-label">عمر بنا</label>
          <input
            type="number"
            min="1"
            name="life"
            id="life"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-3 mt-2">
          <label for="room" class="form-label">تعداد اتاق</label>
          <input
            type="number"
            min="0"
            name="room"
            id="room"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-4 mt-2">
          <label for="meterage" class="form-label">متراژ</label>
          <input
            type="number"
            min="0"
            name="meterage"
            id="meterage"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-4 mt-2">
          <label for="price" class="form-label">قیمت</label>
          <input
            type="number"
            min="0"
            name="price"
            id="price"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="w-100"></div>
        <div class="col-10 mt-3">
          <label for="" class="form-label">انتخاب موقعیت مکانی ملک</label>
          <div
            id="map"
            class="z-0"
            style="margin: auto; overflow: hidden; height: 350px"
          ></div>
        </div>
        <div class="col-5 mt-3" >
        <label class="form-label">شرایط ملک شما</label>
        <div>
          ${condition}
        </div>
        </div>
        <div class="col-5 mt-3" >
        <label class="form-label">امکانات ملک شما</label>
        <div>
          ${possibilitie}
        </div>
        </div>
        <div class="col-10 mt-3">
          <label for="description" class="form-label">توضیحات تکمیلی</label>
          <textarea
            id="description"
            name="description"
            class="form-control overflow-auto"
            style="height: 150px; resize: none"
          ></textarea>
          <p class="text-danger"></p>
        </div>
        <div class="col-10 mt-3">
          <p for="" class="form-label">بارگزاری تصویر</label>
          <div id="imgLoade" class="d-flex align-items-center">
            <label
              class="material-symbols-outlined p-3 border border-primary user-select-none fs-1 text-primary rounded-2"
              style="cursor: pointer"
              for="image"
            >
              add_photo_alternate
            </label>
            <input type="file" name="image" id="image" class="d-none">
          </div>
          <p class="text-muted fs-6 mb-0 mt-1 d-noneb text-danger" id="statusUpload"></p>
        </div>
        <div class="col-10 mt-3 text-end">
          <button class="btn btn-outline-success">ثبت نهایی</button>
        </div>
      </form>`;

      let listIDImage = [];
      let lng = 0;
      let lat = 0;
      let conditionList = [];
      let possibilitieList = [];

      var map = L.map("map").setView(
        [34.256081384716566, 52.94873909124857],
        5
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      var marker;

      map.on("click", function (e) {
        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker(e.latlng).addTo(map);
        lng = e.latlng.lng;
        lat = e.latlng.lat;
      });

      const inputFile = document.querySelector("input[type='file']");
      const imgLoade = document.getElementById("imgLoade");
      const statusUpload = document.getElementById("statusUpload");
      const form = document.getElementsByTagName("form")[0];
      const inputPossibilitie = Array.from(
        document.querySelectorAll(".possibilitie")
      );
      const inputCondition = Array.from(
        document.querySelectorAll(".condition")
      );

      inputFile.addEventListener("change", (event) => {
        if (inputFile.value.length >= 1) {
          const xhttp = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("img", inputFile.files[0]);
          xhttp.onloadstart = function () {
            statusUpload.classList.add("d-none");
            statusUpload.innerHTML = "";

            imgLoade.insertAdjacentHTML(
              "afterbegin",
              `<div class="m-2 overflow-hidden" style="width: 74px; height: 74px">
              <label
                class="material-symbols-outlined p-3 border border-primary user-select-none fs-1 text-primary rounded-2"
                style="cursor: pointer"
                for="image"
              >
                refresh
              </label>
            </div>`
            );

            inputFile.setAttribute("disabled", true);
          };
          xhttp.onloadend = function () {
            imgLoade.firstElementChild.innerHTML = `<img src='${xhttp.responseText}' class='w-100'>`;
            if (xhttp.status == 400) {
              imgLoade.firstElementChild.remove();
              statusUpload.classList.remove("d-none");
              statusUpload.innerHTML = xhttp.responseText;
            } else {
              listIDImage.push(xhttp.responseText);
            }
            inputFile.removeAttribute("disabled");
          };

          xhttp.open("post", "/dashboard/upload");
          xhttp.send(formData);
        }
      });

      inputPossibilitie.forEach((item) => {
        item.addEventListener("change", (event) => {
          if (item.checked) {
            possibilitieList.push(item.name);
          } else {
            possibilitieList.splice(item.name, 1);
          }
        });
      });
      inputCondition.forEach((item) => {
        item.addEventListener("change", (event) => {
          if (item.checked) {
            conditionList.push(item.name);
          } else {
            conditionList.splice(item.name, 1);
          }
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const xhttp = new XMLHttpRequest();
        const formData = new FormData();
        if (e.target.dataset.pro == "number0") {
          xhttp.open("POST", "/dashboard/sell-apartman");
        } else {
          xhttp.open("POST", "/dashboard/sell-villa");
        }
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.responseType = "json";

        xhttp.onloadstart = function () {
          // event.target.innerHTML = "<span class='loader'></span>";
        };
        xhttp.onloadend = function () {
          if (xhttp.status == 401) {
            [
              "nameuser",
              "phoneuser",
              "titlead",
              "provinces",
              "cities",
              "life",
              "room",
              "meterage",
              "price",
            ].forEach((item) => {
              let input = document.querySelector(`input[name=${item}]`);
              input.parentElement.lastElementChild.innerHTML = "";
            });
            JSON.parse(xhttp.response).fildName.forEach((item) => {
              let input = document.querySelector(`input[name=${item}]`);
              input.value = JSON.parse(xhttp.response).error[item][1];
              input.parentElement.lastElementChild.innerHTML = JSON.parse(
                xhttp.response
              ).error[item][0];
            });
          } else {
            boxAdDiv.innerHTML = `
              <div class="row justify-content-center">
                <div class="col-10 d-flex align-items-center justify-content-center border border-success bg-success-subtle rounded-2 mt-5 p-4">
                <p class="m-0">اگهی شما با موفقیت برای برسی توسط ادمین ارسال شد</p>
                </div>
              </div>
              `;
          }
        };
        xhttp.send(
          JSON.stringify({
            nameuser: document.querySelector("input[name='nameuser']").value,
            phoneuser: document.querySelector("input[name='phoneuser']").value,
            titlead: document.querySelector("input[name='titlead']").value,
            provinces: document.querySelector("input[name='provinces']").value,
            cities: document.querySelector("input[name='cities']").value,
            life: document.querySelector("input[name='life']").value,
            room: document.querySelector("input[name='room']").value,
            price: document.querySelector("input[name='price']").value,
            meterage: document.querySelector("input[name='meterage']").value,
            description: document.querySelector("textarea[name='description']")
              .value,
            imgs: listIDImage,
            map: [lat, lng],
            possibilities: possibilitieList,
            conditions: conditionList,
          })
        );
      });
    });
  });
});
btnRent.addEventListener("click", () => {
  boxAdDiv.innerHTML = `
  <div class="row justify-content-center">
  <button class="col-4 btn btn-outline-primary m-2 btn-grouping" data-pro='number0'>اپارتمان مسکونی</button>
  <button class="col-4 btn btn-outline-primary m-2 btn-grouping" data-pro='number1'>خانه ویلایی</button>
    </div>`;

  const groupings = Array.from(document.querySelectorAll(".btn-grouping"));

  groupings.forEach((item) => {
    item.addEventListener("click", (e) => {
      let condition = ``;
      let possibilitie = ``;
      conditions.forEach((item) => {
        condition += `
          <div class="form-check d-inline-block">
            <label for="${item}" class="form-check-label">${item}</label>
            <input type="checkbox" name="${item}" id="${item}" class="form-check-input condition">
          </div>`;
      });
      possibilities.forEach((item) => {
        possibilitie += `
          <div class="form-check d-inline-block">
            <label for="${item}" class="form-check-label">${item}</label>
            <input name="${item}" id="${item}" type="checkbox" class="form-check-input possibilitie">
          </div>`;
      });

      boxAdDiv.innerHTML = `<form action="" class="row justify-content-center">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
        <div class="col-10">
          <p class="h5 mt-3">اطلاعات اگهی دهنده</p>
        </div>
        <div class="col-5 mt-2">
          <label for="name" class="form-label">نام و نام خانوادگی</label>
          <input
            type="text"
            id="name"
            name="nameuser"
            placeholder="مثلا: بهنام بازوند"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="phone" class="form-label">شماره مبایل</label>
          <input
            type="number"
            id="phone"
            name="phoneuser"
            placeholder=""
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <br /><br />
        <div class="col-10">
          <p class="h5 mt-3">مشخصات ملک</p>
        </div>
        <div class="col-10 mt-2">
          <label for="titleAd" class="form-label">عنوان اگهی</label>
          <input type="text" id="titleAd" name='titlead' class="form-control" />
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="inputprovinces" class="form-label">استان ملک</label>
          <input
            type="text"
            id="inputprovinces"
            name="provinces"
            list="provinces"
            class="form-control"
          />
          <datalist id="provinces"> </datalist>
          <p class="text-danger"></p>
        </div>
        <div class="col-5 mt-2">
          <label for="inputcities" class="form-label">شهر ملک</label>
          <input
            type="text"
            list="cities"
            id="inputcities"
            name="cities"
            class="form-control"
          />
          <datalist id="cities"> </datalist>
          <p class="text-danger"></p>
        </div>
        <div class="col-3 mt-2">
          <label for="life" class="form-label">عمر بنا</label>
          <input
            type="number"
            min="1"
            name="life"
            id="life"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-3 mt-2">
          <label for="room" class="form-label">تعداد اتاق</label>
          <input
            type="number"
            min="0"
            name="room"
            id="room"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-4 mt-2">
          <label for="meterage" class="form-label">متراژ</label>
          <input
            type="number"
            min="0"
            name="meterage"
            id="meterage"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-4 mt-2">
          <label for="mortgage" class="form-label">رهن</label>
          <input
            type="number"
            min="0"
            name="mortgage"
            id="mortgage"
            class="form-control"
          />
          <p class="text-danger"></p>
        </div>
        <div class="col-4 mt-2">
        <label for="rent" class="form-label">اجاره</label>
        <input
          type="number"
          min="0"
          name="rent"
          id="rent"
          class="form-control"
        />
        <p class="text-danger"></p>
      </div>
        <div class="w-100"></div>
        <div class="col-10 mt-3">
          <label for="" class="form-label">انتخاب موقعیت مکانی ملک</label>
          <div
            id="map"
            class="z-0"
            style="margin: auto; overflow: hidden; height: 350px"
          ></div>
        </div>
        <div class="col-5 mt-3" >
        <label class="form-label">شرایط ملک شما</label>
        <div>
          ${condition}
        </div>
        </div>
        <div class="col-5 mt-3" >
        <label class="form-label">امکانات ملک شما</label>
        <div>
          ${possibilitie}
        </div>
        </div>
        <div class="col-10 mt-3">
          <label for="description" class="form-label">توضیحات تکمیلی</label>
          <textarea
            id="description"
            name="description"
            class="form-control overflow-auto"
            style="height: 150px; resize: none"
          ></textarea>
          <p class="text-danger"></p>
        </div>
        <div class="col-10 mt-3">
          <p for="" class="form-label">بارگزاری تصویر</label>
          <div id="imgLoade" class="d-flex align-items-center">
            <label
              class="material-symbols-outlined p-3 border border-primary user-select-none fs-1 text-primary rounded-2"
              style="cursor: pointer"
              for="image"
            >
              add_photo_alternate
            </label>
            <input type="file" name="image" id="image" class="d-none">
          </div>
          <p class="text-muted fs-6 mb-0 mt-1 d-noneb text-danger" id="statusUpload"></p>
        </div>
        <div class="col-10 mt-3 text-end">
          <button class="btn btn-outline-success">ثبت نهایی</button>
        </div>
      </form>`;

      let listIDImage = [];
      let lng = 0;
      let lat = 0;
      let conditionList = [];
      let possibilitieList = [];

      var map = L.map("map").setView(
        [34.256081384716566, 52.94873909124857],
        5
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      var marker;

      map.on("click", function (e) {
        if (marker) {
          map.removeLayer(marker);
        }

        marker = L.marker(e.latlng).addTo(map);
        lng = e.latlng.lng;
        lat = e.latlng.lat;
      });

      const inputFile = document.querySelector("input[type='file']");
      const imgLoade = document.getElementById("imgLoade");
      const statusUpload = document.getElementById("statusUpload");
      const form = document.getElementsByTagName("form")[0];
      const inputPossibilitie = Array.from(
        document.querySelectorAll(".possibilitie")
      );
      const inputCondition = Array.from(
        document.querySelectorAll(".condition")
      );

      inputFile.addEventListener("change", (event) => {
        if (inputFile.value.length >= 1) {
          const xhttp = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("img", inputFile.files[0]);
          xhttp.onloadstart = function () {
            statusUpload.classList.add("d-none");
            statusUpload.innerHTML = "";

            imgLoade.insertAdjacentHTML(
              "afterbegin",
              `<div class="m-2 overflow-hidden" style="width: 74px; height: 74px">
              <label
                class="material-symbols-outlined p-3 border border-primary user-select-none fs-1 text-primary rounded-2"
                style="cursor: pointer"
                for="image"
              >
                refresh
              </label>
            </div>`
            );

            inputFile.setAttribute("disabled", true);
          };
          xhttp.onloadend = function () {
            imgLoade.firstElementChild.innerHTML = `<img src='${xhttp.responseText}' class='w-100'>`;
            if (xhttp.status == 400) {
              imgLoade.firstElementChild.remove();
              statusUpload.classList.remove("d-none");
              statusUpload.innerHTML = xhttp.responseText;
            } else {
              listIDImage.push(xhttp.responseText);
            }
            inputFile.removeAttribute("disabled");
          };

          xhttp.open("post", "/dashboard/upload");
          xhttp.send(formData);
        }
      });

      inputPossibilitie.forEach((item) => {
        item.addEventListener("change", (event) => {
          if (item.checked) {
            possibilitieList.push(item.name);
          } else {
            possibilitieList.splice(item.name, 1);
          }
        });
      });
      inputCondition.forEach((item) => {
        item.addEventListener("change", (event) => {
          if (item.checked) {
            conditionList.push(item.name);
          } else {
            conditionList.splice(item.name, 1);
          }
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const xhttp = new XMLHttpRequest();
        const formData = new FormData();
        if (e.target.dataset.pro == "number0") {
          xhttp.open("POST", "/dashboard/rent-apartman");
        } else {
          xhttp.open("POST", "/dashboard/rent-villa");
        }
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.responseType = "json";
        xhttp.onloadstart = function () {
          // event.target.innerHTML += "<span class='loader'></span>";
        };
        xhttp.onloadend = function () {
          if (xhttp.status == 401) {
            [
              "nameuser",
              "phoneuser",
              "titlead",
              "provinces",
              "cities",
              "life",
              "room",
              "meterage",
              "mortgage",
              "rent",
            ].forEach((item) => {
              let input = document.querySelector(`input[name=${item}]`);
              input.parentElement.lastElementChild.innerHTML = "";
            });
            JSON.parse(xhttp.response).fildName.forEach((item) => {
              let input = document.querySelector(`input[name=${item}]`);
              input.value = JSON.parse(xhttp.response).error[item][1];
              input.parentElement.lastElementChild.innerHTML = JSON.parse(
                xhttp.response
              ).error[item][0];
            });
          } else {
            boxAdDiv.innerHTML = `
              <div class="row justify-content-center">
                <div class="col-10 d-flex align-items-center justify-content-center border border-success bg-success-subtle rounded-2 mt-5 p-4">
                <p class="m-0">اگهی شما با موفقیت برای برسی توسط ادمین ارسال شد</p>
                </div>
              </div>
              `;
          }
        };
        xhttp.send(
          JSON.stringify({
            nameuser: document.querySelector("input[name='nameuser']").value,
            phoneuser: document.querySelector("input[name='phoneuser']").value,
            titlead: document.querySelector("input[name='titlead']").value,
            provinces: document.querySelector("input[name='provinces']").value,
            cities: document.querySelector("input[name='cities']").value,
            life: document.querySelector("input[name='life']").value,
            room: document.querySelector("input[name='room']").value,
            mortgage: document.querySelector("input[name='mortgage']").value,
            rent: document.querySelector("input[name='rent']").value,
            meterage: document.querySelector("input[name='meterage']").value,
            description: document.querySelector("textarea[name='description']")
              .value,
            imgs: listIDImage,
            map: [lat, lng],
            possibilities: possibilitieList,
            conditions: conditionList,
          })
        );
      });
    });
  });
});
