import axios from "./axios";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const insertProduct = async (productData) => {
  try {
    // ส่งเป็น JSON ธรรมดา
    const res = await axios.post("/products", productData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(`/products/${id}`, productData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};