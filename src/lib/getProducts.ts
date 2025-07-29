import { Product } from "@/app/serverSide/page";
import axios from "axios";

export const getProducts = async (
  url: string
): Promise<{
  data: Product[];
  error: string | null;
}> => {
  try {
    const response = await axios.get<Product[]>(url);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.message
      : "An unexpected error occurred";
    return {
      data: [],
      error: message,
    };
  }
};

// /lib/postProductData.ts
interface ProductResponse extends Product {
  id: number;
}

export const postProductData = async (
  url: string,
  payload: Omit<Product, "id">
  // payload: Partial<Product>
): Promise<{
  data: ProductResponse | null;
  error: string | null;
}> => {
  try {
    const response = await axios.post(url, payload);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.message
      : "An unexpected error occurred";
    return {
      data: null,
      error: message,
    };
  }
};
