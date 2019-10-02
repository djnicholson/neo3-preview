export const REQUEST_BLOCK = 'REQUEST_BLOCK'
export const requestBlock = blockHeight => dispatch => {
  dispatch({
    type: REQUEST_BLOCK,
    blockHeight,
  })
}

export const REQUEST_BLOCKS = 'REQUEST_BLOCKS'
export const requestBlocks = page => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS,
    page,
  })
}

export const REQUEST_BLOCK_SUCCESS = 'REQUEST_BLOCK_SUCCESS'
export const requestBlockSuccess = (blockHeight, json) => dispatch => {
  dispatch({
    type: REQUEST_BLOCK_SUCCESS,
    blockHeight,
    json,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCKS_SUCCESS = 'REQUEST_BLOCKS_SUCCESS'
export const requestBlocksSuccess = (page, json) => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS_SUCCESS,
    page,
    json,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCK_ERROR = 'REQUEST_BLOCK_ERROR'
export const requestBlockError = (blockHeight, error) => dispatch => {
  dispatch({
    type: REQUEST_BLOCK_ERROR,
    blockHeight,
    error,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCKS_ERROR = 'REQUEST_BLOCKS_ERROR'
export const requestBlocksError = (page, error) => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS_ERROR,
    page,
    error,
    receivedAt: Date.now(),
  })
}

export function shouldFetchBlock(state, index) {
  const block = state.blocks.cached[index]
  if (!block) {
    return true
  } else if (state.blocks.isLoading) {
    return false
  }
  return false
}

export function fetchBlock(index = 1) {
  console.log('fetching block')
  return async (dispatch, getState) => {
    console.log(dispatch, getState)
    if (shouldFetchBlock(getState(), index)) {
      try {
        dispatch(requestBlock(index))

        const generateApiUrl = index =>
          `https://ja3l09yg7a.execute-api.us-east-1.amazonaws.com/dev/api/test_net/v1/get_block/${index}`

        const response = await fetch(generateApiUrl(index))
        const json = await response.json()
        dispatch(requestBlockSuccess(index, json))
      } catch (e) {
        dispatch(requestBlockError(index, e))
      }
    }
  }
}

export function fetchBlocks(page = 1) {
  console.log('fetching blocks')
  return async (dispatch, getState) => {
    try {
      dispatch(requestBlocks(page))

      const generateApiUrl = page =>
        `https://ja3l09yg7a.execute-api.us-east-1.amazonaws.com/dev/api/test_net/v1/get_blocks/${page}`

      const response = await fetch(generateApiUrl(page))
      const json = await response.json()
      console.log({ json })
      dispatch(requestBlocksSuccess(page, json))
    } catch (e) {
      dispatch(requestBlockError(page, e))
    }
  }
}
