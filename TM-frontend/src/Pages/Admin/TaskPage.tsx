import AdminSideBar from '@/components/SideBar'
import AllTasks from '@/components/Admin/AllTasks'
import Header from '@/components/Header'

function TaskPage() {
  return (
    <div>
        <div className=" bg-gray-50">
      <Header />


      <div className="w-screen min-h-screen flex  ">

        <div className="w-64 bg-white p-4">
          <AdminSideBar />
        </div>


        <div className="flex-1  border-gray-200 bg-white p-8 rounded shadow mt-12" >


          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Tasks
          </h1>
          <p>Admin can create,delete Tasks..</p>


          
          <AllTasks/>




        </div>

      </div>




    </div>
    </div>
  )
}

export default TaskPage