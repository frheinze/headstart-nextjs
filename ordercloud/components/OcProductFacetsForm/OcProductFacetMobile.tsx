import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { ListFacet } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import OcProductFacetField from './OcProductFacetField'

interface OcProductFacetMobileProps {
  facet: ListFacet
  values: string[] | undefined
  onChange: (xpPath: string, newValues?: string[]) => void
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const OcProductFacetMobile: FunctionComponent<OcProductFacetMobileProps> = ({
  facet,
  values,
  onChange,
}) => {
  const handleChange = (updated: string[]) => {
    onChange(facet.XpPath, updated)
  }
  return (
    <>
      <Disclosure as="div" key={facet.Name} className="border-t border-gray-200 pt-4 pb-4">
        {({ open }) => (
          <fieldset>
            <legend className="w-full px-2">
              <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                <span className="text-sm font-medium text-gray-700">{facet.Name}</span>
                <span className="ml-6 h-7 flex items-center">
                  <ChevronDownIcon
                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                    aria-hidden="true"
                  />
                </span>
              </Disclosure.Button>
            </legend>
            <Disclosure.Panel className="pt-4 pb-2 px-4">
              <div className="space-y-6">
                {facet.Values.map((v) => {
                  const valueId = `${facet.XpPath}_${v.Value}`
                  return (
                    <OcProductFacetField
                      onChange={handleChange}
                      key={valueId}
                      valueId={valueId}
                      value={v.Value}
                      count={v.Count}
                      selected={values}
                    />
                  )
                })}
              </div>
            </Disclosure.Panel>
          </fieldset>
        )}
      </Disclosure>
    </>
  )
}

export default OcProductFacetMobile
