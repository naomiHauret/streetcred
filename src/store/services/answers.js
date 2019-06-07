import { API_URL } from "utils/config"

export const addAnswer = (payload) => {
  fetch(`${API_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: payload.uid, answer: payload.answer }),
  })
}
