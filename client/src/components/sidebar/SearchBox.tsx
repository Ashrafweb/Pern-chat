import React, { useState, useRef, useCallback } from "react";

const SearchBox: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debounceTimeout = useRef<number | null>(null); // Use number or null

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;

			if (debounceTimeout.current !== null) {
				clearTimeout(debounceTimeout.current);
			}

			debounceTimeout.current = window.setTimeout(() => {
				// Using window.setTimeout
				setSearchTerm(value);
				console.log("searching: ", value);
				// Perform search here.
				debounceTimeout.current = null; //reset timeout after use.
			}, 300);
		},
		[]
	);

	return (
		<div className='p-4 border-b border-gray-700 dark:border-gray-700'>
			<input
				type='text'
				placeholder='Search conversations...'
				value={searchTerm}
				onChange={handleSearchChange}
				className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-200'
			/>
		</div>
	);
};
export default SearchBox;
