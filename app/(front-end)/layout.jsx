import Footer from '@/components/frontend/Footer'
import Navbar from '@/components/frontend/Navbar'
import React from 'react'

export default function layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto py-6 ">
          {children}
        </div>
        <Footer/>
    </div>
  )
}
