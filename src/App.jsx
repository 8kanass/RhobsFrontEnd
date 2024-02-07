import { NavBar , Feed } from './components';

const  App = () => {
  return (
  <div className='bg-slate-100 w-full  overflow-scroll h-screen'>
    <div className='padding-x flex-center'>
      <div className='xl:max-w-[1280px] w-full'>
        <NavBar />
      </div>
    </div>
    <div className='bg-slate-100 flex-start'>
      <div className='xl:max-w-[1280px] w-full '>
        <Feed />
      </div>
    </div>
  </div>
  )
}

export default App
