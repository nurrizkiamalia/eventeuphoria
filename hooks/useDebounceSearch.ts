// hooks/useDebouncedSearch.ts
import { useState, useEffect } from 'react';

function useDebouncedSearch(searchTerm: string, delay: number) {
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, delay]);

    return debouncedTerm;
}

export default useDebouncedSearch;
