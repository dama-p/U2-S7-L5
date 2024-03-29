const detailsImage = document.getElementById("detailsImage");
const detailsName = document.getElementById("detailsName");
const detailsBrand = document.getElementById("detailsBrand");
const detailsDescription = document.getElementById("detailsDescription");
const detailsPrice = document.getElementById("detailsPrice");
const detailsBtns = document.getElementById("detailsBtns");

const params = new URLSearchParams(window.location.search);
const detailsId = params.get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + detailsId;

fetch(URL, {
  method: "GET",

  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTdjNTRjNTllYzAwMTk5MGQ3M2IiLCJpYXQiOjE3MDkyODczNjUsImV4cCI6MTcxMDQ5Njk2NX0.6yZekPUmgVzWjCE3blgy2qGt-SBVB9cffFDDPt4XVW8",
  },
})
  .then((response) => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel reperimento dati");
    }
  })

  .then((product) => {
    console.log(product);

    const productImg = document.createElement("img");
    detailsImage.appendChild(productImg);
    productImg.src = product.imageUrl;
  
    const productName = document.createElement("p");
    detailsName.appendChild(productName);
    productName.innerText = product.name;
    productName.classList.add("pName")

    const productBrand = document.createElement("p");
    detailsBrand.appendChild(productBrand);
    productBrand.innerText = product.brand;

    const productDescription = document.createElement("p");
    detailsDescription.appendChild(productDescription);
    productDescription.innerText = product.description;

    const productPrice = document.createElement("p");
    detailsPrice.appendChild(productPrice);
    productPrice.innerText = "Price: " + product.price + "€";
    detailsPrice.style = "color: #ABC4E2"

    const aEdit = document.createElement("a");
    detailsBtns.appendChild(aEdit);
    aEdit.href=`./backoffice.html?productId=${product._id}`;

    const editBtn = document.createElement("button");
    aEdit.appendChild(editBtn);
    editBtn.innerText = "Edit";
    editBtn.classList.add("buttonDetails", "px-5");

    // editBtn.innerHTML = `<a href="./backoffice.html?productId=${product._id}">EDIT</a>`;


  })

  .catch((err) => console.log(err));
