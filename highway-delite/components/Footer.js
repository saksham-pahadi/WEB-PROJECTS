"use client"
import React from 'react'
import { usePathname } from "next/navigation";

const Footer = () => {
  
      const pathname = usePathname();
      const showFooter = ["/login"].includes(pathname);
  return (<>
    {!showFooter && <footer>
        <div className="footer bg-gray-200 text-center p-4">
            <p className='text-gray-600'>&copy; 2024 Highway Delite. All rights reserved.</p>
        </div>
    </footer>}
  </>)
}

export default Footer
