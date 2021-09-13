//=============== load products from API====================
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

//============== show all product in UI ====================
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add('single-product')
    div.innerHTML = `
    <img class="product-image" src=${image}></img>
      <div class = "mt-5">
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p class = "fw-bold"><span class = "text-danger"><i class="fas fa-star"></i> Average Rate</span> : ${product?.rating?.rate}</p>
      <p class = "fw-bold"><span class = "text-success"><i class="fas fa-male"></i> Count</span> : ${product?.rating?.count}</p>
      <h3>Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>
      <button onclick = "loadDetails(${product.id})" id="details-btn" class="btn btn-secondary">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div)
  }
};
//===================== add products to cart=========================
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};
//================ common function for innertext======================
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

//========================main price update function====================
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const updatetotal = convertedOldPrice + convertPrice;
  const total = parseFloat(updatetotal.toFixed(2))
  document.getElementById(id).innerText = total;
};

// ====================set innerText function============================
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// =======================update delivery charge and total Tax=================
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};
//=============grandTotal update function===================
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};
// ==========================load details=================== 
const loadDetails = productId =>{
  const url = `https://fakestoreapi.com/products/${productId}`
  fetch(url)
  .then(res =>res.json())
  .then(data =>showDetails(data))
}
// ========================show details====================
const showDetails = product =>{
  console.log(product)
  const showDetailsDiv = document.getElementById('show-details')
  showDetailsDiv.textContent = ''
  const div = document.createElement('div')
  div.innerHTML = `
  <img src="${product.image}" class=" img-fluid card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p> Category : ${product.category}</p>
    <p>Information : ${product.description.slice(0,105)}.</p>
    <p class = "fw-bold"><span class = "text-danger"><i class="fas fa-star"></i> Average Rate</span> : ${product?.rating?.rate}</p>
    <p class = "fw-bold"><span class = "text-success"><i class="fas fa-male"></i> Count</span> : ${product?.rating?.count}</p>
    <h3>Price: $ ${product.price}</h3>
  </div>
  `
  showDetailsDiv.appendChild(div)
  showDetailsDiv.style.display = 'block'
}
