import Link from 'next/link'
import { FunctionComponent } from 'react'

/**
 * Tailwind component:
 * https://tailwindui.com/components/marketing/sections/heroes#component-6364cb4174b8dfdfbd7fa71ac72ab862
 */

export interface OcHeroCTAProps {
  title: string
  titleHighlight?: string
  description: string
  imageUrl?: string
  actionLeftUrl?: string
  actionLeftText?: string
  actionRightUrl?: string
  actionRightText?: string
}

const OcHeroCTA: FunctionComponent<OcHeroCTAProps> = ({
  title,
  titleHighlight,
  description,
  imageUrl,
  actionLeftUrl,
  actionLeftText,
  actionRightUrl,
  actionRightText,
}) => {
  return (
    <div className="container mx-auto ">
      <div className="pt-6">
        <div className="bg-white">
          <div className="relative sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={
                  imageUrl
                    ? imageUrl
                    :'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }
                alt={title}
              />
              <div className="absolute inset-0 bg-gray-400 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">{title}</span>
                <span className="block text-theme2-pastel">{titleHighlight}</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-theme1-pastel sm:max-w-3xl">
                {description}
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  {actionLeftUrl && actionLeftText ? (
                    <Link href={actionLeftUrl}>
                      <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-theme1-dark bg-theme2 hover:bg-indigo-50 sm:px-8">
                        {actionLeftText}
                      </a>
                    </Link>
                  ) : null}
                  {actionRightUrl && actionRightText ? (
                    <Link href={actionRightUrl}>
                      <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-theme1 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                        {actionRightText}
                      </a>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OcHeroCTA
