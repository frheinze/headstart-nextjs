import { FunctionComponent } from 'react'
import useOcProductList from '../../hooks/useOcProductList'
import { OcProductListOptions } from '../../redux/ocProductList'
import OcProductCard from '../OcProductCard'

/**
 * Tailwind component:
 * https://tailwindui.com/components/ecommerce/components/product-lists#component-adec20dfa6eac091f5bee40e244c6823
 */

export interface OcProductListProps {
  options?: OcProductListOptions
}

const OcProductList: FunctionComponent<OcProductListProps> = ({ options }) => {
  const products = useOcProductList(options)
  return (
    <div className="container mx-auto py-0 sm:py-4 px-2">
      <div className="bg-white mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {products && products.map((p, i) => <OcProductCard key={i} product={p} />)}
      </div>
    </div>
  )
}

export default OcProductList
