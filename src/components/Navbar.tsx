import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Navbar: React.FC = () => {
    return (
        <nav className="p-4 flex justify-between items-center w-full">
            <a href="#"><h1 className="lg:text-4xl text-2xl font-bold font-display">Tic-Tac-Toe</h1></a>
            <div className="flex justify-end items-center">
                <button 
                    className="rounded-full mx-2 p-2 px-4 bg-primary text-light font-bold flex items-center gap-2 hover:cursor-pointer" 
                    onClick={() => window.open('https://github.com/mohit718/tic-tac-toe', '_blank')}
                >
                    Github <span className="md:text-3xl text-lg"><FaGithub /></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;