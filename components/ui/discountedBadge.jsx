import React from 'react'

const DiscountedBadge = ({data}) => {
    if(data.type !== 'PERCENT'){
        return null
    }

  return (
    <div className='text-secondary bg-primary px-2 py-1 text-sm'>
      <strong>{data.value}%</strong> discount
    </div>
  )
}

export default DiscountedBadge
