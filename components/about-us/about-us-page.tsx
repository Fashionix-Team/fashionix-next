import Image from 'next/image';
import TruckIcon from '@/components/icons/service/truck-icon';
import DollerIcon from '@/components/icons/service/doller-icon';
import EarphoneIcon from '@/components/icons/service/earphone-icon';

// Data team members
  const teamMembers = [
    {
      name: "M. Adam Yudistira",
      role: "Fullstack Developer",
      photo: "/image/team/adam.jpg",
    },
    {
      name: "Rafly Alamsyach",
      role: "Frontend Developer",
      photo: "/image/team/rafly.jpg",
    },
    {
      name: "Panji Hidayatullah",
      role: "Fullstack Developer",
      photo: "/image/team/panji.jpg",
    },
    {
      name: "Mukarrobin",
      role: "Fullstack Developer",
      photo: "/image/team/mukarrobin.jpg",
    },
     {
      name: "Muhammad Raihan",
      role: "Fullstack Developer",
      photo: "/image/team/raihan.jpg",
    },
    {
      name: "Muhammad Akbar",
      role: "Fullstack Developer",
      photo: "/image/team/akbar.jpg",
    },
    {
      name: "Nurhalizah Apriyani",
      role: "Fullstack Developer",
      photo: "/image/team/nurhalizah.jpg",
    },
    {
      name: "Ezanovia",
      role: "Fullstack Developer",
      photo: "/image/team/eza.jpg",
    }
  ];

export default function AboutUsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section - Tentang Fashionix */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-black">
                Tentang Fashionix
              </h1>
              <p className="text-xl text-black-100 mb-6">
                Fashionix adalah platform e-commerce yang menyediakan berbagai produk fashion modern dengan desain trendi, harga terjangkau dan kualitas terbaik.
              </p>
              <p className="text-xl text-black-100">
                Kami berkomitmen untuk memberikan pengalaman berbelanja yang mudah, cepat, dan menyenangkan bagi semua pecinta gaya.
              </p>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative h-96 w-full rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/image/fashionix-logo.png" 
                alt="Fashionix"
                fill
                style={{ objectFit: 'cover', filter: '' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Garis pemisah */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* 2. Team Members Section - Anggota Tim Inti Kami */}
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            Anggota Tim Inti Kami
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="bg-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold mb-1 truncate">{member.name}</h3>
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}