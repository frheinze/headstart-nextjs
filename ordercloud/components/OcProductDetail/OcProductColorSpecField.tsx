import { Spec } from 'ordercloud-javascript-sdk'
import { FunctionComponent, useState } from 'react'
import { RadioGroup } from '@headlessui/react'

interface OcProductColorSpecFieldProps {
  colorSpec: Spec
  selectedValue: string
  onChange: (values: { SpecID: string; OptionID: string }) => void
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const OcProductColorSpecField: FunctionComponent<OcProductColorSpecFieldProps> = ({
  colorSpec,
  selectedValue,
  onChange,
}) => {
  let [color, setColor] = useState(selectedValue)

  const handleSelectChange = (value) => {
    onChange({
      SpecID: colorSpec.ID,
      OptionID: value,
    })
    setColor(value)
  }

  return (
    <div>
      <h3 className="text-sm text-gray-600">Color</h3>
      <RadioGroup value={color} onChange={handleSelectChange} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {colorSpec.Options.map((option) => (
            <RadioGroup.Option
              key={option.Value}
              value={option.ID}
              className={({ active, checked }) =>
                classNames(
                  "ring-gray-300",
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                )
              }
            >
              <RadioGroup.Label as="p" className="sr-only">
                {option.Value}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                className={classNames(
                  'h-8 w-8 border border-black border-opacity-10 rounded-full',
                  (option.xp && option.xp.cssColor)?option.xp.cssColor:"bg-yellow-400"
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default OcProductColorSpecField