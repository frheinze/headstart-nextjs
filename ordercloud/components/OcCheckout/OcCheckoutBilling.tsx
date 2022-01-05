import { isEqual } from 'lodash'
import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { ChangeEvent, FunctionComponent, useCallback, useMemo } from 'react'
import { OcCheckoutStepProps } from '.'
import { removeBillingAddress, saveBillingAddress } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
import OcAddressBook from '../OcAddressBook'
import OcAddressForm from '../OcAddressForm'

const OcCheckoutBilling: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch()
  const { initialized, order, user, lineItems } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }))

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress
    }
    return {}
  }, [initialized, lineItems])

  const currentBillingAddress = useMemo(() => {
    if (initialized && order) {
      return order.BillingAddress
    }
    return null
  }, [initialized, order])

  const showAddressBook = useMemo(() => {
    return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin')
  }, [user])

  const shippingEqualsBilling = useMemo(() => {
    if (!(order && order.BillingAddress && order.BillingAddress.Street1)) return false
    return isEqual(currentShippingAddress, order.BillingAddress)
  }, [currentShippingAddress, order])

  const handleSetBillingAddress = (address: Partial<BuyerAddress>) => {
    dispatch(saveBillingAddress(address))
  }

  const handleSameAsShippingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        dispatch(saveBillingAddress(currentShippingAddress))
      } else {
        dispatch(removeBillingAddress())
      }
    },
    [dispatch, currentShippingAddress]
  )

  return initialized && order ? (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-700">
        Billing (WIP)
      </h2>
      <div className="mt-5">
        <div className="mt-1">
          <input
            type="checkbox"
            id="SameAsShipping"
            name="SameAsShipping"
            onChange={handleSameAsShippingChange}
            checked={shippingEqualsBilling}
          />
          <label htmlFor="SameAsShipping"> Same as Shipping</label>
        </div>

        <div className="mt-1">
          {!shippingEqualsBilling &&
            (showAddressBook ? (
              <OcAddressBook
                id="billing"
                listOptions={{ pageSize: 100 }}
                selected={order.BillingAddressID}
                onChange={handleSetBillingAddress}
              />
            ) : (
              <OcAddressForm
                id="billing"
                address={currentBillingAddress}
                onSubmit={handleSetBillingAddress}
              />
            ))}
        </div>

        <button
          onClick={onPrev}
          type="button"
          className="mt-1 bg-theme1-light border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
        >
          Previous: Shipping
        </button>
        <button
          type="button"
          onClick={onNext}
          className="mt-1 ml-1 bg-theme1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
        >
          Next: Payment
        </button>
      </div>
    </div>
  ) : null
}

export default OcCheckoutBilling
