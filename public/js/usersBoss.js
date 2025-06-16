const btnRemoveUsers = Array.from(document.querySelectorAll(".btnRemoveUser"));

btnRemoveUsers.forEach((item) => {
  item.addEventListener("click", (event) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/dashboard/removeUser");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onloadstart = function () {
      item.innerHTML = "<span class='loader'></span>";
    };
    xhttp.onloadend = function () {
        event.target.parentElement.parentElement.remove()
    };

    xhttp.send(JSON.stringify({ id: item.dataset.id }));
  });
});

