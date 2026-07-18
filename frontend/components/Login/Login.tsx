import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthPage } from '../Auth/AuthPage.tsx'
import { FormField } from '../Auth/FormField.tsx'
import { login } from '../../lib/api.ts'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <AuthPage onSubmit={handleSubmit}>
      <h1>Log In</h1>
      {error && <p className="auth-error">{error}</p>}
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
