import { useEffect } from "react"

export default function Loader({ loading }) {
    useEffect(() => {
        if (loading) {
            window.scrollTo(0, 0)
            document.querySelector("body").style.overflow = "hidden"
        }
        else {
            document.querySelector("body").style.overflow = "scroll"
        }
    }, [loading])
    if (loading) return <div
        className="position-absolute d-flex w-100 align-items-center justify-content-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.25)', left: 0, top: 0, right: 0, bottom: 0 }}
    >
        <div className="loader" />

    </div>
}