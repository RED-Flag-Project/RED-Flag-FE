import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Nav from '../components/common/Nav'

const RootLayout = () => {
    return (
        <div className='body'>
            <Header />
            <main className='page-container'>
                <Outlet />
            </main>
            <Nav />
        </div>
    )
}

export default RootLayout
