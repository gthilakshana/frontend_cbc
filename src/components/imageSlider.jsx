import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider({ img }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? img.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev === img.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-[80%] max-w-xl flex flex-col items-center relative">

                <div className="w-full aspect-square relative overflow-hidden  shadow-md flex items-center justify-center">
                    <img
                        src={img[currentIndex]}
                        alt="Main"
                        className="w-full h-full object-cover transition duration-500 ease-in-out"
                    />


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


                <div className="flex gap-3 overflow-x-auto mt-4 p-2 w-full justify-center">
                    {img.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 
                        ${currentIndex === index
                                    ? "border-blue-500 scale-105"
                                    : "border-transparent hover:border-gray-300"}
                        transition-all duration-200`}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}
