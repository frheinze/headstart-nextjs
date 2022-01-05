import { Payment } from 'ordercloud-javascript-sdk'
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { OcCheckoutStepProps } from '.'
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder'
import { addPayment, removePayment } from '../../redux/ocCurrentOrder'
import { useOcDispatch } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'

const OcCheckoutPayment: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch()
  const { order, payments } = useOcCurrentOrder()

  const amountDue = useMemo(() => {
    if (!order) return 0
    if (!payments || (payments && !payments.length)) return order.Total
    return order.Total - payments.map((p) => p.Amount).reduceRight((p, c) => p + c)
  }, [order, payments])

  const [pendingPayment, setPendingPayment] = useState(amountDue)

  const handleAddPayment = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      dispatch(addPayment({ Type: 'PurchaseOrder', Amount: pendingPayment }))
    },
    [dispatch, pendingPayment]
  )

  const handleRemovePayment = useCallback(
    (paymentId: string) => () => {
      dispatch(removePayment(paymentId))
    },
    [dispatch]
  )

  useEffect(() => {
    setPendingPayment(amountDue)
  }, [amountDue])

  const handlePendingPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPendingPayment(Number(e.target.value))
  }

  function classNames(...classes): string {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-700">
        Payment (WIP)
      </h2>
      <h3>{`Amount Due ${formatPrice(amountDue)}`}</h3>
      <div className="mt-5">
        {payments &&
          payments.map((p) => (
            <div key={p.ID}>
              {p.Type}
              <b>{` ${formatPrice(p.Amount)}`} </b>
              <button
                type="button"
                onClick={handleRemovePayment(p.ID)}
                className="ml-4 text-sm font-medium text-theme2 hover:text-theme2-dark sm:ml-0 sm:mt-3"
              >
                Remove Payment
              </button>
            </div>
          ))}
        <form id="checkout_payment" onSubmit={handleAddPayment}>
          <label htmlFor="checkout_pending_payment">Payment Amount</label>
          <div className="mt-1">
            <input
              id="checkout_pending_payment"
              type="number"
              max={amountDue}
              min="1"
              value={pendingPayment}
              step="0.01"
              onChange={handlePendingPaymentChange}
            />
          </div>
          <div className="pt-5 pb-5">
            <button
              type="submit"
              disabled={!amountDue}
              className="ml-4 text-sm font-medium text-theme2 hover:text-theme2-dark sm:ml-0 sm:mt-3"
            >
              Add Payment
            </button>
          </div>
        </form>
      </div>

      <button
        onClick={onPrev}
        type="button"
        className="mt-1 bg-theme1-light border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
      >
        Previous: Billing
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!!amountDue}
        className={classNames(
          amountDue? 'bg-gray-500 cursor-default'
          : 'bg-theme1 hover:bg-theme1-light', 'mt-1 ml-1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1')}
      >
        Next: Review Order
      </button>
    </div>
  )
}

export default OcCheckoutPayment
