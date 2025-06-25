import AllTasks from '@/components/Admin/AllTasks';
import Header from '@/components/Header'
import AdminSideBar from '@/components/SideBar';
import React from 'react'

const PM_TaskPage = () => {
  return (
    <div>
         <div className=" bg-gray-50">
      <Header />


      <div className="w-screen min-h-screen flex  ">

        <div className="w-64 bg-white p-4">
          <AdminSideBar />
        </div>


        <div className="flex-1  border-gray-200 bg-white p-8 rounded shadow mt-14 " >


          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Task:
          </h1>
          <p className='text-gray-600 font-medium'>Admin can add,delete and Update Tasks...</p>
 

       
        <AllTasks/>


        </div>

      </div>




    </div>
    </div>
  )
}

export default PM_TaskPage