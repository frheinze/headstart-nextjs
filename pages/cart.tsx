import { FunctionComponent } from 'react'
import OcLineItemList from '../ordercloud/components/OcLineItemList'
import Link from 'next/link'
import OcHeroContent from '../ordercloud/components/content/OcHeroContent'
import OcCheckoutSummary from '../ordercloud/components/OcCheckout/OcCheckoutSummary'
import { useOcSelector } from '../ordercloud/redux/ocStore'

const CartPage: FunctionComponent = () => {
  const { order } = useOcSelector((s) => s.ocCurrentOrder)

  return (
    <>
      <OcHeroContent
        title="Shopping Cart"
        imageUrl="https://images.unsplash.com/photo-1565688842882-e0b2693d349a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      />

      <OcLineItemList emptyMessage="Your shopping cart is empty." editable />

      {/* Order summary */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:py-18 sm:px-6 lg:px-8 te">
          <div className="mt-10 sm:ml-16 sm:mr-16 sm:pl-6 t">
            {order ? (
              <>
                <OcCheckoutSummary />

                <div className="mt-10">
                  <Link href="/checkout">
                    <button className="w-full bg-theme1 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-theme1-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-theme1">
                      Checkout
                    </button>
                  </Link>
                </div>

                <div className="mt-6 text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/products">
                      <a className="text-theme1 font-medium hover:text-theme1-light">
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </a>
                    </Link>
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage
