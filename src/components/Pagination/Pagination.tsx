import React from 'react';
import styles from './Pagination.module.scss';
import type { PaginationInfo } from '../../services/api';

interface PaginationProps {
    info: PaginationInfo;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ info, onPageChange }) => {
    const { page, totalPages } = info;

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`${styles.pageButton} ${page === i ? styles.active : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>
            <button
                className={styles.navButton}
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                &laquo; Previous
            </button>

            <div className={styles.pageNumbers}>
                {renderPageNumbers()}
            </div>

            <button
                className={styles.navButton}
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next &raquo;
            </button>
        </div>
    );
};

export default Pagination;
