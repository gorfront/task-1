import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    imageUrl: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ProductsResponse {
    data: Product[];
    pagination: PaginationInfo;
}

export interface FilterOptions {
    categories: string[];
    brands: string[];
    priceRange: {
        min: number;
        max: number;
    };
    ratingRange: {
        min: number;
        max: number;
    };
}

export interface FilterParams {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
}

export const fetchProducts = async (params: FilterParams): Promise<ProductsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data;
};

export const fetchFilters = async (): Promise<FilterOptions> => {
    const response = await axios.get(`${API_BASE_URL}/filters`);
    return response.data;
};
