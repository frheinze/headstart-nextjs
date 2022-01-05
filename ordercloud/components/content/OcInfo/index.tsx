import { FunctionComponent } from 'react'

export interface OcInfoProps {
  message?: string
}

const OcInfo: FunctionComponent<OcInfoProps> = ({ message }) => {
  return (
    <div className="container mx-auto ">
      <div className="pt-6 py-6">
        <div className="bg-white">
          <h2>{message}</h2>
        </div>
      </div>
    </div>
  )
}

export default OcInfo
