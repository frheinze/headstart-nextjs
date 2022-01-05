import { Spec } from 'ordercloud-javascript-sdk'
import { useEffect } from 'react'
import { useOcDispatch, useOcSelector } from '../redux/ocStore'
import { ocProductSpecsCacheSelectors, getProductSpecs } from '../redux/ocProductSpecsCache'

const useOcProductSpecs = (productId: string): Spec[] => {
  const dispatch = useOcDispatch()

  const { specs, isAuthenticated } = useOcSelector((s) => ({
    isAuthenticated: s.ocAuth.isAuthenticated,
    specs: ocProductSpecsCacheSelectors.selectById(s, productId),
  }))

  useEffect(() => {
    if (isAuthenticated && (!specs || specs.productId !== productId)) {
      dispatch(getProductSpecs(productId))
    }
  }, [isAuthenticated, dispatch, specs, productId])

  return specs?specs.specs:null
}

export default useOcProductSpecs
