const itemSearch = Array.from(document.querySelectorAll(".item-search")),
  drsBtn = Array.from(document.querySelectorAll(".dr")),
  navbar = document.querySelector(".navbar"),
  boxSearchContect = document.getElementById("box-search-contect"),
  swiperContainer = document.getElementsByTagName("swiper-container")[0],
  userE = document.getElementById("user"),
  adE = document.getElementById("ad");
const e = document.getElementById("d");

const conditions = [
  "مشارکتی",
  "معاوضه",
  "قابل تبدیل",
  "رهن کامل",
  "پیش فروش",
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
let arrayPossibilities = [];
let arrayConditions = [];

window.addEventListener("load", (e) => {
  // if (window.outerWidth <= 450) {
  //   swiperContainer.setAttribute("slides-per-view", "1");
  // } else if (window.outerWidth <= 750) {
  //   swiperContainer.setAttribute("slides-per-view", "1");
  // } else if (window.outerWidth <= 1000) {
  //   swiperContainer.setAttribute("slides-per-view", "2");
  // } else if (window.outerWidth <= 1200) {
  //   swiperContainer.setAttribute("slides-per-view", "3");
  // }

  const xhttp = new XMLHttpRequest();
  xhttp.open("post", "getAllLengthUserAndAd");

  xhttp.responseType = "json";

  xhttp.onload = function () {
    var ad = xhttp.response.ad;
    var user = xhttp.response.user;
    const moamele = 120;

    setInterval(() => {
      if (+adE.innerHTML < ad) {
        adE.innerHTML = Number(adE.innerHTML) + 1;
      }
      if (+userE.innerHTML < user) {
        userE.innerHTML = Number(userE.innerHTML) + 1;
      }
    }, 50);
  };

  xhttp.send();

  addPossibilitiesAndConditions();
});

itemSearch.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    boxSearchContect.innerHTML = "";
    elem.classList.add("border-bottom");
    elem.classList.add("border-primary");
    elem.classList.add("text-primary");

    if (elem.id == "buy") {
      boxSearchContect.innerHTML = `            <form action="/sell" method="get" class="row">
      <div class="col-10 m-auto">
        <label class="text-muted form-label" style="font-size: 14px">
          شهر یا منطقه مورد نظر شما
        </label>
        <input
          type="text"
          class="input-search border rounded-1"
          style="font-size: 14px"
          placeholder="مثال: تهران"
        />
      </div>
      <div class="mt-2"></div>
         <div class="col-10 col-md-4 m-auto position-relative">
        <label class="text-muted form-label" style="font-size: 14px"
          >امکانات که میخواهید</label
        >
        <div
          onclick='drop(this)'
          class="dr d-flex align-items-center justify-content-between border p-2 rounded-2 bg-light-subtle user-select-none"
          style="cursor: pointer; font-size: 14px;"
        >
          امکانات
          <span class="material-symbols-outlined"> expand_more </span>
        </div>
        <div
          id="conditions"
          class="position-absolute start-50 translate-middle-x bg-light-subtle border rounded-2 p-2 mt-1 overflow-auto d-none"
          style="width: 86%; height: 200px"
        ></div>
      </div>
      <div class="col-10 col-md-4 m-auto position-relative">
        <label class="text-muted form-label" style="font-size: 14px"
          >شرایط که میخواهید</label
        >
        <div
          onclick="drop(this)"
          class="dr d-flex align-items-center justify-content-between border p-2 rounded-2 bg-light-subtle user-select-none"
          style="cursor: pointer; font-size: 14px"
        >
          شرایط
          <span class="material-symbols-outlined"> expand_more </span>
        </div>
        <div
          id="possibilities"
          class="position-absolute start-50 translate-middle-x bg-light-subtle border rounded-2 p-2 mt-1 overflow-auto d-none"
          style="width: 86%; height: 200px"
        ></div>
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto">
        <label class="text-muted form-label" style="font-size: 14px"
          >متراژ</label
        >
        <input
          min="40"
          type="number"
          style="font-size: 14px; direction: rtl;"
          class="input-search border rounded-1 min-metrage"
          placeholder="حداقل متراژ"
        />
      </div>
      <div class="col-10 col-md-4 m-auto">
        <br />
        <input
          min="40"
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search border rounded-1 max-metrage"
          placeholder="حداکثر متراژ"
        />
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto">
        <label class="text-muted form-label" style="font-size: 14px"
          >قیمت</label
        >
        <input
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search border rounded-1 min-price"
          placeholder="حداقل قیمت"
        />
      </div>
      <div class="col-10 col-md-4 m-auto">
        <br />
        <input
          type="number"
          style="direction: rtl; font-size: 14px;"
          class="input-search border rounded-1 max-price"
          placeholder="حداکثر قیمت"
        />
      </div>
      <div class="mt-3"></div>
      <div class="col-10 m-auto">
        <button
          type="button"
          class="btn btn-primary btn-sm d-flex align-items-center justify-content-around"
          onclick="search()"
        >
          جستو جو
          <span class="material-symbols-outlined"> search </span>
        </button>
      </div>
    </form>`;
    } else if (elem.id == "rent") {
      boxSearchContect.innerHTML = `<form action="" method="psot" class="row">
      <div class="col-10 m-auto">
        <label class="text-muted form-label" style="font-size: 14px">
          شهر یا منطقه مورد نظر شما
        </label>
        <input
          type="text"
          style="font-size: 14px"
          class="input-search border rounded-1"
          placeholder="مثال: تهران"
        />
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto position-relative">
        <label class="text-muted form-label" style="font-size: 14px"
          >امکانات که میخواهید</label
        >
        <div
          onclick='drop(this)'
          class="dr d-flex align-items-center justify-content-between border p-2 rounded-2 bg-light-subtle user-select-none"
          style="cursor: pointer; font-size: 14px;"
        >
          امکانات
          <span class="material-symbols-outlined"> expand_more </span>
        </div>
        <div
          id="conditions"
          class="position-absolute start-50 translate-middle-x bg-light-subtle border rounded-2 p-2 mt-1 overflow-auto d-none"
          style="width: 86%; height: 200px"
        ></div>
      </div>
      <div class="col-10 col-md-4 m-auto position-relative">
        <label class="text-muted form-label" style="font-size: 14px"
          >شرایط که میخواهید</label
        >
        <div
          onclick="drop(this)"
          class="dr d-flex align-items-center justify-content-between border p-2 rounded-2 bg-light-subtle user-select-none"
          style="cursor: pointer; font-size: 14px"
        >
          شرایط
          <span class="material-symbols-outlined"> expand_more </span>
        </div>
        <div
          id="possibilities"
          class="position-absolute start-50 translate-middle-x bg-light-subtle border rounded-2 p-2 mt-1 overflow-auto d-none"
          style="width: 86%; height: 200px"
        ></div>
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto">
        <label class="text-muted form-label" style="font-size: 14px"
          >متراژ</label
        >
        <input
          min="40"
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search min-metrage border rounded-1"
          placeholder="حداقل متراژ"
        />
      </div>
      <div class="col-10 col-md-4 m-auto">
        <br>
        <input
          min="40"
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search max-metrage border rounded-1"
          placeholder="حداکثر متراژ"
        />
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto">
        <label class="text-muted form-label" style="font-size: 14px"
          >اجاره</label
        >
        <input
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search min-rent border rounded-1"
          placeholder="حداقل اجاره"
        />
      </div>
      <div class="col-10 col-md-4 m-auto">
        <br>
        <input
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search max-rent border rounded-1"
          placeholder="حداکثر اجاره"
        />
      </div>
      <div class="mt-2"></div>
      <div class="col-10 col-md-4 m-auto">
        <label class="text-muted form-label" style="font-size: 14px"
          >رهن</label
        >
        <input
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search min-rahn border rounded-1"
          placeholder="حداقل رهن"
        />
      </div>
      <div class="col-10 col-md-4 m-auto">
        <br>
        <input
          type="number"
          style="direction: rtl; font-size: 14px"
          class="input-search max-rahn border rounded-1"
          placeholder="حداکثر رهن"
        />
      </div>
      <div class="mt-3"></div>
      <div class="col-10 m-auto">
      <button
      type="button"
      class="btn btn-primary btn-sm d-flex align-items-center justify-content-around"
      onclick="searchRent()"
    >
      جستو جو
      <span class="material-symbols-outlined"> search </span>
    </button>
      </div>
    </form>`;
    }

    itemSearch.forEach((e) => {
      if (e.id != elem.id) {
        e.classList.remove("border-bottom");
        e.classList.remove("border-primary");
        e.classList.remove("text-primary");
      }
    });

    addPossibilitiesAndConditions();
  });
});

function drop(elm) {
  elm.parentElement.lastElementChild.classList.toggle("d-none");
}

function addPossibilitiesAndConditions() {
  const possibilitiesBox = document.getElementById("conditions");
  const conditionsBox = document.getElementById("possibilities");
  conditions.forEach((item) => {
    conditionsBox.innerHTML += ` <div class="form-check">
  <input
    type="checkbox"
    onclick="conditionsSelect(this)"
    class="form-check-input"
    name="${item}"
    value="${item}"
    id="${item}"
  />
  <label for="${item}" class="form-check-label">${item}</label>
</div>`;
  });
  possibilities.forEach((item) => {
    possibilitiesBox.innerHTML += ` <div class="form-check">
  <input
    type="checkbox"
    onclick="possibilitiesSelect(this)"
    class="form-check-input"
    name="${item}"
    value="${item}"
    id="${item}"
  />
  <label for="${item}" class="form-check-label">${item}</label>
</div>`;
  });
}

function search() {
  let url = `?`;
  const body = {
    loaction: document.querySelector(".input-search").value,
    arrayConditions,
    arrayPossibilities,
    minMetrage: document.querySelector(".min-metrage"),
    maxMetrage: document.querySelector(".max-metrage"),
    minPrice: document.querySelector(".min-price"),
    maxPrice: document.querySelector(".max-price"),
  };

  if (document.querySelector(".input-search").value.length > 0) {
    url += `loaction=${document.querySelector(".input-search").value}&`;
  }
  if (arrayConditions.length > 0) {
    url += `conditions=${arrayConditions}&`;
  }
  if (arrayPossibilities.length > 0) {
    url += `possibilities=${arrayPossibilities}&`;
  }
  if (document.querySelector(".min-metrage").value > 0) {
    url += `minMetrage=${document.querySelector(".min-metrage").value}&`;
  }
  if (
    document.querySelector(".max-metrage").value >
    document.querySelector(".min-metrage").value
  ) {
    url += `maxMetrage=${document.querySelector(".max-metrage").value}&`;
  }
  if (document.querySelector(".min-price").value > 0) {
    url += `minPrice=${document.querySelector(".min-price").value}&`;
  }
  if (
    document.querySelector(".max-price").value >
    document.querySelector(".min-price").value
  ) {
    url += `maxPrice=${document.querySelector(".max-price").value}&`;
  }

  location.href = `/sell${url}`;
}
function searchRent() {
  let url = `?`;
  const body = {
    loaction: document.querySelector(".input-search").value,
    arrayConditions,
    arrayPossibilities,
    minMetrage: document.querySelector(".min-metrage"),
    maxMetrage: document.querySelector(".max-metrage"),
    minRent: document.querySelector(".min-rent"),
    maxRent: document.querySelector(".max-rent"),
    minRahn: document.querySelector(".min-rahn"),
    maxRahn: document.querySelector(".max-rahn"),
  };

  if (document.querySelector(".input-search").value.length > 0) {
    url += `loaction=${document.querySelector(".input-search").value}&`;
  }
  if (arrayConditions.length > 0) {
    url += `conditions=${arrayConditions}&`;
  }
  if (arrayPossibilities.length > 0) {
    url += `possibilities=${arrayPossibilities}&`;
  }
  if (document.querySelector(".min-metrage").value > 0) {
    url += `minMetrage=${document.querySelector(".min-metrage").value}&`;
  }
  if (
    document.querySelector(".max-metrage").value >
    document.querySelector(".min-metrage").value
  ) {
    url += `maxMetrage=${document.querySelector(".max-metrage").value}&`;
  }
  if (document.querySelector(".min-rent").value > 0) {
    url += `minRent=${document.querySelector(".min-rent").value}&`;
  }
  if (
    document.querySelector(".max-rent").value >
    document.querySelector(".min-rent").value
  ) {
    url += `maxRent=${document.querySelector(".max-rent").value}&`;
  }
  if (document.querySelector(".min-rahn").value > 0) {
    url += `minRahn=${document.querySelector(".min-rahn").value}&`;
  }
  if (
    document.querySelector(".max-rahn").value >
    document.querySelector(".min-rahn").value
  ) {
    url += `maxRahn=${document.querySelector(".max-rahn").value}&`;
  }

  location.href = `/rent${url}`;
}

function possibilitiesSelect(elem) {
  if (arrayPossibilities.includes(elem.value)) {
    arrayPossibilities.splice(arrayPossibilities.indexOf(elem.value), 1);
  } else {
    arrayPossibilities.push(elem.value);
  }
}
function conditionsSelect(elem) {
  if (arrayConditions.includes(elem.value)) {
    arrayConditions.splice(arrayConditions.indexOf(elem.value), 1);
  } else {
    arrayConditions.push(elem.value);
  }
}
