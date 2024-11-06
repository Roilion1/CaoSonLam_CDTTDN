// import React, { useEffect, useState } from "react";
// import '../../../index.css'; // Thêm file CSS nếu cần
// // import BannerService from '../../../services/BannerService'; // Đường dẫn đến BannerService

// const Banner = () => {
//     const [bannerData, setBannerData] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const fetchBannerData = async () => {
//             try {
//                 const result = await BannerService.getList();
//                 // Lọc và sắp xếp các banner có status bằng 1 theo sort_order
//                 const activeBanners = result.banner
//                     .filter(banner => banner.status === 1)
//                     .sort((a, b) => a.sort_order - b.sort_order);

//                 setBannerData(activeBanners || []);
//             } catch (error) {
//                 console.error("Error fetching banner data:", error);
//             }
//         };

//         fetchBannerData();
//     }, []);

//     useEffect(() => {
//         if (bannerData.length > 0) {
//             const interval = setInterval(() => {
//                 setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
//             }, 3000); // Chuyển banner mỗi 3 giây

//             return () => clearInterval(interval);
//         }
//     }, [bannerData.length]);

//     if (bannerData.length === 0) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="bg-gray-100 py-12">
//             <div className="lg:max-w-[1280px] md:max-w-[696px] max-w-[343px] mx-auto bg-white lg:px-20 md:px-6">
//                 <div className="flex justify-between items-center">
//                     <div className="flex justify-center items-center py-4">
//                         <img
//                             src={`http://localhost:8000/images/banner/${bannerData[currentIndex].image}`}
//                             alt="Banner"
//                             className="max-w-[400px] mx-4"
//                         />
//                         <div className="bg-gray-800 py-4 px-3 flex flex-col items-center">
//                             <p className="lg:text-4xl md:text-2xl text-2xl font-semibold text-center text-white">
//                                 Sale Upto black day
//                             </p>
//                             <p className="text-xs text-center text-white pt-2">
//                                 Shop enchanting designs with bold and classy colors at discounted price
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;
