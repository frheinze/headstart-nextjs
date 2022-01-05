import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcLoginForm from '../ordercloud/components/OcLoginForm'

const LoginPage: FunctionComponent = () => {
  const { push } = useRouter()

  const handleOnLoggedIn = () => {
    push('/')
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-10 sm:py-18">
        <OcLoginForm onLoggedIn={handleOnLoggedIn} />
      </div>
    </div>
  )
}

export default LoginPage
