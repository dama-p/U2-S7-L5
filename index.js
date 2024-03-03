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
      productsCol.classList.add("col-12", "col-sm-6", "col-lg-4", "col-xxl-3", "d-flex", "justify-content-center");
      productsRow.appendChild(productsCol);

      const card = document.createElement("div");
      card.classList.add("card");
      productsCol.appendChild(card);

      const img = document.createElement("img");
      img.src = product.imageUrl;
      card.appendChild(img);
      img.classList.add("card-img-top", "img-fluid");
      img.style = "width: 100%; height: 300px; object-fit: cover;";

      const cardbody = document.createElement("div");
      cardbody.classList.add("card-body");
      card.appendChild(cardbody);

      const pName = document.createElement("p");
      pName.innerText = product.name;
      cardbody.appendChild(pName);
      pName.classList.add("mb-0", "pName");

      const pBrand = document.createElement("p");
      pBrand.innerText = product.brand;
      cardbody.appendChild(pBrand);
      pBrand.classList.add("pBrand");

      const pDescription = document.createElement("p");
      pDescription.innerText = product.description;
      cardbody.appendChild(pDescription);
      pDescription.classList.add("pDescription");

      const pPrice = document.createElement("p");
      pPrice.innerText = product.price + "€";
      cardbody.appendChild(pPrice);
      pPrice.classList.add("text-primary");

      const pDetails = document.createElement("button");
      cardbody.appendChild(pDetails);
      //pDetails.setAttribute("href", `./details.html?productId=${product._id}`);
      // pDetails.innerText = "Details";
      pDetails.innerHTML = `<a href="./details.html?productId=${product._id}">DETTAGLI</a>`;

      console.log(product.price);
      console.log(product.imageUrl);
      console.log(product.name);
    });
  })

  .catch((err) => console.log(err));
