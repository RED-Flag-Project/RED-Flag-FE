import { client } from "./client";
import { handleApiError } from "./handleApiError";

export async function login() {
  try {
    const res = await client.post("/api/v1/user/issue", {});
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
