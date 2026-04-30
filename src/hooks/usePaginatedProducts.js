import { useState, useEffect, useCallback } from 'react';
import { getPaginatedProducts } from '../services/productService';

export const usePaginatedProducts = (initialLimit = 10) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

    const fetchPage = useCallback(async (page, limit) => {
        setLoading(true);
        setError(null);
        try {
            const { data, count } = await getPaginatedProducts({ page, limit });
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
        fetchPage(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage, fetchPage]);

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
