import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl text-gray-500">Page Not Found</p>
            <Link to="/" className="px-4 py-2 bg-accent text-white rounded">Go to Home</Link>
        </div>
    )
}