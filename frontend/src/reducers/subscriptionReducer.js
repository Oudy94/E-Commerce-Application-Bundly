import {
  SUBSCRIPTION_UPDATE_ADDRESS_REQUEST,
  SUBSCRIPTION_UPDATE_ADDRESS_SUCCESS,
  SUBSCRIPTION_UPDATE_ADDRESS_FAIL,
  SUBSCRIPTION_UPDATE_PREFRENCES_REQUEST,
  SUBSCRIPTION_UPDATE_PREFRENCES_SUCCESS,
  SUBSCRIPTION_UPDATE_PREFRENCES_FAIL,
  SUBSCRIPTION_UPDATE_PREFRENCES_CLEAR,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAIL,
} from '../constants/subscriptionConstants'

export const subscriptionUpdateAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_ADDRESS_REQUEST:
      return { loading: true }
    case SUBSCRIPTION_UPDATE_ADDRESS_SUCCESS:
      return { loading: false, order: action.payload }
    case SUBSCRIPTION_UPDATE_ADDRESS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const subscriptionUpdatePrefrencesReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_PREFRENCES_REQUEST:
      return { loading: true }
    case SUBSCRIPTION_UPDATE_PREFRENCES_SUCCESS:
      return { loading: false, order: action.payload }
    case SUBSCRIPTION_UPDATE_PREFRENCES_FAIL:
      return { loading: false, error: action.payload }
    case SUBSCRIPTION_UPDATE_PREFRENCES_CLEAR:
      return {}
    default:
      return state
  }
}

export const subscriptionCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_CANCEL_REQUEST:
      return { loading: true }
    case SUBSCRIPTION_CANCEL_SUCCESS:
      return { loading: false, success: true }
    case SUBSCRIPTION_CANCEL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
