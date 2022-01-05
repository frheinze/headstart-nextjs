import { FunctionComponent } from 'react'
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder'
import OcLineItemCard from '../OcLineItemCard'
import OcInfo from '../content/OcInfo'

interface OcLineItemListProps {
  emptyMessage?: string
  editable?: boolean
}

const OcLineItemList: FunctionComponent<OcLineItemListProps> = ({ emptyMessage, editable }) => {
  const { lineItems } = useOcCurrentOrder()

  return lineItems && lineItems.length ? (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto py-10 px-4 sm:py-18 sm:px-6 lg:px-8">
        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {lineItems.map((lineItem) => (
            <OcLineItemCard lineItem={lineItem} editable={editable} key={lineItem.ID} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <OcInfo message={emptyMessage} />
  )
}

export default OcLineItemList
