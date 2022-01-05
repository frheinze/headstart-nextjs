import { Filters } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useCallback } from 'react'
import OcHeroContent from '../ordercloud/components/content/OcHeroContent'
import OcInfo from '../ordercloud/components/content/OcInfo'
import OcProductFacetForm from '../ordercloud/components/OcProductFacetsForm'
import OcProductList from '../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../ordercloud/hooks/useNextRouterMapping'

const queryMap: NextQueryMap = {
  search: 's',
  page: 'p',
  pageSize: 'ps',
  searchOn: 'so',
  sortBy: 'o',
  'xp.size': 'size',
  'xp.color': 'color',
  'xp.test_boolean': 'bool',
  'xp.test_number': 'num',
}

const ProductListPage: FunctionComponent = () => {
  const { isReady, options, updateQuery } = useNextRouterMapping(queryMap)

  const handleFacetChange = useCallback(
    (updatedFilters: Filters) => {
      updateQuery({ ...options, page: undefined, filters: updatedFilters })
    },
    [options, updateQuery]
  )

  return isReady ? (
    <>
      <OcHeroContent title="Search (TBD)" subtitle="Product" />
      <OcProductFacetForm onChange={handleFacetChange} />
      <OcProductList options={options} />
    </>
  ) : (
    <OcInfo />
  )
}

export default ProductListPage
