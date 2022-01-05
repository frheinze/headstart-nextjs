import { ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import login from '../../redux/ocAuth/login'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'

interface OcLoginFormProps {
  title?: string
  onLoggedIn: () => void
}

const OcLoginForm: FunctionComponent<OcLoginFormProps> = ({
  title = 'Sign into your account (WIP)',
  onLoggedIn,
}) => {
  const dispatch = useOcDispatch()

  const { loading, error, isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
    error: s.ocAuth.error,
    loading: s.ocAuth.loading,
  }))

  const [formValues, setFormValues] = useState({
    identifier: '',
    password: '',
    remember: false,
  })

  const handleInputChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: e.target.value }))
  }

  const handleCheckboxChange = (fieldKey: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, [fieldKey]: !!e.target.checked }))
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch(
        login({
          username: formValues.identifier,
          password: formValues.password,
          remember: formValues.remember,
        })
      )
    },
    [formValues, dispatch]
  )

  useEffect(() => {
    if (!isAnonymous) {
      console.log("NICHT mehr anonym")
      onLoggedIn()
    }
  }, [isAnonymous, onLoggedIn])

  return (
    <form name="ocLoginForm" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-700">{title}</h1>
      {error && <p>{error.message}</p>}
      <div className="mt-5">
        <label htmlFor="identifier">Username</label>
        <div className="mt-1">
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter username"
            value={formValues.identifier}
            onChange={handleInputChange('identifier')}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formValues.password}
            onChange={handleInputChange('password')}
            required
          />
        </div>
      </div>
      <div>
      <label htmlFor="remember">Keep me logged in</label>

      <div className="mt-1">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={formValues.remember}
          onChange={handleCheckboxChange('remember')}
        />
      </div>
      </div>
      <button disabled={loading} type="submit" className="mt-1 bg-theme1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1">                  
        Submit
      </button>  
    </form>
  )
}

export default OcLoginForm
