import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function ImageSlider({ img }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? img.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev === img.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            {/* Main Slider */}
            <div className="w-full flex justify-center">
                <div className="w-[80%] max-w-xl flex flex-col items-center relative">
                    <div className="w-full aspect-square relative overflow-hidden shadow-md flex items-center justify-center">
                        <div className="relative w-full h-full group">
                            {/* Main Image */}
                            <img
                                src={img[currentIndex]}
                                alt="Main"
                                className="w-full h-full object-cover transition duration-500 ease-in-out"
                            />

                            {/* Search Icon */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                                <button onClick={() => setZoomed(true)}>
                                    <FiSearch className="text-white text-3xl opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer" />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={goPrev}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={goNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-3 overflow-x-auto mt-4 p-2 w-full justify-center">
                        {img.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-16 h-16 object-cover cursor-pointer border-2 
                                    ${currentIndex === index
                                        ? "border-gray-300 scale-105"
                                        : "border-transparent hover:border-gray-300"}
                                    transition-all duration-200`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            {zoomed && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
                    <img
                        src={img[currentIndex]}
                        alt="Zoomed View"
                        className="max-w-[90%] max-h-[90%] object-contain"
                    />
                    <button
                        onClick={() => setZoomed(false)}
                        className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
}
