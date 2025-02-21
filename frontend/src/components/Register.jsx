import React, { useState } from 'react'
import './Auth.css'
import { messages } from '../locales/messages-en'
// import {messages} from "../locales/messages-es"
import { EyeClosed, EyeOpen } from '../assets/icons/eyes'
import authService from '../services/AuthService'
import { Link } from 'react-router-dom'

export const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const cleanAndSetError = (message) => {
    setError('')
    setError(message)
  }

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/

    if (formState.username === '') {
      cleanAndSetError(messages.usernameEmpty)
      return
    }

    if (formState.email === '') {
      cleanAndSetError(messages.emptyEmail)
      return
    }

    if (!emailPattern.test(formState.email)) {
      cleanAndSetError(messages.invalidEmail)
      return
    }

    if (formState.password === '' || formState.confirmPassword === '') {
      cleanAndSetError(messages.passwordEmpty)
      return
    }

    if (formState.password !== formState.confirmPassword) {
      cleanAndSetError(messages.passwordMismatch)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    validateForm()
    try {
      const registerRequest = {
        username: formState.username,
        email: formState.email,
        password: formState.password
      }
      const response = authService.register(registerRequest)
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
          <input
            type='email'
            placeholder={messages.emailPlaceHolder}
            name='email'
            onChange={handleChange}
            className='auth-input'
            pattern='.*'
            autoComplete='email'
          />
          <PasswordInput
            handleChange={handleChange}
            showBoolean={showPassword}
            setterShowBoolean={setShowPassword}
            name='password'
            placeholder={messages.passwordPlaceHolder}
          />
          <PasswordInput
            handleChange={handleChange}
            showBoolean={showConfirmPassword}
            setterShowBoolean={setShowConfirmPassword}
            name='confirmPassword'
            placeholder={messages.confirmPasswordPlaceHolder}
          />
          {error && <p className='auth-error'>{error}</p>}
          <button className='auth-button'>{messages.signUp}</button>
        </form>
        <section className='auth-register-section'>
          <p>
            {messages.haveAccount}
          </p>
          <Link to='/login' className='auth-register-button'>{messages.signIn}</Link>
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
