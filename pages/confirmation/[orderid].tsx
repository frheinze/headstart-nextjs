import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcInfo from '../../ordercloud/components/content/OcInfo'
import OcOrderConfirmation from '../../ordercloud/components/OcOrderConfirmation'

const OrderConfirmationPage: FunctionComponent = () => {
  const { isReady, query } = useRouter()

  return isReady 
    ? <OcOrderConfirmation orderId={query.orderid as string} />
    : <OcInfo />
}

export default OrderConfirmationPage
