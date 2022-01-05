// import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcHeroContent from '../../ordercloud/components/content/OcHeroContent'
import OcInfo from '../../ordercloud/components/content/OcInfo'
import OcProductDetail from '../../ordercloud/components/OcProductDetail'
import useOcProduct from '../../ordercloud/hooks/useOcProduct'

const ProductPage: FunctionComponent = () => {
  const { isReady, query } = useRouter()

  const productId = query.productid as string
  const product = useOcProduct(productId)

  return product && isReady ? (
    <>
      <OcHeroContent title={product.Name} subtitle="Product:" />
      <OcProductDetail product={product} />
    </>
  ) : (
    <OcInfo />
  )
}

export default ProductPage
