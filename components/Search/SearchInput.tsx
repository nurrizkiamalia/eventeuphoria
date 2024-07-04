'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='lg:w-[20%] border border-gray-300 p-2 rounded flex gap-3 items-center'>
            <FaSearch className='text-dspLightGray' />
            <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full outline-none"
            />
        </div>
    );
};

export default SearchInput;
