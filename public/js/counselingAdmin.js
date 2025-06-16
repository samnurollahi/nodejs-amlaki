const tbody = Array.from(document.getElementsByTagName("tbody"))[0];
const loaderTable = document.getElementById("loader-table");

let page = 1;
let isloading = false;

eventer();

window.addEventListener("scroll", (event) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isloading
  ) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("post", "/dashboard/getCounseling");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onloadstart = function () {
      isloading = true;
      loaderTable.classList.remove("d-none");
    };

    xhttp.onloadend = function () {
      isloading = false;
      page++;
      loaderTable.classList.add("d-none");
      JSON.parse(xhttp.response).forEach((item) => {
        tbody.insertAdjacentHTML(
          "afterend",
          `
          <tr>
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${moment(item.createAt).locale("fa").format("D MMMM YYYY")}</td>
          <td title="${item.description}">
            ${item.description.slice(0, 7)}...
          </td>
          <td>
            <a
              data-id="${item._id}"
              class="btn btn-success m-1 d-inline-flex align-items-center justify-content-center accCounseling"
            >
              <span class="material-symbols-outlined"> done </span>
            </a>
            <a
            data-id="${item._id}"
            class="btn btn-danger m-1 d-inline-flex align-items-center justify-content-center deleteCounseling"
              ><span class="material-symbols-outlined">delete</span></a
            >
          </td>
        </tr>
          `
        );
      });
      eventer();
    };

    xhttp.send(JSON.stringify({ page }));
  }
});

function eventer() {
  const btnDeleteCounselings = Array.from(
    document.querySelectorAll(".deleteCounseling")
  );
  const btnAccCounselings = Array.from(
    document.querySelectorAll(".accCounseling")
  );

  btnDeleteCounselings.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/dashboard/deleteCounseling");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhttp.onloadstart = function () {
        item.innerHTML = `<span class="loader"></span>`;
      };
      xhttp.onloadend = function () {
        if (xhttp.status == 200) {
          item.parentElement.parentElement.remove();
        }
      };

      xhttp.send(
        JSON.stringify({
          id: item.dataset.id,
        })
      );
    });
  });

  btnAccCounselings.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/dashboard/accCounseling");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhttp.onloadstart = function () {
        item.innerHTML = `<span class="loader"></span>`;
      };
      xhttp.onloadend = function () {
        item.parentElement.parentElement.remove();
      };

      xhttp.send(
        JSON.stringify({
          id: item.dataset.id,
        })
      );
    });
  });
}
