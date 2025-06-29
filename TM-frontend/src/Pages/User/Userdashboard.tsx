import Header from '@/components/Header'
import TaskCard from '@/components/TaskCard'


const Userdashboard = () => {


  return (
      <div className='w-full'>

      <div>
        <Header />
      </div>        
<br />
      <div className='mt-14 flex items-center justify-between mx-10'>
          

        <p className='text-3xl'>Tasks:</p>


      </div>

    
     <TaskCard/>
    </div>  
  )
}

export default Userdashboard
