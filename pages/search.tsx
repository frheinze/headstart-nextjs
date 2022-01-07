import { Filters } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useCallback } from 'react'
import OcHeroContent from '../ordercloud/components/content/OcHeroContent'
import OcProductFacetForm from '../ordercloud/components/OcProductFacetsForm'
import OcProductList from '../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../ordercloud/hooks/useNextRouterMapping'

const queryMap: NextQueryMap = {
  search: 's',
  page: 'p',
  pageSize: 'ps',
  searchOn: 'so',
  sortBy: 'o',
  'xp.colors': 'color',
  'xp.is_new': 'is_new',
}

const ProductListPage: FunctionComponent = () => {
  const { options, updateQuery } = useNextRouterMapping(queryMap)

  const handleFacetChange = useCallback(
    (updatedFilters: Filters) => {
      console.log(options)
      updateQuery({ ...options, page: undefined, filters: updatedFilters })
    },
    [options, updateQuery]
  )

  return (
    <>
      <OcHeroContent title="Search" subtitle="Product" />

      <div className="container mx-auto py-0 sm:py-4 px-4 sm:px-6 lg:px-8 md:flex">
        <OcProductFacetForm onChange={handleFacetChange} />
        <OcProductList options={options} standalone={false} />    
      </div>
    </>
  )
}

export default ProductListPage
