import { useState, useEffect, useCallback } from 'react';
import { getPaginatedProducts } from '../services/productService';

export const usePaginatedProducts = (initialLimit = 10, activeFilters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

    const fetchPage = useCallback(async (page, limit, filters) => {
        setLoading(true);
        setError(null);
        try {
            const { data, count } = await getPaginatedProducts({ page, limit, filters });
            setProducts(data);
            setTotalItems(count);
            setCurrentPage(page);
            setItemsPerPage(limit);
        } catch (err) {
            setError(err);
            console.error("Failed to fetch paginated products:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // We reset to page 1 whenever filters change to avoid empty pages
        fetchPage(1, itemsPerPage, activeFilters);
    }, [itemsPerPage, fetchPage, JSON.stringify(activeFilters)]);

    // Separate useEffect for pure pagination without filter changes
    useEffect(() => {
        fetchPage(currentPage, itemsPerPage, activeFilters);
        // We do not include activeFilters dependency here to prevent double fetch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return {
        products,
        loading,
        error,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalItems,
        totalPages: Math.ceil(totalItems / itemsPerPage)
    };
};
