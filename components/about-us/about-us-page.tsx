import Image from 'next/image';
import TruckIcon from '@/components/icons/service/truck-icon';
import DollerIcon from '@/components/icons/service/doller-icon';
import EarphoneIcon from '@/components/icons/service/earphone-icon';

export default function AboutUsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section - Tentang Fashionix */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Tentang Fashionix.
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Platform fashion terpercaya yang menyediakan produk berkualitas tinggi dengan layanan pelanggan yang excellent.
              </p>
              <p className="text-lg text-blue-100">
                Kami berkomitmen untuk memberikan pengalaman berbelanja yang menyenangkan dan memuaskan bagi semua pelanggan kami.
              </p>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative h-96 w-full rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/image/18_About Us.jpg" 
                alt="Fashionix Store"
                fill
                style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. Team Members Section - Anggota Tim Inti Kami */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Anggota Tim Inti Kami
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">M. Adam Yudistira</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Rafly Alamsyach</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Panji Hidayatullah</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Mukarrobin</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 5 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Muhammad Raihan</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 6 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Muhammad Akbar</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 7 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Nurhalizah Apriliyani</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
          
          {/* Team Member 8 */}
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">Foto</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Ezanovia</h3>
            <p className="text-gray-600">Fullstack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}