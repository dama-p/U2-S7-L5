const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productBrand = document.getElementById("productBrand");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const submitBtn = document.getElementById("submitBtn");
const form = document.querySelector("form");

fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
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

  .then((productList) => {
    console.log(productList);

    productList.forEach((product) => {
      const productsRow = document.getElementById("productsRow");
      const productsCol = document.createElement("div");
      productsCol.classList.add("col");
      productsRow.appendChild(productsCol);

      const card = document.createElement("div");
      card.classList.add("card");
      productsCol.appendChild(card);
      card.style = "width:300px;";

      const img = document.createElement("img");
      img.src = product.imageUrl;
      card.appendChild(img);
      img.classList.add("card-img-top");
      img.style = "max-height: 300px; object-fit: cover;";

      const cardbody = document.createElement("div");
      cardbody.classList.add("card-body");
      card.appendChild(cardbody);

      const pName = document.createElement("p");
      pName.innerText = product.name;
      cardbody.appendChild(pName);
      pName.classList.add("fs-3", "mb-0");

      const pBrand = document.createElement("p");
      pBrand.innerText = product.brand;
      cardbody.appendChild(pBrand);
      pBrand.classList.add("text-secondary", "fs-6");

      const pDescription = document.createElement("p");
      pDescription.innerText = product.description;
      cardbody.appendChild(pDescription);

      const pPrice = document.createElement("p");
      pPrice.innerText = product.price + "€";
      cardbody.appendChild(pPrice);
      pPrice.classList.add("text-primary");

      const pDetails = document.createElement("button");
      cardbody.appendChild(pDetails);
      //pDetails.setAttribute("href", `./details.html?productId=${product._id}`);
      // pDetails.innerText = "Details";
      pDetails.innerHTML = `<a href="./details.html?productId=${product._id}">DETTAGLI</a>`

      console.log(product.price);
      console.log(product.imageUrl);
      console.log(product.name);
    });
  })

  .catch((err) => console.log(err));
