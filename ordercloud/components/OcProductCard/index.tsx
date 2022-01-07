import Link from 'next/link'
import { BuyerProduct, } from 'ordercloud-javascript-sdk'
import { FunctionComponent, } from 'react'
import formatPrice from '../../utils/formatPrice'
import useOcProductSpecs from '../../hooks/useOcProductSpecs'
import shopConfig from '../../../shopConfig.json'

interface OcProductCardProps {
  product: BuyerProduct
}

const OcProductCard: FunctionComponent<OcProductCardProps> = ({ product }) => {
  const specs = useOcProductSpecs(product.ID)
  const colorSpec = specs?specs.find((s) => s.xp.Type==shopConfig.SpecTypes.Color) : null

  let colors: {};
  if (colorSpec) {
    colorSpec.Options.map((o) => {
      colors = colors ? (colors += '-' + o.Value) : o.Value
    })
  }

  return (
    <div className="group relative">
      
      <div className="w-full bg-theme1-pastel rounded-md overflow-hidden group-hover:opacity-75 h-56 lg:h-72 xl:h-80">
        {product.xp && product.xp.images && product.xp.images[0] ? (
          <img
            src={product.xp.images[0].url}
            alt={product.xp.images[0].alt}
            className="w-full h-full object-center object-cover"
          />
        ) : null}
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-theme1-dark font-medium">
            <Link href={`/products/${product.ID}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.Name}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{colors}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(product?.PriceSchedule?.PriceBreaks[0].Price)}
        </p>
      </div>
    </div>
  )
}

export default OcProductCard
