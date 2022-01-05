import { FunctionComponent, useCallback } from 'react'
import { OcCheckoutStepProps } from '.'
import { OcCurrentOrderState, submitOrder } from '../../redux/ocCurrentOrder'
import { useOcDispatch } from '../../redux/ocStore'
import OcLineItemList from '../OcLineItemList'
import OcCheckoutSummary from './OcCheckoutSummary'

interface OcCheckoutReviewProps extends OcCheckoutStepProps {
  onOrderSubmitted: (orderId: string) => void
}

const OcCheckoutReview: FunctionComponent<OcCheckoutReviewProps> = ({
  onPrev,
  onOrderSubmitted,
}) => {
  const dispatch = useOcDispatch()
  const handleSubmitOrder = useCallback(async () => {
    await dispatch(submitOrder(onOrderSubmitted))
  }, [dispatch, onOrderSubmitted])

  return (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-700">
        Review Order (WIP)
      </h2>
      <div className="mt-5">
        <OcLineItemList />
        {/* Order summary */}
        <div className="mt-10 sm:ml-16 sm:mr-16 sm:pl-6 t">
        <OcCheckoutSummary />

        <div className="mt-10 text-center">
                
        <button
          onClick={onPrev}
          type="button"
          className="mt-1 bg-theme1-light border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
        >
          Previous: Payment
        </button>
        <button
          type="button"
          onClick={handleSubmitOrder}
          className="mt-1 ml-1 bg-theme1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
        >
          Submit Order
        </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default OcCheckoutReview
