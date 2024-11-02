const deleteProduct = async (id) => {
  try {
    console.log(id);
    const response = await fetch("/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    window.location.href = "/";
  } catch (error) {}
};

const upDateProduct = async (idp) => {
  const id = idp;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  const product = {
    id: id,
    title: title,
    description: description,
    code: code,
    price: price,
    stock: stock,
    category: category,
  };

  console.log("form");
  console.log(product);

  const response = await fetch("/product", {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};
