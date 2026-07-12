import type { FormEvent, ReactNode } from 'react'
import './Auth.css'

type AuthPageProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

export function AuthPage({ onSubmit, children }: AuthPageProps) {
  return (
    <section id="auth">
      <form className="auth-form" onSubmit={onSubmit}>
        {children}
      </form>
    </section>
  )
}
