const btnAccEmail = document.getElementById("btnAccEmail");
const statusEmail = document.querySelector(".status-email");

try {
  btnAccEmail.addEventListener("click", (event) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/dashboard/accEmailUser");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.responseType = "json"

    xhttp.onloadend = function() {
      if(xhttp.status == 200) {
        console.log(xhttp.response)
        let timer = xhttp.response.timer
        let m = 0
        let s = 0

        setInterval(() => {
            timer -= 1000
            s = Math.floor(timer / 1000)
            m = Math.floor(s / 60)
            s = Math.floor(s - (m * 60))
            btnAccEmail.innerHTML = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        }, 1000);
      }else if(xhttp.status == 201) {
        statusEmail.innerHTML = "ایمیل تایید برای شما ارسال شد"
        // btnAccEmail.innerHTML = "تایید ایمیل"
      }
    }

    xhttp.send(JSON.stringify({}));
  });
} catch (err) {}