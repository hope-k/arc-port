import { useState } from 'react';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button
            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none relative"
            onClick={handleClick}
        >
        

            <div className="w-8 relative space-y-2">
                <div
                    className={`w-full h-[1.7px] rounded bg-black  transition duration-300 transform-gpu origin-center ${isOpen ? 'rotate-45 translate-y-[9.6px]' : ''
                        }`}
                />
                <div
                    className={`w-full h-[1.7px] rounded bg-black transition duration-300 transform-gpu origin-center ${isOpen ? 'opacity-0' : ''
                        }`}
                />
                <div
                    className={`w-full h-[1.7px] rounded bg-black  transition duration-300 transform-gpu origin-center ${isOpen ? '-rotate-45 -translate-y-[9.6px]' : ''
                        }`}
                />
            </div>
        </button>
    );
};

export default HamburgerMenu;