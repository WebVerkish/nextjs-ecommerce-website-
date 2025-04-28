"use client"
import React, { useState } from 'react'
import Sidebar from '../../../components/backoffice/Sidebar'
import Navbar from '../../../components/backoffice/Navbar'


export default function Layout({children}) {
  const [showSidebar,setShowSidebar] = useState('false');
  return (
    <div className="lg:ml-64 ml-0 flex-grow bg-slate-100">
        {/* sidebar */}
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
        <div className="w-full">
            {/* {header} */} 
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            {/* {Main} */ }
            <main className='p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen mt-16 '>
                {children}
            </main>
        </div>
        {/* {main-body} */}
    </div>
  )
}
