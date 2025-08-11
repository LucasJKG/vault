import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/components/productCard.css';

const getOptimizedImageUrl = (url) => {
  if (!url) return '';
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
};

const ProductCard = ({ product }) => {
  const [activeColor, setActiveColor] = useState(
    product.selectedColor || Object.keys(product.colors)[0]
  );

  const images = product.colors[activeColor]?.images || [];
  const [mainImage, setMainImage] = useState(images[0]?.url || '');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMainImage(images[0]?.url || '');
  }, [activeColor, images]);

  const hoverImage = images[1]?.url || null;

  const urlFriendlyName = product.name.toLowerCase().replace(/\s+/g, '-');
  const productLink = `/productos/${product.id}/${urlFriendlyName}`;

  const onColorClick = (e, colorName) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveColor(colorName);
  };

  return (
    <Link to={productLink} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {mainImage ? (
        <img
          loading="lazy"
          className="product-main-image"
          src={getOptimizedImageUrl(isHovered && hoverImage ? hoverImage : mainImage)}
          alt={`Producto color ${activeColor}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      ) : (
        <div className="image-placeholder">
          <span>No hay imágenes</span>
        </div>
      )}

      <h3 className="product-name">{product.name}</h3>

      <span className="price">
        <picture className="buy-product">
          <figcaption>${product.installments.three.toLocaleString('es-ES')}</figcaption>
          <img
            loading="lazy"
            className="-buy-product"
            src="/card-icon/compra.png"
            alt="Comprar producto"
          />
        </picture>
        <p>precio de contado: ${product.finalPrice.toLocaleString('es-ES')}</p>
      </span>

      <div
        className="color-selector"
        onClick={(e) => e.stopPropagation()}
      >
        {Object.entries(product.colors).map(([colorName, data]) => (
          <button
            key={colorName}
            className={`color-dot ${colorName === activeColor ? 'active' : ''}`}
            style={{ backgroundColor: data.hex }}
            onClick={(e) => onColorClick(e, colorName)}
            aria-label={`Seleccionar color ${colorName}`}
            type="button"
          />
        ))}
      </div>
    </Link>
  );
};

export default ProductCard;
