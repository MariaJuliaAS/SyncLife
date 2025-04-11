import { useEffect, useState } from "react"
import { Siderbar } from "./sidebar"
import { Header } from "./header"


export function Nav() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        function handleResize() {
            setIsMobile(window.innerWidth < 960)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return (
        <>
            {!isMobile ?
                (<Siderbar />)
                :
                (<Header />)
            }
        </>
    )
}