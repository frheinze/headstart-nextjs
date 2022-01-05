import Head from 'next/head'
import { FunctionComponent } from 'react'

import OcHeader from '../ordercloud/components/baselayout/OcHeader'
import OcFooter from '../ordercloud/components/baselayout/OcFooter'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>React/TailwindCSS Headstart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <OcHeader />
      
      <main>{children}</main>

      <OcFooter />

    </>
  )
}

export default Layout
