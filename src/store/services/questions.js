import { API_URL } from "utils/config"

export const getQuestions = (load, onSuccess, onFail) => {
  fetch(`${API_URL}/questions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const questions = {}
        data.map((data) => (questions[data.uid] = data))
        onSuccess({ questions })
      } else {
        return onFail //error
      }
    })
}
