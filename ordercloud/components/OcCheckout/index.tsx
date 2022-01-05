import { FunctionComponent, useState } from 'react'
import OcCheckoutBilling from './OcCheckoutBilling'
import OcCheckoutPayment from './OcCheckoutPayment'
import OcCheckoutReview from './OcCheckoutReview'
import OcCheckoutShipping from './OcCheckoutShipping'

/**
 * Tailwind component:
 * https://tailwindui.com/components/ecommerce/components/shopping-carts#component-28f287f64aac61d7f6dbc24f6311d975
 */

export interface OcCheckoutStepProps {
  onNext: () => void
  onPrev: () => void
}

const OcCheckout: FunctionComponent<{ onSubmitted: any }> = ({ onSubmitted }) => {
  const [step, setStep] = useState(0)

  const handlePrevClick = () => {
    setStep((s) => s - 1)
  }

  const handleNextClick = () => {
    setStep((s) => s + 1)
  }

  const handleOrderSubmitted = (orderId: string) => {
    onSubmitted(orderId)
    setStep(0)
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-10 sm:py-18">
        {step === 0 && <OcCheckoutShipping onPrev={handlePrevClick} onNext={handleNextClick} />}
        {step === 1 && <OcCheckoutBilling onPrev={handlePrevClick} onNext={handleNextClick} />}
        {step === 2 && <OcCheckoutPayment onPrev={handlePrevClick} onNext={handleNextClick} />}
        {step === 3 && (
          <OcCheckoutReview
            onPrev={handlePrevClick}
            onNext={handleNextClick}
            onOrderSubmitted={handleOrderSubmitted}
          />
        )}
      </div>
    </div>
  )
}

export default OcCheckout
