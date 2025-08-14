import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/pages/productDetail.css";
import { Loader } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import ZoomableImage from "../components/ZoomableImage";

const ProductDetail = () => {
    const { productId, productName } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [size, setSize] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

    const contentRefs = {
        modelo: useRef(null),
        envio: useRef(null),
        pago: useRef(null),
        cambios: useRef(null),
        costo: useRef(null),
    };

    const phoneNumber = '+19832049808';
    const message = 'Hola, quiero más información!';
    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const toggleDropdown = (name) => {
        setActiveDropdown(prev => (prev === name ? null : name));
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!productId) return;

        async function fetchProductById(id) {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No such product!");
                return null;
            }
        }

        fetchProductById(productId).then(async (data) => {
            if (data) {
                setProduct(data);

                if (data.colors && Object.keys(data.colors).length > 0) {
                    setSelectedColor(Object.keys(data.colors)[0]);
                }

                if (data.brand) {
                    const relatedQuery = query(
                        collection(db, "products"),
                        where("brand", "==", data.brand)
                    );
                    const querySnapshot = await getDocs(relatedQuery);
                    const related = [];
                    querySnapshot.forEach(doc => {
                        if (doc.id !== productId) {
                            related.push({ id: doc.id, ...doc.data() });
                        }
                    });
                    setRelatedProducts(related);
                }
            }
        });
    }, [productId]);

    useEffect(() => {
        if (productName && product) {
            const parts = productName.split("-");
            const colorFromSlug = parts[parts.length - 1];
            const matchingColor = Object.keys(product.colors).find(
                (c) => c.toLowerCase().replace(/\s+/g, "-") === colorFromSlug
            );
            if (matchingColor) {
                setSelectedColor(matchingColor);
            }
        }
    }, [productName, product]);

    useEffect(() => {
        setImagesLoadedCount(0);
    }, [selectedColor]);

    if (!product) return <Loader />;

    const imagesForColor =
        selectedColor && product.colors && product.colors[selectedColor]
            ? product.colors[selectedColor].images
            : [];

    const totalDesdeInstallments = (product.installments.three / 3).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pricePerInstallment = (product.price / 3).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleSizeGuide = () => {
        setSize(!size);
    };

    const handleColorChange = (colorKey) => {
        setSelectedColor(colorKey);
        const urlFriendlyName = product.name.toLowerCase().replace(/\s+/g, "-");
        const urlFriendlyColor = colorKey.toLowerCase().replace(/\s+/g, "-");

        window.location.href = `/productos/${productId}/${urlFriendlyName}-${urlFriendlyColor}`;
    };




    return (
        <>
            <div className="product-detail-container">
                <picture className="product-images">
                    {imagesForColor && imagesForColor.length > 0 ? (
                        isMobile ? (
                            <>
                                <ZoomableImage
                                    src={imagesForColor[mainImageIndex].url}
                                    alt={`${product.name} ${selectedColor} imagen principal`}
                                    zoom={2.2}
                                />
                                <div className="thumbnails-container">
                                    {imagesForColor.map((img, index) => (
                                        <img
                                            loading="lazy"
                                            key={index}
                                            src={img.url}
                                            alt={`${product.name} ${selectedColor} miniatura ${index + 1}`}
                                            className={`thumbnail ${index === mainImageIndex ? 'active' : ''}`}
                                            onClick={() => setMainImageIndex(index)}
                                            style={{ cursor: 'pointer', objectFit: 'cover', margin: '0 5px' }}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            imagesForColor.map((img, index) => (
                                <ZoomableImage
                                    key={index}
                                    src={img.url}
                                    alt={`${product.name} ${selectedColor} ${index + 1}`}
                                    zoom={2.2}
                                />
                            ))
                        )
                    ) : (
                        <p>No hay imágenes disponibles para este color.</p>
                    )}
                </picture>

                <div className="product-info">
                    <h1>{product.name} {product.model}</h1>

                    {selectedColor && (
                        <p className="selected-color">
                            Modelo - {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1).toLowerCase()}
                        </p>
                    )}

                    <section className="product-price">
                        {product.discount ? (
                            <>
                                <span className="original">${product.installments.three.toLocaleString('es-ES')}</span>
                                <span className="discounted">${product.price.toLocaleString('es-ES')}</span>
                            </>
                        ) : (
                            <div className="price-no-discount">
                                <p>$ {product.installments.three.toLocaleString('es-ES')}</p>
                                <p>precio de contado $ {product.price.toLocaleString('es-ES')}</p>
                            </div>
                        )}
                    </section>
                    {product.discount ? (
                        <p className="product-installments">
                            3 cuotas sin interés: ${pricePerInstallment}
                        </p>
                    ) : (
                        <p className="product-installments">
                            3 cuotas sin interés: ${totalDesdeInstallments}
                        </p>
                    )}

                    <div className="color-selector-product">
                        {product.colors &&
                            Object.keys(product.colors).map((colorKey) => (
                                <button
                                    key={colorKey}
                                    onClick={() => handleColorChange(colorKey)}
                                    style={{
                                        backgroundColor: product.colors[colorKey].hex,
                                    }}
                                    aria-label={`Seleccionar color ${colorKey}`}
                                />
                            ))}
                    </div>


                    <section className="buy-product-info">
                        <article>
                            <p>
                                — Para comprar este producto, información de talles y demás, coordinalo a través de nuestras redes sociales
                            </p>
                        </article>
                    </section>

                    <section className="buy-product-detail">
                        <a
                            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                                `Quiero más información sobre este producto: ${window.location.href}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="buy-whatsapp-button">
                                Consultar por WhatsApp
                            </button>
                        </a>
                    </section>

                    <section className="product-description-section">
                        <div className="envio-info-icon">
                            <img src="/home-icon/envio.png" alt="Envios gratis" height={30} />
                            <p> ¡Envío gratis a partir de $100.000</p>
                        </div>
                        <h3>Descripción</h3>
                        <p className="product-description">{product.description}</p>
                    </section>

                    {size && (
                        <div className="size-guide-modal" onClick={handleSizeGuide}>
                            <div className="size-guide-content">
                                <button className="close-guide" onClick={handleSizeGuide}>
                                    <img src="/nav-icon/x.png" alt="close modal size guide" height={30} />
                                </button>
                                <img src="/talles/size-guide.jpeg" alt="Size Guide" />
                            </div>
                        </div>
                    )}

                    <div className={`size-guide ${size ? 'active' : 'inactive'}`} onClick={handleSizeGuide}>
                        <img src="/talles/size.png" alt="Icon Size" height={20} />
                        <button className="size-btn"><p>Guía de talles</p></button>
                    </div>

                    <section className="info-dropdowns">
                        {[
                            { key: 'envio', label: 'Métodos de envío', content: 'Actualmente, la gestión del envío se realiza de manera personalizada a través de nuestras redes sociales, ya sea por WhatsApp o Instagram. De esta forma, podremos coordinar directamente contigo para asegurarnos de que tu pedido llegue de manera segura y eficiente.' },
                            { key: 'pago', label: 'Formas de pago', content: 'Por el momento, la opción de pago en nuestra página web está deshabilitada. Por ello, el proceso de pago también se llevará a cabo a través de WhatsApp o Instagram, para ofrecerte un servicio más cercano y confiable.' },
                            { key: 'cambios', label: 'Cambios y devoluciones', content: 'Manejamos las políticas habituales para productos de calzado. Si necesitas realizar un cambio o devolución, te invitamos a contactarnos por nuestras redes sociales para que podamos brindarte la mejor solución posible.' },
                            { key: 'costo', label: 'Costo de envío', content: 'El costo del envío será informado y gestionado a través de nuestras redes sociales al momento de realizar tu pedido. Recuerda que ofrecemos envíos gratuitos para compras superiores a $100.000.' },
                        ].map(({ key, label, content }) => (
                            <div className="dropdown" key={key}>
                                <span
                                    className={`info-dropdown ${activeDropdown === key ? 'active' : 'inactive'}`}
                                    onClick={() => toggleDropdown(key)}
                                >
                                    <p>{label}</p>
                                    <img
                                        src="/flecha-abajo.png"
                                        alt="Flecha Dropdown"
                                        height={20}
                                        className={activeDropdown === key ? 'rotated' : ''}
                                    />
                                </span>

                                <div
                                    className="dropdown-content"
                                    ref={contentRefs[key]}
                                    style={{
                                        maxHeight: activeDropdown === key ? `${contentRefs[key].current.scrollHeight}px` : '0px',
                                    }}
                                >
                                    <p>{content}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="social-media">
                        <p>Contáctanos por nuestras redes sociales:</p>
                        <div className="social-icons-container">
                            <a href="https://www.instagram.com/vault.store/" target="_blank" rel="noopener noreferrer">
                                <img src="/social-icon/ig.png" alt="Instagram" height={30} />
                            </a>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <img src="/social-icon/whatsapp.png" alt="WhatsApp" height={30} />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="related-products">
                    <h2>Productos relacionados</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((related) => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </section>
            )}

            <section className="section-bottom-detail">
                <article className="article-about-detail">
                    <Link to={'/sobre-nosotros'}>
                        ¿Quiénes somos?
                    </Link>
                </article>
            </section>
        </>
    );
};

export default ProductDetail;
