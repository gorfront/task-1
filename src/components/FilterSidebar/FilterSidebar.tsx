import React from 'react';
import styles from './FilterSidebar.module.scss';
import type { FilterOptions, FilterParams } from '../../services/api';

interface FilterSidebarProps {
    options: FilterOptions;
    filters: FilterParams;
    onFilterChange: (newFilters: Partial<FilterParams>) => void;
    onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    options,
    filters,
    onFilterChange,
    onReset,
}) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <h2>Filters</h2>
                <button onClick={onReset} className={styles.resetButton}>Reset</button>
            </div>

            <div className={styles.section}>
                <h3>Category</h3>
                <div className={styles.options}>
                    {options.categories.map(category => (
                        <label key={category} className={styles.checkboxLabel}>
                            <input
                                type="radio"
                                name="category"
                                checked={filters.category === category}
                                onChange={() => onFilterChange({ category, page: 1 })}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3>Brand</h3>
                <div className={styles.options}>
                    {options.brands.map(brand => (
                        <label key={brand} className={styles.checkboxLabel}>
                            <input
                                type="radio"
                                name="brand"
                                checked={filters.brand === brand}
                                onChange={() => onFilterChange({ brand, page: 1 })}
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3>Price Range</h3>
                <div className={styles.priceInputs}>
                    <div className={styles.inputGroup}>
                        <label>Min</label>
                        <input
                            type="number"
                            value={filters.minPrice || ''}
                            onChange={(e) => onFilterChange({ minPrice: Number(e.target.value) || undefined, page: 1 })}
                            placeholder={options.priceRange.min.toString()}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Max</label>
                        <input
                            type="number"
                            value={filters.maxPrice || ''}
                            onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) || undefined, page: 1 })}
                            placeholder={options.priceRange.max.toString()}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Minimum Rating</h3>
                <select
                    value={filters.minRating || ''}
                    onChange={(e) => onFilterChange({ minRating: Number(e.target.value) || undefined, page: 1 })}
                    className={styles.select}
                >
                    <option value="">Any Rating</option>
                    <option value="1">1+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars</option>
                </select>
            </div>
        </aside>
    );
};

export default FilterSidebar;
