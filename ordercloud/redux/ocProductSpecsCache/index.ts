import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Spec, Me, RequiredDeep } from 'ordercloud-javascript-sdk'
import { createOcAsyncThunk } from '../ocReduxHelpers'
import { OcRootState } from '../ocStore'

export interface ProductSpecsResult {
  productId: string
  specs: RequiredDeep<Spec>[]
}

export const ocProductSpecsAdapter = createEntityAdapter<RequiredDeep<ProductSpecsResult>>({
  selectId: (p) => p.productId,
})

export const ocProductSpecsCacheSelectors = ocProductSpecsAdapter.getSelectors<OcRootState>(
  (s) => s.ocProductSpecsCache
)

export const getProductSpecs = createOcAsyncThunk<RequiredDeep<ProductSpecsResult>, string>(
  'ocProductSpecs/get',
  async (productId, ThunkAPI) => {
    let productSpecs = ocProductSpecsCacheSelectors.selectById(ThunkAPI.getState(), productId)    
    if(!productSpecs)
    {
      const response = await Me.ListSpecs(productId, { pageSize: 100 })
      productSpecs = { productId: productId, specs: response.Items }
    }
    return productSpecs;
  }
)

const ocProductSpecsCacheSlice = createSlice({
  name: 'ocProductSpecs',
  initialState: ocProductSpecsAdapter.getInitialState(),
  reducers: {
    cleanProductSpecsCache: (state) => {
      ocProductSpecsAdapter.removeAll(state)
    },
    cacheProductSpecs: (state, action: PayloadAction<RequiredDeep<ProductSpecsResult>>) => {
      ocProductSpecsAdapter.upsertOne(state, action)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductSpecs.fulfilled, (state, action) => {
      ocProductSpecsAdapter.upsertOne(state, action)
    })
  },
})

export const { cacheProductSpecs, cleanProductSpecsCache } = ocProductSpecsCacheSlice.actions

export default ocProductSpecsCacheSlice.reducer
