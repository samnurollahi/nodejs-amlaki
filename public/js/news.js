const btnSendEmail = document.getElementById("btnSendEmail");

btnSendEmail.addEventListener("click", (event) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("post", "/dashboard/sendEmailNews");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.onloadstart = function () {
    btnSendEmail.innerHTML = "<span class='loader'></span>";
  };
  xhttp.onloadend = function () {
    btnSendEmail.disabled = true;
    btnSendEmail.innerHTML = "ایمیل ها ارسال شد";
    console.log(xhttp.status)
  };

  xhttp.send(
    JSON.stringify({
      title: document.querySelector("#title-send-email").value,
      html: document.querySelector(".ck-content").innerHTML,
    })
  );
});
