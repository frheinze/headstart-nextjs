import { BuyerProduct, Spec } from 'ordercloud-javascript-sdk'
import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { createLineItem } from '../../redux/ocCurrentOrder'
import { useOcDispatch } from '../../redux/ocStore'
import formatPrice from '../../utils/formatPrice'
import calcPrice from '../../utils/calcPrice'
import OcProductColorSpecField from './OcProductColorSpecField'
import { Disclosure, Tab } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import shopConfig from '../../../shopConfig.json'
import useOcProductSpecs from '../../hooks/useOcProductSpecs'

const placeholder = {
  details: [
    {
      name: 'Features',
      items: ['Lorem ipsum 1', 'Lorem ipsum 2', 'Lorem ipsum 3'],
    },
    {
      name: 'Details',
      items: ['Lorem ipsum 1', 'Lorem ipsum 2', 'Lorem ipsum 3'],
    },
  ],
}

/**
 * Tailwind component:
 * https://tailwindui.com/components/ecommerce/components/product-overviews#component-13a89c2dc50a31afd66541dc28fa3c13
 */

interface OcProductDetailProps {
  product: BuyerProduct
  onLineItemAdded?: () => void
}

const OcProductDetail: FunctionComponent<OcProductDetailProps> = ({ product, onLineItemAdded }) => {
  const dispatch = useOcDispatch()
  const specs = useOcProductSpecs(product.ID)

  const [loading, setLoading] = useState(false)
  const [specValues, setSpecValues] = useState([]) //list with selected specOptions for each spec (for creating LineItems)
  const [quantity] = useState(
    (product && product.PriceSchedule && product.PriceSchedule.MinQuantity) || 1
  )

  const colorSpec = specs ? specs.find((s) => s.xp.Type == shopConfig.SpecTypes.Color) : null

  useEffect(() => {
    if (specs) {
      setSpecValues(
        specs.map((s) => {
          return {
            SpecID: s.ID,
            OptionID: determineDefaultOptionId(s),
          }
        })
      )
    }
  }, [specs])

  const determineDefaultOptionId = (spec: Spec) => {
    if (spec.DefaultOptionID) {
      return spec.DefaultOptionID
    }
    return spec.OptionCount ? spec.Options[0].ID : undefined
  }

  const handleSpecFieldChange = (values: { SpecID: string; OptionID: string }) => {
    setSpecValues((newSpec) =>
      newSpec.map((s) => {
        if (s.SpecID === values.SpecID) {
          return {
            SpecID: values.SpecID,
            OptionID: values.OptionID,
          }
        }
        return s
      })
    )
  }

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)
      await dispatch(
        createLineItem({ ProductID: product.ID, Quantity: quantity, Specs: specValues })
      )
      setLoading(false)
      if (onLineItemAdded) {
        onLineItemAdded()
      }
    },
    [dispatch, product, quantity, onLineItemAdded, specValues]
  )

  function classNames(...classes): string {
    return classes.filter(Boolean).join(' ')
  }

  function getPrice(): number {
    if (product?.PriceSchedule?.PriceBreaks && specs) {
      let convertedSpecValues = []
      for (const specValue of specValues) {
        if (specValue) {
          let spec = specs.find((s) => s.ID == specValue.SpecID)
          if (spec) {
            let selectedOption = spec.Options.find((o) => o.ID === specValue.OptionID)
            convertedSpecValues.push(selectedOption)
          }
        }
      }
      return calcPrice(product.PriceSchedule.PriceBreaks, convertedSpecValues, quantity)
    }
  }

  return product ? (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-10 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.xp &&
                  product.xp.images &&
                  product.xp.images.map((image, i) => (
                    <Tab
                      key={i}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.alt}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img
                              src={image.url}
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-gray-300' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {product.xp &&
                product.xp.images &&
                product.xp.images.map((image, i) => (
                  <Tab.Panel key={i}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{formatPrice(getPrice())}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.Description }}
              />
            </div>

            <form className="mt-6" onSubmit={handleAddToCart}>
              {colorSpec ? (
                <OcProductColorSpecField
                  colorSpec={colorSpec}
                  selectedValue={determineDefaultOptionId(colorSpec)}
                  onChange={handleSpecFieldChange}
                />
              ) : null}

              <div className="mt-10 flex sm:flex-col1">
                <button
                  type="submit"
                  disabled={loading || !product.PriceSchedule}
                  className={classNames(
                    loading || !product.PriceSchedule
                      ? 'bg-gray-500 cursor-default'
                      : 'bg-theme1 hover:bg-theme1-light',
                    'max-w-xs flex-1 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1 sm:w-full'
                  )}
                >
                  Add to bag
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                {placeholder.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                            <span
                              className={classNames(
                                open ? 'text-theme1' : 'text-gray-900',
                                'text-sm font-medium'
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="block h-6 w-6 text-theme1 group-hover:text-theme1-light"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default OcProductDetail
