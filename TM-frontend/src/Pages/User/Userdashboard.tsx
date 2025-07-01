import Header from '@/components/Header'
import UserTaskcard from './UserTaskCard'


const Userdashboard = () => {


  return (
      <div className='w-full'>

      <div>
        <Header />
      </div>        
<br />
      <div className='mt-14 flex items-center justify-between mx-10'>
          

     <div>
         <p className='text-3xl'>Tasks:</p>
      <p>Kanban-style task board: </p>
     </div>

      </div>

    
     <UserTaskcard/>
    </div>  
  )
}

export default Userdashboard
