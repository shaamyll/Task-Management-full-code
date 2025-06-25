import React from 'react'
import Header from '@/components/Header'
import AdminSideBar from '@/components/SideBar';

const Assignments = () => {
  return (
    <div>
        <div>
         <div className=" bg-gray-50">
      <Header />


      <div className="w-screen min-h-screen flex  ">

        <div className="w-64 bg-white p-4">
          <AdminSideBar />
        </div>


        <div className="flex-1  border-gray-200 bg-white p-8 rounded shadow mt-14 " >


          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Assign Tasks to Users..
          </h1>
          <p>Project Manager assign Tasks to the Users</p>


    


        </div>

      </div>




    </div>
    </div>
    </div>
  )
}

export default Assignments