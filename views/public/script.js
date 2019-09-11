console.log("test");

let submit = document.querySelector("#signupform");

// console.log(submit);
submit.addEventListener("submit", e => {
  if (username.value === "" || email.value === "" || password === "") {
    alert("You need to fill out the form ya donk!");
    event.preventDefault();
  } else {
    console.log("Thanks!");
  }
});
