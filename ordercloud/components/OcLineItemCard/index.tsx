import Link from 'next/link'
import { LineItem } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useCallback, useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import useOcProduct from '../../hooks/useOcProduct'
import { removeLineItem, updateLineItem } from '../../redux/ocCurrentOrder'
import formatPrice from '../../utils/formatPrice'
import shopConfig from '../../../shopConfig.json'
import useOcProductSpecs from '../../hooks/useOcProductSpecs'

interface OcLineItemCardProps {
  lineItem: LineItem
  editable?: boolean
}

const OcLineItemCard: FunctionComponent<OcLineItemCardProps> = ({ lineItem, editable }) => {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [quantity, setQuantity] = useState(lineItem.Quantity)

  const product = useOcProduct(lineItem.ProductID)

  const handleRemoveLineItem = useCallback(async () => {
    setDisabled(true)
    dispatch(removeLineItem(lineItem.ID))
    setDisabled(false)
  }, [dispatch, lineItem])

  const updateQuantity = (value) => {
    let valueNumber: number = value
    setQuantity(valueNumber)

    setDisabled(true)
    dispatch(updateLineItem({ ...lineItem, Quantity: valueNumber }))
    setDisabled(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuantity(Number(e.target.value))
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateQuantity(Number(e.target.value))
  }

  /** not the smartest solution, but works for now */
  const prodSpecs = useOcProductSpecs(lineItem.ProductID)
  const colorSpec = prodSpecs?prodSpecs.find((s) => s.xp.Type==shopConfig.SpecTypes.Color) : null  
  const nameOfColor = colorSpec && lineItem.Specs ? lineItem.Specs.find((s) => s.SpecID == colorSpec.ID).Value : null

  return (
    <li key={lineItem.ID} className="flex py-4 sm:py-10">
      <div className="flex-shrink-0">
        {lineItem.Product.xp && lineItem.Product.xp.images && lineItem.Product.xp.images[0] ? (
          <img
            src={lineItem.Product.xp.images[0].url}
            alt={lineItem.Product.xp.images[0].alt}
            className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
          />
        ) : null}
      </div>

      <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm">
                <Link href={`/products/${lineItem.Product.ID}`}>
                  <a className="font-medium text-theme1-dark hover:text-theme1-dark">
                    {lineItem.Product.Name}
                  </a>
                </Link>
              </h3>

              <p className="mt-1 text-sm text-gray-500">{nameOfColor}</p>
            </div>

            <p className="text-sm font-medium text-gray-900 text-right">
              {formatPrice(lineItem.LineTotal)}
            </p>
          </div>

          {editable && product ? (
            <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
              <div>
                <label htmlFor={lineItem.ID} className="sr-only">
                  Quantity, {product.Name}
                </label>
                {product.PriceSchedule.RestrictedQuantity ? (
                  <select
                    onChange={handleSelectChange}
                    id={lineItem.ID}
                    name={lineItem.Product.Name}
                    className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-theme1-light focus:border-theme1-light sm:text-sm"
                  >
                    {product.PriceSchedule.PriceBreaks.map((pb) => (
                      <option key={pb.Quantity} value={pb.Quantity}>
                        {pb.Quantity}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={lineItem.ID}
                    disabled={disabled}
                    type="number"
                    min={product.PriceSchedule.MinQuantity}
                    max={product.PriceSchedule.MaxQuantity}
                    step={1}
                    value={quantity}
                    onChange={handleInputChange}
                    className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-theme1-light focus:border-theme1-light sm:text-sm"
                  />
                )}
              </div>

              <button
                type="button"
                disabled={disabled}
                onClick={handleRemoveLineItem}
                className="ml-4 text-sm font-medium text-theme2 hover:text-theme2-dark sm:ml-0 sm:mt-3"
              >
                <span>Remove</span>
              </button>
            </div>
          ) : null}

          {/* TODO Stock*/}
          {/* <p className="mt-4 flex text-sm text-gray-700 space-x-2">
              {product.inStock ? (
                <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
              ) : (
                <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
              )}

              <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
            </p> */}
        </div>
      </div>
    </li>
  )
}

export default OcLineItemCard
