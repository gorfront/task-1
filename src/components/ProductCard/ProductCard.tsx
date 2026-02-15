    
import styles from './ProductCard.module.scss';
import type { Product } from '../../services/api';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} className={styles.image} />
                <span className={styles.rating}>⭐ {product.rating}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.brand}>{product.brand}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <button className={styles.addButton}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
