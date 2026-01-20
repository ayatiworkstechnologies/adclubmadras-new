import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <Image src="/assets/404.svg" alt="404" width={300} height={300} className="mb-8" />
            <h1 className="text-4xl font-bold font-asgard mb-4">Page Not Found</h1>
            <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary text-black rounded-full font-bold hover:bg-yellow-300 transition-all"
            >
                Go Back Home
            </Link>
        </div>
    );
}
