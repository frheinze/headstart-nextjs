import { FunctionComponent } from 'react'
import OcHeroContent from '../../ordercloud/components/content/OcHeroContent'
import OcProductList from '../../ordercloud/components/OcProductList'
import useNextRouterMapping, { NextQueryMap } from '../../ordercloud/hooks/useNextRouterMapping'

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
  const { options } = useNextRouterMapping(queryMap)

  return (
    <>
      <OcHeroContent title="Products" subtitle="All" />
      <OcProductList options={options} />
    </>
  )
}

export default ProductListPage
