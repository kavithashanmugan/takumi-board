import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="mx-auto my-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className="flex items-center">
            <img src="/takumi-logo.png" alt="takumi logo" className="mr-2 object-contain" style={{ maxHeight: '125px', maxWidth: 'auto' }} />
            {/* <span className="text-xl font-bold">Simple Kanban</span> */}
          </div>
          <div className="relative">
          <button
              onClick={toggleDropdown}
              className="flex items-center shadow-none"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full">
                <span className="text-lg font-bold text-white">KS</span>
              </div>
            </button>
            {dropdownOpen && (
            <div className="absolute right-0 mt-2">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">Kavitha Shanmugan</p>
                  <p className="text-sm text-gray-500">
                    kavitha.shanmugan@gmail.com
                  </p>
                  <button className="mt-2">Logout</button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
