import { FunctionComponent } from 'react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useOcDispatch, useOcSelector } from '../../../redux/ocStore'
import Link from 'next/link'
import logout from '../../../redux/ocAuth/logout'
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react'

/**
 * Tailwind components:
 * https://tailwindui.com/components/ecommerce/components/store-navigation#component-bbfaffb883e108073b3253d5c42f479f
 * https://tailwindui.com/components/application-ui/navigation/navbars#component-9dd6cc41ada513726b95c80033e90a74
 */

export interface OcHeaderProps {}

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Cart', href: '/cart' },
  { name: 'Search', href: '/search' },
  { name: 'X', href: '/clear' },
]

const OcHeader: FunctionComponent<OcHeaderProps> = () => {
  const router = useRouter()
  const dispatch = useOcDispatch()
  const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
    user: s.ocUser.user,
    loading: s.ocAuth.loading,
    isAnonymous: s.ocAuth.isAnonymous,
    lineItemCount: s.ocCurrentOrder.order ? s.ocCurrentOrder.order.LineItemCount : 0,
  }))

  return (
    <header>
      <div className="bg-white">
        <Disclosure as="nav" aria-label="Main" className="">
          {({ open }) => (
            <>
              <div className="container mx-auto flex justify-between h-16">
                {/* Burger Navi */}
                <div className="flex md:hidden">
                  <Disclosure.Button
                    className="inline-flex items-center justify-center p-2 text-gray-500"
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                  >
                    <span className="sr-only">Open main menu</span>
                    {!open ? (
                      <MenuIcon className="menu-icon block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <XIcon className="x-icon block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <div className="flex items-center ml-2 ">
                  <a className="overflow-hidden w-10 md:w-auto" href="/">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=orange&shade=400"
                      alt=""
                    />
                  </a>
                </div>

                {/* Main Navi */}
                <div className="space-x-4 hidden md:flex">
                  {navigation.map((n) => (
                    <Link href={n.href} key={n.name}>
                      <a
                        className={
                          'inline-flex items-center px-1 pt-1 text-base font-medium text-gray-500 border-b-2 ' +
                          (router.pathname.startsWith(n.href)
                            ? 'border-theme2-dark'
                            : 'border-transparent hover:border-theme1 hover:text-gray-700')
                        }
                      >
                        {n.name}
                      </a>
                    </Link>
                  ))}
                </div>

                {/* Icon Navi */}
                <div className="flex items-center mr-2">
                  {/* Search */}
                  <Link href="/products">
                    <a className="p-2 text-gray-500">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </Link>

                  {/* Account */}
                  {isAnonymous || !user ? (
                    <Link href="/login">
                      <a className="p-2 text-gray-500">
                        <span className="sr-only">Login</span>
                        <UserIcon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => dispatch(logout())}
                      className="group p-2 flex items-center"
                    >
                      <span className="sr-only">Logout</span>
                      <UserIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        {user.FirstName.charAt(0) + '' + user.LastName.charAt(0)}
                      </span>
                    </button>
                  )}

                  {/* Cart */}
                  <Link href="/cart">
                    <a className="group p-2 flex items-center">
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        {lineItemCount}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>
              </div>

              <Disclosure.Panel>
                <div className="container mx-auto md:hidden">
                  <div className="pt-2 pb-3 space-y-1 w-auto">
                    {navigation.map((n) => (
                      <Disclosure.Button
                        as="a"
                        href="#"
                        key={n.name}
                        className="bg-theme1-pastel border-theme1 text-theme1 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      >
                        {n.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </header>
  )
}

export default OcHeader
