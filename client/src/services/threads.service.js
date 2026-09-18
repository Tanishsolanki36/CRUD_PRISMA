// Already wired — exercises all four routes. Do NOT edit.
import apiClient from "./apiClient";

export async function getThreads() {
  const res = await apiClient.get("/api/threads");
  return res.data;
}
export async function createThread(data) {
  // data = { title, body }
  const res = await apiClient.post("/api/threads", data);
  return res.data; // the created thread (201)
}
export async function updateThread(id, data) {
  const res = await apiClient.put("/api/threads/" + id, data);
  return res.data; // the updated thread (200)
}
export async function deleteThread(id) {
  const res = await apiClient.delete("/api/threads/" + id);
  return res.data; // the deleted thread (200)
}
