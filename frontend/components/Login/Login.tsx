import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { AuthPage } from '../Auth/AuthPage.tsx'
import { FormField } from '../Auth/FormField.tsx'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: call the backend login endpoint once it exists
    console.log('login attempt', { email, password })
  }

  return (
    <AuthPage onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <FormField label="Email" type="email" value={email} onChange={setEmail} />
      <FormField label="Password" type="password" value={password} onChange={setPassword} />
      <button type="submit" className="btn btn-primary">
        Log In
      </button>
      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </AuthPage>
  )
}
