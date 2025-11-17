import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    basePath?: string;
}

export default function Pagination({ 
    currentPage, 
    lastPage, 
    basePath = '/customer/dashboard/order-history' 
}: PaginationProps) {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
    
    // Fungsi helper untuk membuat link
    const getPageLink = (page: number) => {
        if (page < 1 || page > lastPage) return '#';
        return `${basePath}?page=${page}`;
    };

    return (
        <nav className="flex justify-center items-center mt-6" aria-label="Pagination">
            <ul className="flex items-center space-x-2">
                {/* Tombol Panah Kiri */}
                <li>
                    <Link 
                        href={getPageLink(currentPage - 1)}
                        className={`flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 ${
                            currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                        }`}
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </Link>
                </li>
                
                {/* Tombol Halaman */}
                {pages.map(page => (
                    <li key={page}>
                        <Link 
                            href={getPageLink(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-medium ${
                                page === currentPage
                                ? 'text-white bg-orange-500 border border-orange-500'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </Link>
                    </li>
                ))}
                
                {/* Tombol Panah Kanan */}
                <li>
                    <Link 
                        href={getPageLink(currentPage + 1)}
                        className={`flex items-center justify-center h-9 w-9 rounded-full text-orange-500 border border-orange-500 bg-white hover:bg-orange-50 ${
                            currentPage === lastPage ? 'pointer-events-none opacity-50' : ''
                        }`}
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
