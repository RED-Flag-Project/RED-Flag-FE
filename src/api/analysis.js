import { client } from "./client";
import { handleApiError } from "./handleApiError";

export async function upload(image) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await client.post("/api/v1/analysis/upload", formData);
    console.log(res);
    return res;
  } catch (error) {
    throw handleApiError(error);
  }
}
