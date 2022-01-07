import { xor } from 'lodash'
import { FunctionComponent, useCallback } from 'react'

interface OcProductFacetFieldProps {
  count: number
  selected: string[]
  valueId: string
  value: string
  onChange: (updated: string[]) => void
}

const OcProductFacetField: FunctionComponent<OcProductFacetFieldProps> = ({
  valueId,
  count,
  selected,
  value,
  onChange,
}) => {
  const handleCheckboxChange = useCallback(() => {
    onChange(xor(selected, [value]))
  }, [selected, onChange, value])

  return (
    <div key={valueId} className="flex items-center">
      <input
        id={valueId}
        name={value}
        defaultValue={value}
        type="checkbox"
        className="h-4 w-4 border-gray-300 rounded text-theme1 focus:ring-theme1"
        onChange={handleCheckboxChange}
        checked={selected.includes(value)}
      />
      <label
        htmlFor={valueId}
        className="ml-3 text-sm text-gray-600"
      >
        {`${value} (${count})`}
      </label>
    </div>
  )
}

export default OcProductFacetField
