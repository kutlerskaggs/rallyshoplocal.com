import {
  RECEIVE_MAGAZINES,
  ERROR_FETCHING_MAGAZINES
} from 'redux/modules/actions/magazines'

export function magazines (state = { error: undefined, items: [] }, action) {
  const { type } = action

  switch (type) {
    case RECEIVE_MAGAZINES: {
      return { error: undefined, items: action.magazines }
    }
    case ERROR_FETCHING_MAGAZINES: {
      return { error: action.error, items: [] }
    }
    default: {
      return state
    }
  }
}
