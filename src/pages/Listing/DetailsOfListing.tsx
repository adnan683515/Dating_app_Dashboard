import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Calendar,
  CheckCircle,
  ChevronLeft, ChevronRight,
  FileText,
  Fuel,
  Gauge,
  Palette,
  Settings
} from 'lucide-react';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import { fetchListingById } from './details';

const DetailsOfListing = () => {


  // Slider Logic
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);



  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id as string),
  });

  const seller = {
    avatar: data?.data?.seller?.avatar ?? "https://res.cloudinary.com/dzvxz7fdt/image/upload/v1773341258/images/96145e67-1c24-4e2c-91aa-c34657038b90-1_all_41328.jpg-1773341247128.jpg",
    fullName: data?.data?.seller?.fullName,
    email: data?.data?.seller?.email,
    bio: data?.data?.seller?.bio,
    location: data?.data?.seller?.location,
    isVerified: data?.data?.seller?.isVerified,
    isActive: data?.data?.seller?.isActive,
  };


  const imagesOrvideos = data?.data?.imagesAndVideos || []
  console.log(data?.data)

  const vehicleSpecs = [
    { label: 'Year', value: `${data?.data?.year ?? 33}`, icon: Calendar },
    { label: 'Mileage', value: `${data?.data?.mileage ?? 'Empty'}`, icon: Gauge },
    { label: 'Transmission', value: data?.data?.trans ?? "Empty", icon: Settings },
    { label: 'Condition', value: data?.data?.condition ?? 'Empty', icon: Fuel },
    { label: 'Color', value: data?.data?.color ?? "Empty", icon: Palette },
    { label: 'Sold', value: data?.data?.sold ? 'Sold' : 'Available', icon: FileText },
  ];

  if (isLoading) {
    return <Loading></Loading>
  }

  if (isError || error) {
    return <h1 className='text-white text-center'>Something Error!!</h1>
  }
  return (
    <div className="">



      <main className="  grid grid-cols-1 lg:grid-cols-12 sm:gap-8 pb-20">


        <div className="col-span-full lg:col-span-8 space-y-8">

          {/* Main Slider */}
          <div className="relative group bg-black rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {imagesOrvideos?.map((idx) => (
                  <div key={idx?._id} className="relative flex-[0_0_100%] min-w-0 h-100 md:h-137.5">
                    <img
                      src={` ${idx?.url ? idx?.url : 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200'}`}
                      alt="Vehicle"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 backdrop-blur-md p-4 rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 shadow-xl">
              <ChevronLeft size={28} />
            </button>
            <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 backdrop-blur-md p-4 rounded-full text-white hover:text-black transition-all opacity-0 group-hover:opacity-100 shadow-xl">
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Details & Description Section */}
          <div className="  p-8 rounded-3xl
  bg-linear-to-br from-white/5 to-white/10
  backdrop-blur-xl
  border border-white/20
  ring-1 ring-white/10
  shadow-lg
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Vehicle Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {vehicleSpecs.map((spec, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl  border border-transparent hover:border-slate-200 transition-all">
                  <div className="p-3  rounded-xl shadow-sm text-blue-600">
                    <spec.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold tracking-wider">{spec.label}</p>
                    <p className="text-sm  text-gray-200">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-8 border-slate-100" />

            <h2 className="text-2xl font-bold text-white mb-1">Title</h2>
            <div className="prose prose-slate mb-6 max-w-none">
              <p className="text-white leading-relaxed text-lg">
                {data?.data?.title}
              </p>

            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-white leading-relaxed text-lg">
                {data?.data?.description}
              </p>

            </div>
          </div>


        </div>

        {/* RIGHT COLUMN: Price, Seller & Actions (4 Columns) */}

        <div className='col-span-4'>

          <h1 className='text-white text-xl sm:text-2xl  font-semibold'>Seller Information</h1>
          {/* <Review></Review> */}
          <div className=" p-8  mt-6  rounded-3xl
  bg-linear-to-br from-white/5 to-white/10
  backdrop-blur-xl
  border border-white/20
  ring-1 ring-white/10
  shadow-lg
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-300">
            {/* Avatar */}
            <div className="flex justify-center">
              <img
                src={seller.avatar}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md -mt-16"
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-white mt-4 flex items-center justify-center gap-2">
              {seller.fullName}
              {seller.isVerified && (
                <CheckCircle className="text-white w-5 h-5" />
              )}
            </h2>

            {/* Email */}
            <p className="text-sm text-white">Email:  {seller.email}</p>

            {/* Bio */}
            <p className="mt-3 text-white text-sm">Bio: {seller.bio}</p>

            {/* Location */}
            <p className="mt-2 text-white text-sm">📍Location :  {seller.location}</p>

            {/* Status */}
            <div className="flex justify-center gap-3 mt-4">
              <span className="px-3 py-1 text-xs rounded-full  text-green-500 border border-green-500">
                {seller.isActive}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full text-white ${seller.isVerified ? "bg-green-500" : "bg-red-500"
                  }`}
              >
                {seller.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>


          <div className='mt-10'>
            <h1 className='text-white text-xl sm:text-2xl'>More Information</h1>

            <div className='p-8 mt-6 rounded-3xl
  bg-linear-to-br from-white/5 to-white/10
  backdrop-blur-xl
  border border-white/20
  ring-1 ring-white/10
  shadow-lg
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-300'>

              <div className='flex text-white gap-2'>
                <h1>Price:</h1>
                <h1>{data?.data?.price} $</h1>
              </div>

              <div className='flex text-white gap-2'>
                <h1>Category:</h1>
                <h1>{data?.data?.category}</h1>
              </div>

              <div className='flex text-white gap-2'>
                <h1>Total Inquiries:</h1>
                <h1>{data?.data?.inquiryCount}</h1>
              </div>

            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default DetailsOfListing;