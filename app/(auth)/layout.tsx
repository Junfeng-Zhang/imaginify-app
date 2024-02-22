import React from 'react'

// Layout always have to export some children within them
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='auth'>{children}</main>
  )
}

export default Layout;