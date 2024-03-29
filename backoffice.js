const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productBrand = document.getElementById("productBrand");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const pageMode = document.getElementById("pageMode");

const form = document.querySelector("form");

const detailsId = new URLSearchParams(window.location.search).get("productId");
console.log(detailsId);

const URL = detailsId
  ? "https://striveschool-api.herokuapp.com/api/product/" + detailsId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = detailsId ? "PUT" : "POST";

const resetFields = function () {
  productName.value = "";
  productDescription.value = "";
  productBrand.value = "";
  productImg.value = "";
  productPrice.value = "";
};

window.onload = () => {
  if (detailsId) {
    const editMode = document.createElement("p");
    editMode.innerText = "Edit your product information:";
    pageMode.appendChild(editMode);

    fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTdjNTRjNTllYzAwMTk5MGQ3M2IiLCJpYXQiOjE3MDkyODczNjUsImV4cCI6MTcxMDQ5Njk2NX0.6yZekPUmgVzWjCE3blgy2qGt-SBVB9cffFDDPt4XVW8",
      },
    })
      .then((response) => response.json())
      .then((product) => {
        productName.value = product.name;
        productDescription.value = product.description;
        productBrand.value = product.brand;
        productImg.value = product.imageUrl;
        productPrice.value = product.price;

        resetBtn.classList.add("d-none");

        console.log(product);
      });
  } else {
    const createMode = document.createElement("p");
    createMode.innerText = "Insert your product information:";
    pageMode.appendChild(createMode);
    deleteBtn.classList.add("d-none");
  }
};

const submitProduct = function (e) {
  e.preventDefault();

  const newProduct = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImg.value,
    price: productPrice.value,
  };

  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTdjNTRjNTllYzAwMTk5MGQ3M2IiLCJpYXQiOjE3MDkyODczNjUsImV4cCI6MTcxMDQ5Njk2NX0.6yZekPUmgVzWjCE3blgy2qGt-SBVB9cffFDDPt4XVW8",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE NEL REPERIMENTO DATI");
      }
    })

    .then((newProduct) => {
      alert("Your product " + newProduct.name + (detailsId ? " has been successfully saved!" : " has been created!"));

      resetFields();
    })
    .catch((error) => console.log(error));
};

const deleteFn = function (e) {
  let positiveAnswer = confirm("Are you sure you want to delete this item?");

  if (positiveAnswer) {
    fetch(URL, {
      method: "DELETE",

      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTdjNTRjNTllYzAwMTk5MGQ3M2IiLCJpYXQiOjE3MDkyODczNjUsImV4cCI6MTcxMDQ5Njk2NX0.6yZekPUmgVzWjCE3blgy2qGt-SBVB9cffFDDPt4XVW8",
      },
    })
    .then(response => response.json())
    .then(deletedItem => {
      alert(deletedItem.name + " has been deleted")
      window.location.assign("./index.html")
    })

  }
};

form.addEventListener("submit", submitProduct);
resetBtn.addEventListener("click", resetFields);
deleteBtn.addEventListener("click", deleteFn);
