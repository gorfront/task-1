import axios from 'axios';
import { fetchProducts, fetchFilters } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('api service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetchProducts returns data on success', async () => {
        const mockData = {
            data: [{ id: 1, name: 'Product 1' }],
            pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        };
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        const result = await fetchProducts({ category: 'Electronics' });

        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/products'), {
            params: { category: 'Electronics' },
        });
        expect(result).toEqual(mockData);
    });

    it('fetchFilters returns options on success', async () => {
        const mockOptions = {
            categories: ['Electronics'],
            brands: ['Brand A'],
            priceRange: { min: 10, max: 100 },
            ratingRange: { min: 1, max: 5 },
        };
        mockedAxios.get.mockResolvedValueOnce({ data: mockOptions });

        const result = await fetchFilters();

        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/filters'));
        expect(result).toEqual(mockOptions);
    });
});
