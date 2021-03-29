import axios from 'axios'
import {
  SUBSCRIPTION_UPDATE_ADDRESS_REQUEST,
  SUBSCRIPTION_UPDATE_ADDRESS_SUCCESS,
  SUBSCRIPTION_UPDATE_ADDRESS_FAIL,
  SUBSCRIPTION_UPDATE_PREFRENCES_REQUEST,
  SUBSCRIPTION_UPDATE_PREFRENCES_SUCCESS,
  SUBSCRIPTION_UPDATE_PREFRENCES_FAIL,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAIL,
} from '../constants/subscriptionConstants'

export const updateSubscriptionAddress = (address, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SUBSCRIPTION_UPDATE_ADDRESS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/subscriptions/${id}/address`,
      address,
      config
    )

    dispatch({
      type: SUBSCRIPTION_UPDATE_ADDRESS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SUBSCRIPTION_UPDATE_ADDRESS_FAIL,
      payload: message,
    })
  }
}

export const updateSubscriptionPreferences = (
  subscription,
  id,
  orderItemId
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_UPDATE_PREFRENCES_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/subscriptions/${id}/${orderItemId}/bundle`,
      subscription,
      config
    )

    dispatch({
      type: SUBSCRIPTION_UPDATE_PREFRENCES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SUBSCRIPTION_UPDATE_PREFRENCES_FAIL,
      payload: message,
    })
  }
}

export const cancelSbuscription = (id, orderItemId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CANCEL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/subscriptions/${id}/${orderItemId}`, config)

    dispatch({ type: SUBSCRIPTION_CANCEL_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SUBSCRIPTION_CANCEL_FAIL,
      payload: message,
    })
  }
}
