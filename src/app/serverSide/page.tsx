import { getProducts, postProductData } from "@/lib/getProducts";
import React from "react";
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface ProductResponse extends Product {
  id: number;
}
const Page = async () => {
  const url = "https://fakestoreapi.com/products";

  const payload: Omit<Product, "id"> = {
    title: "New Product",
    price: 99.99,
    description: "A test product is ",
    image: "https://example.com/image.jpg",
    category: "electronics",
  };

  const { data: postData, error: postError } = await postProductData(
    url,
    payload
  );

  const { data: products, error: getError } = await getProducts(url);
  console.log(postData);
  console.log(products);

  return (
    <>
      <div>
        <h1>Products</h1>
        {getError && (
          <p style={{ color: "red" }}>
            {typeof getError === "string"
              ? getError
              : "Failed to fetch products."}
          </p>
        )}

        {products &&
          Array.isArray(products) &&
          products.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
      </div>

      <div>
        {/* <h1>Server-Side POST Request</h1> */}

        {/* {postError && <p style={{ color: "red" }}>{postError}</p>}
        {postData && Array.isArray(postData) && (
          <div>
            <h2>Response from API:</h2>
            <pre>{JSON.stringify(postData, null, 2)}</pre>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Page;
