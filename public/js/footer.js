const btnDis = document.getElementById("btn-dis");
const dis = document.querySelector(".dis");
const inputEmial = document.getElementById("boxEmail");
const btnNews = document.getElementById("btnNews");

let match = null;
inputEmial.addEventListener("keyup", (event) => {
  match =
    inputEmial.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) || false;
  if(!match) {
    inputEmial.classList.add("border")
    inputEmial.classList.add("border-danger")
    btnNews.disabled = true
  }else {
    inputEmial.classList.add("border")
    inputEmial.classList.remove("border-danger")
    inputEmial.classList.add("border-success")
    btnNews.disabled = false
  }
});


btnNews.addEventListener("click", () => {
  if(match) {
    const xhttp = new XMLHttpRequest()

    xhttp.open("post", "/addEmailNews")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    xhttp.onloadstart = function() {
      btnNews.innerHTML = "<span class='loader'></span>"
    }
    xhttp.onloadend = function() {
      btnNews.disabled = true
      btnNews.innerHTML = "<span class='material-symbols-outlined'>done_outline</span>"
      inputEmial.disabled = true
      inputEmial.classList.add("border-success")
      inputEmial.classList.add("text-center")
      inputEmial.classList.add("disabled")
      inputEmial.value = "با موفقیت ایمیل شما ثبت شد :)"
    }


    xhttp.send(JSON.stringify({
      email: inputEmial.value
    }))
  }else {
    console.log("err vid")
  }
})

btnDis.addEventListener("click", (event) => {
  if (dis.style.height == "25px") {
    dis.style.height = "auto";
    btnDis.innerHTML = `
        نمایش کمتر<span class="material-symbols-outlined">
        expand_less
      </span>`;
  } else {
    dis.style.height = "25px";
    btnDis.innerHTML = `
    نمایش بیشتر<span class="material-symbols-outlined">
    expand_more
  </span>`;
  }
});
