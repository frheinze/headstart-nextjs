import { FunctionComponent, useMemo } from 'react'
import { useOcSelector } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'

const OcCheckoutSummary: FunctionComponent = () => {
  const { order, shipEstimateResponse, payments } = useOcSelector((s) => s.ocCurrentOrder)

  const isShippingAccurate = useMemo(() => {
    return (
      shipEstimateResponse &&
      shipEstimateResponse.ShipEstimates &&
      shipEstimateResponse.ShipEstimates.filter((se) => !se.SelectedShipMethodID).length === 0
    )
  }, [shipEstimateResponse])

  const isTaxAccurate = useMemo(() => {
    return order && order.BillingAddress && isShippingAccurate
  }, [order, isShippingAccurate])

  return order ? (
    <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 t">
      <h2 className="sr-only">Order summary</h2>

      <div className="flow-root">
        <dl className="-my-4 text-sm divide-y divide-gray-200">
          <div className="py-4 flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">{formatPrice(order.Subtotal)}</dd>
          </div>
          {/** TODO FHE Shipping */}
          <div className="py-4 flex items-center justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd className="font-medium text-gray-900">
              {isShippingAccurate ? formatPrice(order.ShippingCost) : '---'}
            </dd>
          </div>
          {/** TODO FHE Tax */}
          <div className="py-4 flex items-center justify-between">
            <dt className="text-gray-600">Tax</dt>
            <dd className="font-medium text-gray-900">
              {isTaxAccurate ? formatPrice(order.TaxCost) : '---'}
            </dd>
          </div>
          {order.PromotionDiscount ? (
            <div className="py-4 flex items-center justify-between">
              <dt className="text-gray-600">Promotion discount</dt>
              <dd className="font-medium text-gray-900">{formatPrice(-order.PromotionDiscount)}</dd>
            </div>
          ) : null}
          <div className="py-4 flex items-center justify-between">
            <dt className="text-base font-medium text-theme1-dark">Order total</dt>
            <dd className="text-base font-medium text-theme1-dark">{formatPrice(order.Total)}</dd>
          </div>
          {payments &&
            payments.map((p) => (
              <div className="py-4 flex items-center justify-between" key={p.ID}>
                <dt className="text-base text-theme1-dark">{`${p.Type} Payment`}</dt>
                <dd className="text-base text-theme1-dark">{formatPrice(-p.Amount)}</dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  ) : null
}

export default OcCheckoutSummary
