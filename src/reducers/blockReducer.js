import {
  REQUEST_BLOCK,
  REQUEST_BLOCK_SUCCESS,
  REQUEST_BLOCKS,
  REQUEST_BLOCKS_SUCCESS,
} from '../actions/blockActions'

export default (
  state = {
    isLoading: false,
    cached: {},
    list: [],
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_BLOCK:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case REQUEST_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        block: action.json,
        lastUpdated: action.receivedAt,
        cached: {
          [action.blockHeight]: action.json,
        },
      })
    case REQUEST_BLOCKS:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case REQUEST_BLOCKS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        list: action.json,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}
