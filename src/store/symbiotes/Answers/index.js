import { createSymbiote } from "redux-symbiote"
import { addAnswer } from "store/services/answers"

const initialState = {
  list: [],
}

const symbiotes = {
  // set free lesson
  answerToQuestion: (state, payload) => {
    addAnswer(payload)
    return {
      ...state,
      list: [...state.list, payload.uid],
    }
  },
}

export const { actions, reducer: answersReducer } = createSymbiote(initialState, symbiotes, "app/answers")
