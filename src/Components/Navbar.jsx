const Navbar = () => {
    return (
      <nav className='bg-indigo-900 flex justify-around text-white py-2'>
          <div className='logo '>
              <span className='font-bold text-xl mx-8'>iTask</span>
  </div>
  <ul className='flex gap-8 mx-8 '>
      <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
      <li className='cursor-pointer  hover:font-bold transition-all duration-300'>YourTask</li>
  </ul>
     
     
          </nav>
    )
  }
  
  export default Navbar
  