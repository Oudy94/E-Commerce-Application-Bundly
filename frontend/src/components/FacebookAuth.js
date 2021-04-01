import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { authFacebook } from '../actions/userActions'

const FacebookAuth = () => {
  const [apiKey, setApiKey] = useState('')

  const dispatch = useDispatch()

  const responseFacebook = (response) => {
    dispatch(authFacebook(response.accessToken, response.userID))
  }

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const { data } = await axios.get('/api/config/facebookauth')
        if (data) {
          setApiKey(data)
        } else {
          throw new Error('failed to fetch the api key')
        }
      } catch (error) {
        console.log(error)
      }
    }

    getApiKey()
  }, [apiKey])

  return (
    <>
      {apiKey && (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              className='btn btn-block my-2 btn-facebook'
              style={{ backgroundColor: '#3C66C4', border: 'none' }}
            >
              <i
                style={{ float: 'left' }}
                className='fab fa-facebook-f py-1'
              ></i>
              Continue with Facebook
            </Button>
          )}
          autoLoad={false}
          callback={responseFacebook}
        />
      )}
    </>
  )
}

export default FacebookAuth
