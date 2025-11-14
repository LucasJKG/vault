import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import '../styles/pages/products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    const [showFilter, setShowFilter] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    const [rotateImgBrand, setRotateImgBrand] = useState(false);
    const [rotateImgModel, setRotateImgModel] = useState(false);
    const [rotateImgColor, setRotateImgColor] = useState(false);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const [orderBy, setOrderBy] = useState('Todos');

    const [brandOpen, setBrandOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Filtros dinámicos
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);

    const uniqueModels = Array.from(
        new Set(
            selectedBrands.length === 0
                ? products.map(p => p.model)
                : products.filter(p => selectedBrands.includes(p.brand)).map(p => p.model)
        )
    ).filter(Boolean);

    const productsForColors = products.filter(p => {
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
        const modelMatch = selectedModels.length === 0 || selectedModels.includes(p.model);
        return brandMatch && modelMatch;
    });

    const uniqueColors = Array.from(
        new Set(productsForColors.flatMap(p => (p.colors ? Object.keys(p.colors) : [])))
    ).filter(Boolean);

    const toggleSelection = (type, value) => {
        let selectedArray, setSelectedArray;
        switch (type) {
            case 'brand':
                selectedArray = selectedBrands;
                setSelectedArray = setSelectedBrands;
                break;
            case 'model':
                selectedArray = selectedModels;
                setSelectedArray = setSelectedModels;
                break;
            case 'color':
                selectedArray = selectedColors;
                setSelectedArray = setSelectedColors;
                break;
            default:
                return;
        }

        if (type === 'color') {
            if (selectedArray.includes(value)) {
                setSelectedArray([]);
            } else {
                setSelectedArray([value]);
            }
        } else {
            if (selectedArray.includes(value)) {
                setSelectedArray(selectedArray.filter(i => i !== value));
            } else {
                setSelectedArray([...selectedArray, value]);
            }
        }
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedModels([]);
        setSelectedColors([]);
        setMaxPrice(Infinity);
    };

    const filteredProducts = products.filter(p => {
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
        const modelMatch = selectedModels.length === 0 || selectedModels.includes(p.model);
        const colorKeys = p.colors ? Object.keys(p.colors) : [];
        const colorMatch = selectedColors.length === 0 || selectedColors.some(c => colorKeys.includes(c));
        const priceMatch = p.price <= maxPrice;

        return brandMatch && modelMatch && colorMatch && priceMatch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (orderBy) {
            case 'Fecha: Reciente':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'Fecha: Antigua':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'Precio: Mayor A Menor':
                return b.price - a.price;
            case 'Precio: Menor A Mayor':
                return a.price - b.price;
            case 'Nombre: Ascendente':
                return a.name.localeCompare(b.name);
            case 'Nombre: Descendente':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    const toggleFilterPanel = () => {
        setShowFilter(prev => {
            if (!prev && showOrder) setShowOrder(false);
            return !prev;
        });
    };

    const toggleOrderPanel = () => {
        setShowOrder(prev => {
            if (!prev && showFilter) setShowFilter(false);
            return !prev;
        });
    };

    const rotateImageBrand = () => setRotateImgBrand(prev => !prev);
    const rotateImageModel = () => setRotateImgModel(prev => !prev);
    const rotateImageColor = () => setRotateImgColor(prev => !prev);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 200;
            if (scrollPosition >= threshold) {
                setVisibleCount(prev => (prev >= sortedProducts.length ? prev : prev + 4));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sortedProducts.length]);

    return (
        <section>
            <picture className="product-banner">
                <img src="/product/banner-product.jpg" alt="Banner Producto" />
            </picture>

            <aside className="product-aside">
                <h2>PRODUCTOS</h2>
                <p>Explora nuestra variedad de productos.</p>
            </aside>

            <div className="controls-top">
                <span className="filter-button" onClick={toggleFilterPanel}>
                    <img src="/product/filter.png" alt="" height={20} />
                    <p>Filtros</p>
                    <img src="/flecha-abajo.png" alt="" height={15} />
                </span>
                <button className="order-button-main" onClick={toggleOrderPanel}>Ordenar</button>
            </div>

            {(showFilter || showOrder) && (
                <div
                    className="overlay"
                    onClick={() => {
                        setShowFilter(false);
                        setShowOrder(false);
                    }}
                />
            )}

            <aside className={`filters-fullscreen ${showFilter ? 'active' : 'inactive'}`}>
                <button className="close-panel" onClick={toggleFilterPanel}>
                    <img src="/nav-icon/x.png" alt="Close Filter Icon" height={20} />
                </button>
                <h3>Filtros</h3>

                <div className={`filter-group ${brandOpen ? 'active' : ''}`}>
                    <span
                        className={`filter-dropdown ${rotateImgBrand ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setBrandOpen(prev => !prev);
                            rotateImageBrand();
                        }}
                    >
                        <span className='filter-title-content'>
                            Marca
                            {selectedBrands.length > 0 && (
                                <span className="filter-count">
                                    <p>
                                        ( {selectedBrands.length} )
                                    </p>
                                    <button
                                        className="clear-single-filter"
                                        onClick={() => setSelectedBrands([])}
                                    >
                                        Limpiar x
                                    </button>
                                </span>
                            )}
                        </span>
                        <img src="/flecha-abajo.png" alt="Flecha Dropdown" height={20} />
                    </span>

                    <div className="dropdown-content">
                        {uniqueBrands.map(brand => (
                            <label key={brand} className="filter-label">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleSelection('brand', brand)}
                                />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>


                <div className={`filter-group ${modelOpen ? 'active' : ''}`}>
                    <span
                        className={`filter-dropdown ${rotateImgModel ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setModelOpen(prev => !prev);
                            rotateImageModel();
                        }}
                    >
                        <span className='filter-title-content'>
                            Modelo
                            {selectedModels.length > 0 && (
                                <span className="filter-count">
                                    <p>
                                        ( {selectedModels.length} )
                                    </p>
                                    <button
                                        className="clear-single-filter"
                                        onClick={() => setSelectedModels([])}
                                    >
                                        Limpiar x
                                    </button>
                                </span>
                            )}
                        </span>
                        <img src="/flecha-abajo.png" alt="Flecha Dropdown" height={20} />
                    </span>

                    <div className="dropdown-content">
                        {uniqueModels.map(model => (
                            <label key={model} className="filter-label">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.includes(model)}
                                    onChange={() => toggleSelection('model', model)}
                                />
                                {model}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={`filter-group ${colorOpen ? 'active' : ''}`}>
                    <span
                        className={`filter-dropdown ${rotateImgColor ? 'active' : 'inactive'}`}
                        onClick={() => {
                            setColorOpen(prev => !prev);
                            rotateImageColor();
                        }}
                    >
                        <span className='filter-title-content'>
                            Color
                            {selectedColors.length > 0 && (
                                <span className="filter-count">
                                    <p>
                                        ( {selectedColors.length} )
                                    </p>
                                    <button
                                        className="clear-single-filter"
                                        onClick={() => setSelectedColors([])}
                                    >
                                        Limpiar x
                                    </button>
                                </span>
                            )}
                        </span>
                        <img src="/flecha-abajo.png" alt="Flecha Dropdown" height={20} />
                    </span>

                    <div className="dropdown-content">
                        {uniqueColors.map(colorKey => {
                            const productWithColor = products.find(
                                p => p.colors && p.colors[colorKey]
                            );
                            const hex = productWithColor
                                ? productWithColor.colors[colorKey].hex
                                : '#000';

                            return (
                                <label key={colorKey} className="filter-label color-label">
                                    <input
                                        className="checkbox-color"
                                        type="checkbox"
                                        checked={selectedColors.includes(colorKey)}
                                        onChange={() => toggleSelection('color', colorKey)}
                                    />
                                    <span
                                        className="color-swatch"
                                        style={{ backgroundColor: hex }}
                                    ></span>
                                    {colorKey}
                                </label>
                            );
                        })}
                    </div>
                </div>



                <div className="filter-group price-filter">
                    <span
                        className="filter-dropdown"
                    >
                        <p>
                            Precio máximo
                        </p>

                    </span>
                    <input
                        type="number"
                        min={0}
                        placeholder="Sin límite"
                        onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : Infinity)}
                        value={maxPrice === Infinity ? '' : maxPrice}
                    />
                </div>

                <button className="clear-filters-btn" onClick={clearFilters}>Limpiar filtros</button>
            </aside>

            <aside className={`order-fullscreen ${showOrder ? 'active' : 'inactive'}`}>
                <button className="close-panel" onClick={toggleOrderPanel}>
                    <img src="/nav-icon/x.png" alt="Close Filter Icon" height={20} />
                </button>
                <h3>Ordenar por:</h3>
                <div className="order-options-fullscreen">
                    {[
                        'Todos',
                        'Fecha: Reciente',
                        'Fecha: Antigua',
                        'Precio: Mayor A Menor',
                        'Precio: Menor A Mayor',
                        'Nombre: Ascendente',
                        'Nombre: Descendente',
                    ].map(option => (
                        <button
                            key={option}
                            className={`order-button ${orderBy === option ? 'active' : ''}`}
                            onClick={() => setOrderBy(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </aside>

            <div className="product-list">
                {sortedProducts.slice(0, visibleCount).map(product => (
                    <ProductCard
                        key={product.id}
                        product={{ ...product, selectedColor: selectedColors[0] || null }}
                    />
                ))}
            </div>

        </section >
    );
};

export default Products;
