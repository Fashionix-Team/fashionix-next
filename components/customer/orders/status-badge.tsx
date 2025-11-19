// Komponen StatusBadge untuk menampilkan status pesanan
export default function StatusBadge({ status }: { status: string }) {
    let classes = '';
    switch (status?.toUpperCase()) {
        case 'IN PROGRESS': 
            classes = 'bg-yellow-100 text-yellow-700'; 
            break;
        case 'COMPLETED': 
            classes = 'bg-green-100 text-green-700'; 
            break;
        case 'PROCESSING': 
            classes = 'bg-blue-100 text-blue-700'; 
            break;
        case 'CANCELED': 
            classes = 'bg-red-100 text-red-700'; 
            break;
        default: 
            classes = 'bg-gray-100 text-gray-700';
    }
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
            {status || 'N/A'}
        </span>
    );
}
