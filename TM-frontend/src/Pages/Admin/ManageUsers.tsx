import AdminSideBar from '@/components/Admin/AdminSideBar';
import AllUsers from '@/components/Admin/AllUsers';
import Header from '@/components/Header';



function ManageUsers() {


  return (
    <div className=" bg-gray-50">
      <Header />


      <div className="w-screen min-h-screen flex  mt-12 ">

        <div className="w-64 bg-white p-4">
          <AdminSideBar />
        </div>


        <div className="flex-1  border-gray-200 bg-white p-8 rounded shadow " >


          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Users List
          </h1>
          <p>Admin can add,delete and assign roles to the Users</p>


       
        <AllUsers/>


        </div>

      </div>




    </div>
  );
}

export default ManageUsers;
