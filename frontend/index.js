//Login
const loginUser = document.querySelector("#loginUser");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

//Register
const registerUsername = document.querySelector("#registerUsername");
const registerUserEmail = document.querySelector("#registerUserEmail");
const registerUserPassword = document.querySelector("#registerPassword");
const registerBtn = document.querySelector("#registerBtn");

let register = async () => {
  console.log("Registering user!");

  //POST-request to /api/auth/local/register
  //   let response = await fetch("http://localhost:1337/api/auth/local/register", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: registerUsername.value,
  //       email: registerUserEmail.value,
  //       password: registerUserPassword.value,
  //     }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });

  let response = await axios.post(
    "http://localhost:1337/api/auth/local/register",
    {
      username: registerUsername.value,
      email: registerUserEmail.value,
      password: registerUserPassword.value,
    }
  );
  console.log(response);
};

registerBtn.addEventListener("click", register);
