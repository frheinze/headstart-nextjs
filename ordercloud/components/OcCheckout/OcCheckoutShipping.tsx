import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useMemo } from 'react'
import { saveShippingAddress } from '../../redux/ocCurrentOrder'
import { useOcDispatch, useOcSelector } from '../../redux/ocStore'
import OcAddressBook from '../OcAddressBook'
import OcAddressForm from '../OcAddressForm'
import OcShipEstimates from './OcShipEstimates'
import { OcCheckoutStepProps } from './index'
import Link from 'next/link'

const OcCheckoutShipping: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch()

  const { initialized, order, lineItems, user } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }))

  const handleSetShippingAddress = (address: Partial<BuyerAddress>) => {
    console.log('address', address)
    dispatch(saveShippingAddress(address))
  }

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress
    }
    return {}
  }, [initialized, lineItems])

  const showAddressBook = useMemo(() => {
    return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin')
  }, [user])

  return initialized && order ? (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-700">
        Shipping (WIP)
      </h2>
      <div className="mt-5">
        {showAddressBook ? (
          <OcAddressBook
            id="shipping"
            listOptions={{ pageSize: 100 }}
            selected={order.ShippingAddressID}
            onChange={handleSetShippingAddress}
          />
        ) : (
          <OcAddressForm
            id="shipping"
            address={currentShippingAddress}
            onSubmit={handleSetShippingAddress}
          />
        )}
        <OcShipEstimates />
      </div>

      <Link href="/cart">
        <button
          type="button"
          className="mt-1 bg-theme1-light border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
        >
          Previous: Cart
        </button>
      </Link>
      <button
        onClick={onNext}
        type="button"
        className="mt-1 ml-1 bg-theme1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
      >
        Next: Billing
      </button>
    </div>
  ) : null
}

export default OcCheckoutShipping
