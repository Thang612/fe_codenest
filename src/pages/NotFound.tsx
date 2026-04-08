import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary">404</h1>
                <p className="text-lg">The page you are looking for does not exist.</p>
                <Link to="/" className=" flex justify-center text-primary hover:underline">
                    <ArrowRight /> Go back home
                </Link>
            </div>
        </div>
    )
}

export default NotFound