import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { AuthPage } from '../Auth/AuthPage.tsx'
import { FormField } from '../Auth/FormField.tsx'
import './Register.css'

type AccountType = 'donor' | 'employee' | 'partner'

export function Register() {
  const [accountType, setAccountType] = useState<AccountType>('donor')
  const [organization, setOrganization] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const requiresVerification = accountType !== 'donor'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: call the backend register endpoint once it exists
    console.log('register attempt', {
      accountType,
      organization: requiresVerification ? organization : undefined,
      email,
      password,
      confirmPassword,
    })
  }

  return (
    <AuthPage onSubmit={handleSubmit}>
      <h1>Register</h1>

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
    </AuthPage>
  )
}
