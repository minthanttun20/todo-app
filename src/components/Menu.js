import React from "react";

const Menu = ( {setFilter} ) => {
  return (
    <nav className="p-4 mx-auto w-64">
      <ul className="flex text-black text-lg">
        <li className="ml-3 cursor-pointer hover:text-gray-400 transition duration-200" onClick={() => setFilter('all')}>All</li>
        <li className="ml-3 cursor-pointer hover:text-gray-400 transition duration-200" onClick={() => setFilter('important')}>Important</li>
        <li className="ml-3 cursor-pointer hover:text-gray-400 transition duration-200" onClick={() => setFilter('completed')}>Finished</li>
      </ul>
    </nav>
  );
  
};

export default Menu;
