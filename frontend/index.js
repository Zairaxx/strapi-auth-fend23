//Login
const loginUser = document.querySelector("#loginUser");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
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

let login = async () => {
  console.log("Logging in...");
  // let response = await fetch("http://localhost:1337/api/auth/local/", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     identifier: loginUser.value,
  //     password: loginPassword.value,
  //   }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // let json = await response.json();
  // console.log(json);

  //Axios
  let response = await axios.post("http://localhost:1337/api/auth/local/", {
    identifier: loginUser.value,
    password: loginPassword.value,
  });
  console.log(response.data);
  sessionStorage.setItem("token", response.data.jwt);
  sessionStorage.setItem("user", JSON.stringify(response.data.user));
  renderPage();
};

let logout = () => {
  sessionStorage.clear();
  renderPage();
};

registerBtn.addEventListener("click", register);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
//Check login status

let checkIfLoggedIn = async () => {
  // let status = sessionStorage.getItem("token") ? true : false;
  let status;
  try {
    await axios.get("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    status = true;
  } catch (error) {
    console.log(error);
    status = false;
  } finally {
    return status;
  }
};

let getProducts = async () => {
  let response = await axios.get("http://localhost:1337/api/products", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  console.log(response);
  return response.data;
};

let renderPage = async () => {
  let isLoggedIn = await checkIfLoggedIn();
  if (isLoggedIn) {
    document.querySelector("#login-wrapper").style.display = "none";
    document.querySelector("#welcome-page").style.display = "block";
    document.querySelector("#welcome-page h2").innerText = `Welcome back, ${
      JSON.parse(sessionStorage.getItem("user")).username
    } !`;

    let products = await getProducts();

    let productList = document.querySelector("#products");
    productList.innerHTML = "";

    console.log(products);
    products.data.forEach((product) => {
      let { name, price } = product.attributes;
      productList.innerHTML += `<li>${name} - ${price}kr</li>`;
    });
    //Visa ut i DOM:en
  } else {
    document.querySelector("#login-wrapper").style.display = "block";
    document.querySelector("#welcome-page").style.display = "none";
  }
};

renderPage();
