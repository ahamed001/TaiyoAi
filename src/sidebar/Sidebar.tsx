import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Function to handle sidebar visibility based on screen size
    const handleResize = () => {
        if (window.innerWidth < 600) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Sidebar Overlay for smaller screens */}
            {isSidebarOpen && window.innerWidth < 600 && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-blue-800 text-white p-4 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-[25vw] transition-transform duration-300 ease-in-out`}
                style={{ width: window.innerWidth < 600 ? '70%' : '25vw' }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Sidebar</h2>
                    {window.innerWidth < 600 && (
                        <button
                            className="text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <p className="text-xl font-bold ml-4">X</p>
                        </button>
                    )}
                </div>
                <nav className="flex flex-col gap-4">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                        onClick={() => window.innerWidth < 600 && setIsSidebarOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                        }
                        onClick={() => window.innerWidth < 600 && setIsSidebarOpen(false)}
                    >
                        My Data
                    </NavLink>
                </nav>
            </aside>

            {/* Hamburger Menu Button */}
            {!isSidebarOpen && (
                <button
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-800 text-white rounded lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
            )}
        </>
    );
};

export default Sidebar;
