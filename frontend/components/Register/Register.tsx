import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthPage } from '../Auth/AuthPage.tsx'
import { FormField } from '../Auth/FormField.tsx'
import { login, register, type AccountType } from '../../lib/api.ts'
import './Register.css'

export function Register() {
  const [accountType, setAccountType] = useState<AccountType>('donor')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  const requiresVerification = accountType !== 'donor'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      await register({
        email,
        password,
        accountType,
        organization: requiresVerification ? organization : undefined,
      })

      if (requiresVerification) {
        setPendingVerificationEmail(email)
        return
      }

      await login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <AuthPage onSubmit={handleSubmit}>
      {pendingVerificationEmail ? (
        <>
          <h1>Almost there</h1>
          <p className="verification-note">
            We created an account for {pendingVerificationEmail}. An administrator must verify
            it before you can log in.
          </p>
          <p className="auth-switch">
            <Link to="/login">Return to Log In</Link>
          </p>
        </>
      ) : (
        <>
          <h1>Register</h1>

          {error && <p className="auth-error">{error}</p>}

          <fieldset className="account-type">
            <legend>I am a...</legend>
            <label className="account-type-option">
              <input
                type="radio"
                name="accountType"
                value="donor"
                checked={accountType === 'donor'}
                onChange={() => setAccountType('donor')}
              />
              Donor
            </label>
            <label className="account-type-option">
              <input
                type="radio"
                name="accountType"
                value="employee"
                checked={accountType === 'employee'}
                onChange={() => setAccountType('employee')}
              />
              Food Bank Employee
            </label>
            <label className="account-type-option">
              <input
                type="radio"
                name="accountType"
                value="partner"
                checked={accountType === 'partner'}
                onChange={() => setAccountType('partner')}
              />
              Partner Agency
            </label>
          </fieldset>

          {requiresVerification && (
            <>
              <FormField
                label={accountType === 'employee' ? 'Food Bank Name' : 'Agency Name'}
                type="text"
                value={organization}
                onChange={setOrganization}
              />
              <p className="verification-note">
                {accountType === 'employee'
                  ? 'Food bank employee accounts must be verified by an administrator before you can log in.'
                  : 'Partner agency accounts must be verified by an administrator before you can log in.'}
              </p>
            </>
          )}

          <FormField label="Email" type="email" value={email} onChange={setEmail} />
          <FormField label="Password" type="password" value={password} onChange={setPassword} />
          <FormField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </>
      )}
    </AuthPage>
  )
}
