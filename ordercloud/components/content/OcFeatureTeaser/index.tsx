import { FunctionComponent } from 'react'

/**
 * Tailwind component:
 * https://tailwindui.com/components/marketing/sections/feature-sections#component-64ac58e032276db96bf343a8d4f332a8
 */

export interface OcFeatureTeaserProps {
  title: string
  subtitle: string
  description: string
  features: {
    name: string
    description: string
    icon: JSX.Element
    href: string
  }[]
}

const OcFeatureTeaser: FunctionComponent<OcFeatureTeaserProps> = ({
  title,
  description,
  subtitle,
  features,
}) => {
  return (
    <div className="container mx-auto ">
      <div className="pt-6">
        <div className="bg-white py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-theme1 font-semibold tracking-wide uppercase">
                {subtitle}
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">{description}</p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <a href={feature.href} target="_blank">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-theme1 text-white">
                          <feature.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                    </a>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OcFeatureTeaser
