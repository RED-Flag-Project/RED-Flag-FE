import { client } from "./client";
import { handleApiError } from "./handleApiError";

export async function getTodayStats() {
    try {
        const res = await client.get("/api/v1/dashboard");
        return res.data;
    } catch (error) {
        const apiErr = handleApiError(error);
        const e = new Error(apiErr.message);
        e.status = apiErr.status;
        e.code = apiErr.code;
        throw e;
    }
}