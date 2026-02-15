import styles from './App.module.scss';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Pagination from './components/Pagination/Pagination';
import { useProducts } from './hooks/useProducts';

function App() {
  const {
    products,
    loading,
    error,
    pagination,
    filterOptions,
    filters,
    updateFilter,
    setPage,
    resetFilters
  } = useProducts();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className="container">
          <h1>Skillex Products</h1>
        </div>
      </header>

      <main className="container">
        <div className={styles.layout}>
          <div className={styles.sidebarSection}>
            {filterOptions && (
              <FilterSidebar
                options={filterOptions}
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
              />
            )}
          </div>

          <div className={styles.mainSection}>
            {error ? (
                <div className="error-message">Error loading products. Please try again later.</div>
            ) : (
                <>
                    <ProductGrid products={products} loading={loading} />
                    {pagination && (
                        <Pagination info={pagination} onPageChange={setPage} />
                    )}
                </>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2026 Skillex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
