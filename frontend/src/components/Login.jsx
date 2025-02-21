import { useState } from 'react'
import './Auth.css'
import { messages } from '../locales/messages-en'
// import {messages} from "../locales/messages-es"
import { EyeClosed, EyeOpen } from '../assets/icons/eyes'
import { Link } from 'react-router-dom'
import authService from '../services/AuthService'
export const Login = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const validateForm = () => {
    if (formState.username === '') {
      setError(messages.usernameEmpty)
    }
    if (formState.password === '') {
      setError(messages.passwordEmpty)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    validateForm()
    try {
      const loginRequest = {
        username: formState.username,
        password: formState.password
      }
      const response = authService.register(loginRequest)
      console.log('Registro exitoso:', response)
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h5 className='auth-details-info'>{messages.detailsMessage}</h5>
        <h1 className='auth-welcome-message'>{messages.welcome}</h1>
        <form onSubmit={e => handleSubmit(e)} className='auth-form'>
          <input
            id='first-input'
            type='text'
            placeholder={messages.usernamePlaceHolder}
            name='username'
            onChange={handleChange}
            className='auth-input'
          />
          <PasswordInput
            showBoolean={showPassword}
            setterShowBoolean={setShowPassword}
            name='password'
            handleChange={handleChange}
            placeholder={messages.passwordPlaceHolder}
          />
          <section className='auth-remember-and-forgot-section'>
            <span>
              <input type='checkbox' id='remember-me' />
              <label htmlFor='remember-me'>{messages.rememberFor}</label>
            </span>
            <Link to='/forgot'>{messages.forgotPassword}</Link>
          </section>
          {error && <p className='auth-error'>{error}</p>}
          <button className='auth-button'>{messages.signIn}</button>
        </form>

        <section className='auth-register-section'>
          <p>{messages.dontHaveAccount}
            <Link to='/register' className='auth-register-button'>{messages.signUp}</Link>
          </p>
        </section>
      </div>
    </div>
  )
}

const PasswordInput = ({ showBoolean, setterShowBoolean, name, handleChange, aditionalClasses = '', placeholder }) => {
  const classes = `auth-input ${aditionalClasses}`

  return (
    <div className='password-container'>
      <input
        type={showBoolean ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className={classes}
      />
      <i onClick={() => setterShowBoolean(!showBoolean)} className='password-icon'>
        {showBoolean ? <EyeOpen /> : <EyeClosed />}
      </i>
    </div>
  )
}
