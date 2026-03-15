import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop = () => {
    const { pathname } = useLocation()
    const isFirstRender = useRef(true)

    // ✅ Add this — disables browser's default scroll restoration
    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop