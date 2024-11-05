import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const Active = () => {
  const {user} = useContext(AuthContext);
  // console.log(user)
  return (
<div className="contacts shadow-md flex flex-col justify-between gap-3 py-2 rounded-md border border-gray-400">
  <h1 className="text-2xl px-4 ">Contacts</h1>
  <div className="flex justify-between px-4 ">
    <h1>Name</h1>
    <h3 className="font-normal">Tariq Ahmed</h3>
  </div>
  <span className="w-[90%] h-[2px] bg-[#725b5b] block mx-auto"></span>
  <div className="flex justify-between px-4">
    <h1>Email</h1>
    <h3 className="font-normal">{user?.email}</h3>
  </div>
  <span className="w-[90%] h-[2px] bg-[#725b5b] block mx-auto"></span>
  <div className="flex justify-between px-4">
    <h1>Mobile Number:</h1>
    <h3 className="font-normal">3420198090</h3>
  </div>
  <span className="w-[90%] h-[2px] bg-[#725b5b] block mx-auto"></span>
  <div className="flex justify-between px-4 flex-wrap">
    <h1>Address</h1>
    <h3 className="font-normal">Naveed Sodho house mithi sindh tharpakar Pakistan</h3>
  </div>
</div>
  )
}

export default Active
