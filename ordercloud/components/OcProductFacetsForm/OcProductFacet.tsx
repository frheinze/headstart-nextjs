import { ListFacet } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import OcProductFacetField from './OcProductFacetField'

interface OcProductFacetProps {
  facet: ListFacet
  values: string[] | undefined
  onChange: (xpPath: string, newValues?: string[]) => void
  pos: number
}

const OcProductFacet: FunctionComponent<OcProductFacetProps> = ({ facet, values, onChange, pos }) => {
  const handleChange = (updated: string[]) => {
    onChange(facet.XpPath, updated)
  }
  return (
    <div key={facet.Name} className={pos === 0 ? null : 'pt-4'}>
     <fieldset>
       <legend className="block text-sm font-medium text-gray-700">
         {facet.Name}
       </legend>
       <div className="pt-6 space-y-3">
        {facet.Values.map((v) => {
          const valueId = `${facet.XpPath}_${v.Value}`
          return (
            <OcProductFacetField
              onChange={handleChange}
              key={valueId}
              valueId={valueId}
              value={v.Value}
              count={v.Count}
              selected={values}
            />
          )
        })}
       </div>
     </fieldset> 
   </div>
  )}

export default OcProductFacet
