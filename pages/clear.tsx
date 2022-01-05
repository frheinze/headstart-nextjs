import { FunctionComponent } from 'react'
import OcHeroContent from '../ordercloud/components/content/OcHeroContent'
import OcInfo from '../ordercloud/components/content/OcInfo'
import { deleteCurrentOrder } from '../ordercloud/redux/ocCurrentOrder'
import { useOcDispatch } from '../ordercloud/redux/ocStore'

const ClearCartPage: FunctionComponent = () => {
  const dispatch = useOcDispatch()

  dispatch(deleteCurrentOrder())

  return (
    <>
      <OcHeroContent
        title="Shopping Cart"
        imageUrl="https://images.unsplash.com/photo-1565688842882-e0b2693d349a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      />
      <OcInfo message="Shopping cart cleared." />
    </>
  )
}

export default ClearCartPage
