import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { authGoogle } from '../actions/userActions'

const GoogleAuth = () => {
  const [apiKey, setApiKey] = useState('')

  const dispatch = useDispatch()

  const responseSuccessGoogle = (response) => {
    dispatch(authGoogle(response.tokenId))
  }

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const { data } = await axios.get('/api/config/googleauth')
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
        <GoogleLogin
          clientId={apiKey}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className='btn btn-block my-2 btn-google'
              style={{ backgroundColor: '#CF4332', border: 'none' }}
            >
              <i
                style={{ float: 'left' }}
                className='fab fa-google-plus-g py-1'
              ></i>
              Continue with Google
            </Button>
          )}
          onSuccess={responseSuccessGoogle}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </>
  )
}

export default GoogleAuth
