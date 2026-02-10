import { client } from "./client";
import { handleApiError } from "./handleApiError";

export async function upload(image) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await client.post("/api/v1/analysis/upload", formData);
    return res;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function analysis(id) {
  try {
    const res = await client.get(`/api/v1/analysis/${id}`);
    return res;
  } catch (error) {
    throw handleApiError(error);
  }
}
