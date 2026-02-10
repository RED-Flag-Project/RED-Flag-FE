import { client } from "./client";
import { handleApiError } from "./handleApiError";

export async function getSecurityInfo() {
    try {
        const res = await client.get("/api/v1/security-info");
        return res.data;
    } catch (error) {
        throw handleApiError(error);
    }
}