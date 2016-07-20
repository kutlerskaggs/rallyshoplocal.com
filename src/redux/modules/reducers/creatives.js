import {
  RECEIVE_CREATIVES,
  ERROR_FETCHING_CREATIVES
} from 'redux/modules/actions/creatives'

export function creatives (state = { error: undefined, items: [] }, action) {
  const { type } = action

  switch (type) {
    case RECEIVE_CREATIVES: {
      return { error: undefined, items: action.creatives }
    }
    case ERROR_FETCHING_CREATIVES: {
      return { error: action.error, items: [] }
    }
    default: {
      return state
    }
  }
}
