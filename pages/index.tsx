import { FunctionComponent } from 'react'
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from '@heroicons/react/outline'
import OcFeatureTeaser from '../ordercloud/components/content/OcFeatureTeaser'
import OcHeroCTA from '../ordercloud/components/content/OcHeroCTA'

const Home: FunctionComponent = () => {
  const features = [
    {
      name: 'Tailwind SS',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: GlobeAltIcon,
      href: 'https://tailwindcss.com',
    },
    {
      name: 'Next.js Headstart of Sitcore',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: ScaleIcon,
      href: 'https://github.com/ordercloud-api/headstart-nextjs',
    },
    {
      name: 'Sitecore OrderCloud',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: LightningBoltIcon,
      href: 'https://ordercloud.io',
    },
    {
      name: 'GitHub Repository',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: AnnotationIcon,
      href: 'https://github.com/frheinze/headstart-nextjs',
    },
  ]

  return (
    <>
      <OcHeroCTA
        title="Simple"
        titleHighlight="Demo Shop"
        description="So far you can test: list products, show product detail page (including optional color selection and ability to add products to cart), show and edit cart (basics only)."
        imageUrl="https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        actionLeftUrl="/products"
        actionLeftText="Show products"
        actionRightUrl="/products/BAG1"
        actionRightText="Favorite product"
      />
      <OcFeatureTeaser
        title="OrderCloud - Next.js - Tailwind CSS"
        subtitle="Build with"
        description="This project is based on Sitecore's official Next.js headstart solution, but dressed up with TailwindCSS."
        features={features}
      />
    </>
  )
}

export default Home
