import { createSymbiote } from "redux-symbiote"

const initialState = {
  loading: false,
  list: {}, // all our questions
  error: false, // loading error
}

const symbiotes = {
  // Loading indicator for questions
  load: (state) => ({
    ...state,
    loading: true,
  }),

  // Error on questions loading
  errorOnLoad: (state) => ({
    ...state,
    loading: false,
    error: true,
  }),

  // Set questions
  setQuestions: (state, payload) => {
    return {
      ...state,
      loading: false,
      list: {
        ...payload.questions,
      },
    }
  },
}
export const { actions, reducer: questionsReducer } = createSymbiote(initialState, symbiotes, "app/questions")
