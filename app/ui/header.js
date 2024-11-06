'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const pathname = usePathname();
    const hiddenPaths = ['/create', '/view'];
    const isButtonHidden = hiddenPaths.some(path => pathname.startsWith(path.replace('[id]', '')));

    return (
        <header id="header" className="w-full h-[100px] max-xl:h-[120px] bg-[#ac3b61] sticky top-0 p-5 shadow-header-shadow">
            <div className="flex items-center justify-between w-[80%] max-md:w-[90%] m-auto">
                <h1 className="font-bold text-center text-4xl max-md:text-2xl text-[#edc7b7]">Blog by Author (Axios API + Local Storage)</h1>
                {!isButtonHidden && (
                    <Link href="/create" className="p-5 block max-md:p-3 bg-[#123c69] hover:bg-[#436993] text-[#eee2dc] font-bold capitalize rounded-lg hover:shadow-hover-shadow">
                        Create New Blog
                    </Link>
                )}
            </div>
        </header>
    );
}
