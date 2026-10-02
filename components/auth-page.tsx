'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import { Logo } from './ui';

type AuthMode = 'login' | 'register' | 'forgot';

const copy = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Pick up where you left off.',
    description: 'Sign in to keep your library, favorites, and reading progress close by.',
    submit: 'Log in',
  },
  register: {
    eyebrow: 'Start your shelf',
    title: 'Make room for more stories.',
    description: 'Create a free account and keep your Mangation shelf with you on every screen.',
    submit: 'Create account',
  },
  forgot: {
    eyebrow: 'Account access',
    title: 'Let’s get you back in.',
    description: 'Enter your email and we’ll send a link to reset your password.',
    submit: 'Send reset link',
  },
} as const;

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const details = copy[mode];

  function update(field: keyof typeof values, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    if (error) setError('');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (mode === 'register' && values.password.length < 8) {
      setError('Use at least 8 characters for your password.');
      return;
    }
    if (mode === 'register' && values.password !== values.confirm) {
      setError('Those passwords do not match.');
      return;
    }
    // This is intentionally a local preview until the authentication API is connected.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="auth-page">
        <div className="auth-shell auth-shell-centered">
          <Link className="auth-brand" href="/" aria-label="Mangation home"><Logo /><span>Mangation</span></Link>
          <section className="auth-card auth-success-card" aria-live="polite">
            <span className="auth-success-icon"><Check size={22} /></span>
            <p className="auth-eyebrow">Demo preview</p>
            <h1>{mode === 'forgot' ? 'Check your inbox.' : mode === 'login' ? 'You’re ready to read.' : 'Your shelf is ready.'}</h1>
            <p className="auth-description">The screen is ready for the API connection. No credentials were sent or saved in this preview.</p>
            <Link className="auth-submit auth-submit-link" href={mode === 'forgot' ? '/login/' : '/'}>{mode === 'forgot' ? 'Back to log in' : 'Keep exploring'}</Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <aside className="auth-aside" aria-label="Mangation introduction">
          <Link className="auth-brand auth-brand-light" href="/" aria-label="Mangation home"><Logo /><span>Mangation</span></Link>
          <div className="auth-aside-copy">
            <p className="auth-aside-kicker">A quieter way to read</p>
            <p className="auth-aside-quote">“The next great story is usually one page away.”</p>
            <span className="auth-aside-rule" />
            <p className="auth-aside-note">Save the stories that stay with you and return whenever you like.</p>
          </div>
          <span className="auth-aside-mark" aria-hidden="true"><Logo boxed /></span>
        </aside>

        <section className="auth-form-page">
          <Link className="auth-back" href="/"><ArrowLeft size={16} />Back to Discover</Link>
          <div className="auth-card">
            <div className="auth-heading">
              <p className="auth-eyebrow">{details.eyebrow}</p>
              <h1>{details.title}</h1>
              <p className="auth-description">{details.description}</p>
            </div>
            <form className="auth-form-page-fields" onSubmit={submit}>
              {mode === 'register' && <label className="auth-field">Name<span className="sr-only">Your name</span><input required autoComplete="name" value={values.name} onChange={event => update('name', event.target.value)} placeholder="Your name" /></label>}
              <label className="auth-field">Email<input required type="email" autoComplete="email" value={values.email} onChange={event => update('email', event.target.value)} placeholder="you@example.com" /></label>
              {mode !== 'forgot' && <>
                <label className="auth-field">Password<div className="auth-input-wrap"><input required type={showPassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} minLength={8} value={values.password} onChange={event => update('password', event.target.value)} placeholder="At least 8 characters" /><button className="auth-eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(current => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
                {mode === 'register' && <label className="auth-field">Confirm password<div className="auth-input-wrap"><input required type={showConfirm ? 'text' : 'password'} autoComplete="new-password" minLength={8} value={values.confirm} onChange={event => update('confirm', event.target.value)} placeholder="Repeat your password" /><button className="auth-eye" type="button" aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'} onClick={() => setShowConfirm(current => !current)}>{showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>}
              </>}
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-submit" type="submit">{details.submit}</button>
            </form>
            {mode === 'login' && <Link className="auth-forgot" href="/forgot-password/">Forgot password?</Link>}
            <p className="auth-switch">{mode === 'login' ? <>New to Mangation? <Link href="/register/">Create an account</Link></> : mode === 'register' ? <>Already have an account? <Link href="/login/">Log in</Link></> : <>Remembered your password? <Link href="/login/">Back to log in</Link></>}</p>
            <p className="auth-note">Demo preview · Authentication will connect here.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
