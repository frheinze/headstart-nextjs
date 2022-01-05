import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcCheckout from '../ordercloud/components/OcCheckout'
import { useOcSelector } from '../ordercloud/redux/ocStore'

const CheckoutPage: FunctionComponent = () => {
  const { push } = useRouter()
  const { initialized } = useOcSelector((s) => s.ocCurrentOrder)

  return initialized ? (
    <OcCheckout onSubmitted={(orderId: string) => push(`/confirmation/${orderId}`)} />
  ) : null
}

export default CheckoutPage
