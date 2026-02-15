import { useState, useEffect, useCallback } from 'react';
import {
    fetchProducts,
    fetchFilters,
    type Product,
    type FilterOptions,
    type FilterParams,
    type PaginationInfo
} from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 6,
    });

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const options = await fetchFilters();
                setFilterOptions(options);
            } catch (err) {
                console.error('Error fetching filters:', err);
            }
        };
        loadFilters();
    }, []);

    useEffect(() => {
            const loadProducts = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetchProducts(filters);
                    setProducts(response.data);
                    setPagination(response.pagination);
                } catch (err) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch products'));
                    console.error('Error fetching products:', err);
                } finally {
                    setLoading(false);
                }
            };

            loadProducts();
    }, [filters]);

    const updateFilter = useCallback((newFilters: Partial<FilterParams>) => {
        setFilters(prev => ({ 
            ...prev, 
            ...newFilters, 
            page: 1 
        }));
    }, []);

    const setPage = useCallback((page: number) => {
        setFilters(prev => ({ ...prev, page }));
    }, []);
    const resetFilters = useCallback(() => {
        setFilters({
            page: 1,
            limit: 6,
        });
    }, []);

    return {
        products,
        loading,
        error,
        pagination,
        filterOptions,
        filters,
        updateFilter,
        setPage,
        resetFilters
    };
};
