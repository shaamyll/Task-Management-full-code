import Header from '@/components/Header'
import DeveloperTaskCard from '@/Pages/Developer/DeveloperTaskCard'

const DeveloperDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 border border-black">
      <Header />

      <div className="mx-10 mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My Projects</h1>
          <p className="text-gray-600">
            Developers can update status and comment on their tasks.
          </p>
        </div>
      </div>

      <div>
        <DeveloperTaskCard/>
      </div>
    </div>
  )
}

export default DeveloperDashboard
