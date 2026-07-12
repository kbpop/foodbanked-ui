import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
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
    <section id="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
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
            <label>
              {accountType === 'employee' ? 'Food Bank Name' : 'Agency Name'}
              <input
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                required
              />
            </label>
            <p className="verification-note">
              {accountType === 'employee'
                ? 'Food bank employee accounts must be verified by an administrator before you can log in.'
                : 'Partner agency accounts must be verified by an administrator before you can log in.'}
            </p>
          </>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </section>
  )
}
