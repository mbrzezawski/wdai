import fetch from "node-fetch";

const apiUrl = "https://dummyjson.com/products";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (Array.isArray(data.products)) {
      const productList = data.products.slice(0, 30).map((product) => ({
        name: product.title,
        description: product.description,
        images: product.images[0],
      }));
      console.log(productList);
    } else {
      console.error(
        "Nieprawidłowy format danych - oczekiwano tablicy produktów."
      );
    }
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania danych:", error);
  }
}

fetchProducts();
