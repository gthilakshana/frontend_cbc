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
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-5xl mx-auto">

                <div className="flex md:flex-col gap-2 md:max-h-[500px]">
                    {img.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border-2 ${currentIndex === index
                                ? "border-orange-600 scale-105"
                                : "border-transparent hover:border-gray-300"
                                } transition-all duration-200 shadow`}
                        />
                    ))}
                </div>


                <div className="relative w-full max-w-xl aspect-square overflow-hidden rounded shadow-md group">
                    <img
                        src={img[currentIndex]}
                        alt="Main"
                        className="w-full h-full object-cover transition duration-500 ease-in-out"
                    />


                    <div className="absolute inset-0 bg-black/0 group-hover:bg-orange transition duration-300 flex items-center justify-center">
                        <button onClick={() => setZoomed(true)}>
                            <FiSearch className="text-white text-4xl opacity-0 group-hover:opacity-100 transition duration-300" />
                        </button>
                    </div>


                    <button
                        onClick={goPrev}
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>


            {zoomed && (
                <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center">
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
