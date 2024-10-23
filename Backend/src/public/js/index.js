const socket = io();
const productsList = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const id = document.getElementById("delete");
const del = document.querySelector("delete");

// Agregar productos
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  const product = {
    title: title,
    description: description,
    code: code,
    price: price,
    stock: stock,
    category: category,
  };

  console.log("form");
  console.log(product);

  const response = await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (response?.ok) {
    socket.emit("addProduct", "nuevo producto");
  }

  addForm.reset();
});

// Eliminar productos

const delteProduct = async(id) => {
  console.log(id)
  const response = await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (response?.ok) {
    socket.emit("deleteProduct", "producto eliminado");
  }
};

// Recibir los productos

socket.on("products", (data) => {
  console.log("data");
  console.log(data);
  productsList.innerHTML = "";
  data.forEach((product) => {
    console.log(product.id)
    const card = document.createElement("div");
    card.classList.add("card", "border-dark");
    card.style.width = "10rem";
    card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">${product.price}</p>
           <button  onclick="delteProduct(${product.id})" type="button" class="btn btn-outline-secondary">Eliminar</button>
        </div>
      `;

    productsList.appendChild(card);
  });
});
