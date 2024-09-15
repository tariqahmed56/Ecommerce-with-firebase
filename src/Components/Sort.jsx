import React from 'react'

const Sort = () => {
  return (
    <select className='bg-gray-300 px-3 py-3 outline-none border cursor-pointer'>
    <option value="Price Low to High"  className='cursor-pointer uppercase'>
        SORT BY
      </option>
    <option value="Price Low to High"  className='cursor-pointer uppercase'>
          PRICE LOW TO HIGH
      </option>
      <option value="Price High to Low" className='cursor-pointer uppercase'>
       PRICE HIGH TO LOW
      </option>
     
      <option value="Date Old To New" className='cursor-pointer'>
      DATE OLD TO NEW
      </option>
      <option value="Date New To Old" className='cursor-pointer'>
        DATE NEW TO OLD
      </option>
    </select>
  )
}

export default Sort
