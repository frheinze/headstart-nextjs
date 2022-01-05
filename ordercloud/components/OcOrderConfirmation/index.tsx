import { FunctionComponent } from 'react'
import { useOcSelector } from '../../redux/ocStore'

interface OcOrderConfirmationProps {
  orderId: string
}

const OcOrderConfirmation: FunctionComponent<OcOrderConfirmationProps> = ({ orderId }) => {
  const recentOrder = useOcSelector((s) =>
    s.ocCurrentOrder.recentOrders.find((ro) => ro.order.ID === orderId)
  )

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:py-18 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-700">
          Order Confirmation (WIP)
        </h2>
        <div className="mt-5">
          <pre>{JSON.stringify(recentOrder, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default OcOrderConfirmation
