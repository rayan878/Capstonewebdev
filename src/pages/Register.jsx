import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

// ── Validation schemas per step ───────────────────────────────
const step1Schema = yup.object({
  displayName: yup.string().required('Name is required').min(2, 'Too short'),
  email:       yup.string().email('Invalid email').required('Email is required'),
  password:    yup.string().min(6, 'Min 6 characters').required('Password is required'),
})

const step2Schema = yup.object({
  favouriteTeam:  yup.string().required('Please enter your favourite team'),
  favouriteSport: yup.string().required('Select a sport'),
})

const step3Schema = yup.object({
  notifyLive:    yup.boolean(),
  notifyResults: yup.boolean(),
})

const schemas = [step1Schema, step2Schema, step3Schema]

const STEPS = [
  { label: 'Account',      desc: 'Your personal info' },
  { label: 'Preferences',  desc: 'Your favourite sport' },
  { label: 'Notifications',desc: 'Stay updated' },
]

const sports = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Rugby', 'Baseball']

export default function Register() {
  const [step, setStep]       = useState(0)
  const [allData, setAllData] = useState({})
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')
  const navigate              = useNavigate()

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schemas[step]) })

  const onNext = (data) => {
    const merged = { ...allData, ...data }
    setAllData(merged)
    if (step < 2) {
      setStep(s => s + 1)
    } else {
      handleRegister(merged)
    }
  }

  const handleRegister = async (data) => {
    setError('')
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(cred.user, { displayName: data.displayName })
      setDone(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (e) {
      setError(e.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''))
    }
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="text-green-400 mx-auto mb-4" size={56} />
          <h2 className="font-display text-4xl tracking-wider text-white">WELCOME!</h2>
          <p className="text-white/40 mt-2">Redirecting to home…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto py-12">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={i} className="flex-1 flex flex-col gap-1.5">
            <div className={`h-0.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-brand-500' : 'bg-white/10'}`} />
            <span className={`text-xs font-mono transition-colors ${i === step ? 'text-brand-400' : i < step ? 'text-white/40' : 'text-white/15'}`}>
              {String(i + 1).padStart(2, '0')} {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-card p-8">
        <h1 className="font-display text-3xl tracking-wider text-white mb-1">{STEPS[step].label.toUpperCase()}</h1>
        <p className="text-white/30 text-sm mb-8">{STEPS[step].desc}</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onNext)} className="space-y-5">
          {/* Step 1: Account */}
          {step === 0 && (
            <>
              <Field label="Full Name" error={errors.displayName?.message}>
                <input {...register('displayName')} placeholder="Cristiano Ronaldo" className="input-field" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="you@example.com" className="input-field" />
              </Field>
              <Field label="Password" error={errors.password?.message}>
                <input {...register('password')} type="password" placeholder="Min 6 characters" className="input-field" />
              </Field>
            </>
          )}

          {/* Step 2: Preferences */}
          {step === 1 && (
            <>
              <Field label="Favourite Team" error={errors.favouriteTeam?.message}>
                <input {...register('favouriteTeam')} placeholder="e.g. Arsenal" className="input-field" />
              </Field>
              <Field label="Favourite Sport" error={errors.favouriteSport?.message}>
                <select {...register('favouriteSport')} className="input-field">
                  <option value="">Select a sport…</option>
                  {sports.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </>
          )}

          {/* Step 3: Notifications */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-white/40 text-sm">Choose what updates you'd like to receive:</p>
              <CheckboxField register={register} name="notifyLive"    label="Live match alerts"  desc="Get notified when your team kicks off" />
              <CheckboxField register={register} name="notifyResults" label="Match results"       desc="Score updates when matches finish" />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {step > 0 && (
              <button type="button" onClick={() => setStep(s => s - 1)} className="btn-ghost flex items-center gap-1.5">
                <ChevronLeft size={14} /> Back
              </button>
            )}
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 flex items-center justify-center gap-1.5 disabled:opacity-50">
              {step === 2
                ? (isSubmitting ? 'Creating account…' : 'Create Account')
                : (<>Next <ChevronRight size={14} /></>)
              }
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-white/25 text-sm mt-6">
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} className="text-brand-400 cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-white/50 text-xs font-mono uppercase tracking-wider mb-2">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  )
}

function CheckboxField({ register, name, label, desc }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        {...register(name)}
        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-surface accent-brand-500 cursor-pointer"
      />
      <div>
        <p className="text-white/70 font-medium text-sm group-hover:text-white transition-colors">{label}</p>
        <p className="text-white/30 text-xs">{desc}</p>
      </div>
    </label>
  )
}
