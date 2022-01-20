import React from 'react'
import App from "./App"
import { useLocation } from 'react-router-dom'

export default function AppWithRouter() {
    const location= useLocation()
    return (
        <App location={location}></App>
    )
}
