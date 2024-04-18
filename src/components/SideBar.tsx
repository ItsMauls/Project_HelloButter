export const SideBar = ({setSidebarOpen, isSidebarOpen} : {setSidebarOpen : any, isSidebarOpen : any}) => {
    return (
        <>
        {/* List yang akan diklik untuk membuka sidebar */}
  
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
        />
  
        {/* Sidebar */}
        <div 
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ transition: 'transform .3s ease-in-out' }}
        >
          {/* Isi dari sidebar */}
          <button 
            className="float-right"
            onClick={() => setSidebarOpen(false)}>X</button>
          {/* Content */}
          <ul className="p-4">
            <li>Products</li>
            <li className="my-3">Tentang Kami</li>
            <li>Hubungi Kami</li>
          </ul>
        </div>
      </>
    )
}