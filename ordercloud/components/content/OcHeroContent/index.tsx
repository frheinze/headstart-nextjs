import { FunctionComponent } from 'react'

/**
 * Tailwind component:
 * https://tailwindui.com/components/marketing/sections/heroes#component-6364cb4174b8dfdfbd7fa71ac72ab862
 */

export interface OcHeroContentProps {
  title: string
  subtitle?: string
  imageUrl?: string
}

const OcHeroContent: FunctionComponent<OcHeroContentProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="max-w-full text-white">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={
              imageUrl
                ? imageUrl
                : 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            alt=""
          />
          <div className="absolute inset-0 bg-gray-400 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="container mx-auto">
          <div className="md:px-10">
            <div className="relative mx-auto py-24 sm:py-32 px-4 sm:px-8 lg:px-10">
              <h1>
                <span className="block text-base text-theme1 font-bold tracking-wide uppercase">
                  {subtitle}
                </span>
                <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {title}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OcHeroContent
