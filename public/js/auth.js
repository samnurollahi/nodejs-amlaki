const eye = Array.from(document.querySelectorAll(".eye")),
  authFrom = document.getElementById("authform"),
  login = document.getElementById("login"),
  register = document.getElementById("register");

eye.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.innerHTML == "visibility_off") {
      e.target.parentElement.firstElementChild.type = "text";
      e.target.innerHTML = "visibility";
    } else {
      e.target.parentElement.firstElementChild.type = "password";
      e.target.innerHTML = "visibility_off";
    }
  });
});

login.addEventListener("click", (e) => {
  authFrom.innerHTML = `<h1 class="h5 d-flex align-items-center justify-content-center">
  <a
    class="ms-1 text-decoration-none text-primary font-amin user-select-none fs-3"
    href="#"
    >پنجره</a
  >
</h1>
<form action="/auth/login" method="post">
  <label for="email" class="form-label text-muted mt-3"
    >ایمیل شما:
  </label>
  <input
    type="email"
    id="email"
    name="email"
    class="form-control"
    placeholder="XXX@gmail.com"
  />

  <label for="password" class="form-label text-muted mt-3"
    >رمز عبور:
  </label>
  <div class="position-relative">
    <input
      type="password"
      id="password"
      name="password"
      class="form-control"
      placeholder="مثلا: 123456"
    />
    <span
      class="material-symbols-outlined eye position-absolute top-50 translate-middle-y user-select-none"
      style="left: 10px; cursor: pointer"
    >
      visibility_off
    </span>
  </div>

  <div class="form-check mt-3">
    <input
      type="checkbox"
      name="rememberme"
      class="form-check-input"
      id="rememberme"
    />
    <label
      for="rememberme"
      class="form-check-label"
      >مرا به خاطر بسپار</label
    >
  </div>
  <a href="/forGetPassword">رمز عبور را فراموش  کرده ام</a>


  <div class="text-center">
    <button class="btn btn-primary mt-3 m-auto">ورود</button>
  </div>
</form>`;

  const eye = Array.from(document.querySelectorAll(".eye"));
  eye.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.innerHTML == "visibility_off") {
        e.target.parentElement.firstElementChild.type = "text";
        e.target.innerHTML = "visibility";
      } else {
        e.target.parentElement.firstElementChild.type = "password";
        e.target.innerHTML = "visibility_off";
      }
    });
  });
});

register.addEventListener("click", (e) => {
  authFrom.innerHTML = `<h1 class="h5 d-flex align-items-center justify-content-center">
    ثبت نام در
    <a
      class="ms-1 text-decoration-none text-primary font-amin user-select-none fs-3"
      href="#"
      >پنجره</a
    >
  </h1>
  <form action="/auth/register" method="post">
    <label for="name" class="form-label text-muted">اسم شما: </label>
    <input
      type="text"
      id="name"
      name="name"
      class="form-control"
      placeholder="مثلا: سام"
    />

    <label for="email" class="form-label text-muted mt-3"
      >ایمیل شما:
    </label>
    <input
      type="email"
      id="email"
      name="email"
      class="form-control"
      placeholder="XXX@gmail.com"
    />

    <label for="password" class="form-label text-muted mt-3"
      >رمز عبور:
    </label>
    <div class="position-relative">
      <input
        type="password"
        id="password"
        name="password"
        class="form-control"
        placeholder="مثلا: 123456"
      />
      <span
        class="material-symbols-outlined eye position-absolute top-50 translate-middle-y user-select-none"
        style="left: 10px; cursor: pointer"
      >
        visibility_off
      </span>
    </div>

    <label for="confirmPassword" class="form-label text-muted mt-3"
      >تکرار رمز عبور</label
    >
    <div class="position-relative">
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        class="form-control"
        placeholder="مثلا: 123456"
      />
      <span
        class="material-symbols-outlined eye position-absolute top-50 translate-middle-y user-select-none"
        style="left: 10px; cursor: pointer"
      >
        visibility_off
      </span>
    </div>

    <div class="text-center">
      <button class="btn btn-primary mt-3 m-auto">ثبت نام</button>
    </div>
  </form>`;

  const eye = Array.from(document.querySelectorAll(".eye"));
  eye.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.innerHTML == "visibility_off") {
        e.target.parentElement.firstElementChild.type = "text";
        e.target.innerHTML = "visibility";
      } else {
        e.target.parentElement.firstElementChild.type = "password";
        e.target.innerHTML = "visibility_off";
      }
    });
  });
});
