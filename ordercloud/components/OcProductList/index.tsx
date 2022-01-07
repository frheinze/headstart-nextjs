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
  standalone?: boolean
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const OcProductList: FunctionComponent<OcProductListProps> = ({ options, standalone = true }) => {
  const products = useOcProductList(options)
  return (
    <div className={standalone ? 'container mx-auto py-0 sm:py-4 px-4 sm:px-6 lg:px-8' : ''}>
      <div
        className={classNames(
          'grid',
          standalone ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3',
          'bg-white mt-6 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-8'
        )}
      >
        {products && products.map((p, i) => <OcProductCard key={i} product={p} />)}
      </div>
    </div>
  )
}

export default OcProductList
