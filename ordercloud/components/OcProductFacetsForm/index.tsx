import { Dialog, Transition } from '@headlessui/react'
import {  PlusSmIcon,  XIcon } from '@heroicons/react/outline'
import { isNil, mapKeys, mapValues, omitBy } from 'lodash'
import { Filters, ListFacet } from 'ordercloud-javascript-sdk'
import {
  FormEvent,
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useOcSelector } from '../../redux/ocStore'
import OcProductFacet from './OcProductFacet'
import OcProductFacetMobile from './OcProductFacetMobile'

/**
 * Tailwind component:
 * https://tailwindui.com/components/ecommerce/components/category-filters#component-948dd4ebccc4d262d38cce4e7e638c7e
 */

export interface OcProductFacetsFormProps {
  onChange: (filters: { [x: string]: string }) => void
}

function mapOptionFilters(filters?: Filters): { [x: string]: string[] | undefined } {
  if (!filters) return {}
  return mapValues(
    mapKeys(omitBy(filters, isNil), (v, k: string) => k.toLowerCase()),
    (v) => {
      return typeof v === 'string' ? v.split('|') : [String(v)]
    }
  )
}

const OcProductFacetsForm: FunctionComponent<OcProductFacetsFormProps> = ({ onChange }) => {
  const { options, meta, loading } = useOcSelector((s) => s.ocProductList)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [filters, setFilters] = useState(mapOptionFilters(options && options.filters))

  const showClearButton = useMemo(() => {
    return Boolean(Object.values(filters).join('').length)
  }, [filters])

  const shouldClearCallOnChange = useMemo(() => {
    return Boolean(Object.values(mapOptionFilters(options && options.filters)).join('').length)
  }, [options])

  const handleClearFilters = useCallback(() => {
    setFilters({})
    if (shouldClearCallOnChange) {
      onChange({})
    }
  }, [onChange, shouldClearCallOnChange])

  useEffect(() => {
    setFilters(mapOptionFilters(options && options.filters))
  }, [options])

  const handleFacetChange = useCallback((xpPath: string, newValue: string[]) => {
    setFilters((f) => {
      return f ? { ...f, [`xp.${xpPath}`]: newValue } : { [`xp.${xpPath}`]: newValue }
    })
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      onChange(mapValues(filters, (v) => v && v.join('|')))
      if(mobileFiltersOpen){
        setMobileFiltersOpen(false)
      }
    },
    [onChange, filters]
  )

  const mapProductFacets = useCallback(
    (f: ListFacet, i: number) => {
      return (
        <OcProductFacet
          key={f.XpPath}
          facet={f}
          values={filters[`xp.${f.XpPath}`] || []}
          onChange={handleFacetChange}
          pos={i}
        />
      )
    },
    [handleFacetChange, filters]
  )

  const mapProductFacetsMobile = useCallback(
    (f: ListFacet) => {
      return (
        <OcProductFacetMobile
          key={f.XpPath}
          facet={f}
          values={filters[`xp.${f.XpPath}`] || []}
          onChange={handleFacetChange}
        />
      )
    },
    [handleFacetChange, filters]
  )

  return meta && meta.Facets.length > 0 ? (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4" onSubmit={handleSubmit}>
                {meta &&
                  meta.Facets &&                  
                  meta.Facets.map((facetlist) => mapProductFacetsMobile(facetlist))}
                   <div className="px-4 ">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-theme1 border border-transparent rounded-md shadow-sm py-2 px-4 text-base text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
                >
                  Apply
                </button>
                {showClearButton && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleClearFilters}
                    className="mt-4 ml-1 bg-theme1 border border-transparent rounded-md shadow-sm py-2 px-4 text-base text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
                  >
                    Clear
                  </button>
                )}
              </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Default filter dialog */}
      <div className="mt-6 w-60 mr-6">
        <aside>
          <h2 className="sr-only">Filters</h2>
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>

          <div className="hidden md:flex">
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200 space-y-10">
                {meta &&
                  meta.Facets &&
                  meta.Facets.map((facetlist, i) => mapProductFacets(facetlist, i))}
              </div>
              {/* TODO */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-theme1 border border-transparent rounded-md shadow-sm py-2 px-4 text-base text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
                >
                  Apply
                </button>
                {showClearButton && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleClearFilters}
                    className="mt-4 ml-1 bg-theme1 border border-transparent rounded-md shadow-sm py-2 px-4 text-base text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        </aside>
      </div>
    </>
  ) : null
}

export default OcProductFacetsForm
