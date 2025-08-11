import { useState } from "react";
import { uploadImageToCloudinary } from "../data/cloudinary";
import imageCompression from "browser-image-compression";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import "../styles/pages/admin.css";
import { Loader } from '../components/Loader'
import useAdmin from "../hooks/useAdmin";

const getOptimizedImageUrl = (url) => {
    if (typeof url !== "string") return "";
    return url.replace("/upload/", "/upload/q_auto,f_auto/");
};

const Admin = () => {
    const isAdmin = useAdmin();
    const { products, addProduct, deleteProduct } = useProducts();

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [colorHex, setColorHex] = useState("#000000");
    const [colors, setColors] = useState({});
    const [imageFiles, setImageFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setImageFiles(files);
    };

    const handleAddColorImages = async () => {
        if (!selectedColor.trim())
            return alert("Escribe un nombre para el color/variante");
        if (imageFiles.length === 0) return alert("Sube al menos una imagen");
        if (imageFiles.length > 4) return alert("Máximo 4 imágenes");

        setLoading(true);
        try {
            const uploadedImages = [];
            for (const file of imageFiles) {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 2.5,
                    maxWidthOrHeight: 2048,
                    useWebWorker: true,
                });
                const uploaded = await uploadImageToCloudinary(compressedFile);
                if (uploaded) uploadedImages.push(uploaded);
            }
            setColors((prev) => ({
                ...prev,
                [selectedColor.trim()]: { hex: colorHex, images: uploadedImages },
            }));
            setImageFiles([]);
            alert(`✔️ Imágenes agregadas para "${selectedColor}"`);
        } catch (error) {
            console.error(error);
            alert("❌ Error al subir imágenes");
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const numericPrice = parseFloat(price);
            const numericDiscount = parseFloat(discount) || 0;
            const finalPrice = numericPrice - numericDiscount;

            const productData = {
                name,
                brand,
                model,
                colors,
                price: numericPrice,
                installments: {
                    two: +(numericPrice * 1.2).toFixed(2),
                    three: +(numericPrice * 1.25).toFixed(2),
                },
                description,
                discount: numericDiscount > 0 ? numericDiscount : null,
                finalPrice: numericDiscount > 0 ? finalPrice : numericPrice,
                createdAt: new Date(),
            };

            await addProduct(productData);
            alert("✅ Producto agregado exitosamente");

            setName("");
            setBrand("");
            setModel("");
            setPrice("");
            setDiscount("");
            setDescription("");
            setColors({});
            setSelectedColor("");
            setColorHex("#000000");
        } catch (error) {
            console.error(error);
            alert("❌ Error al agregar producto");
        }
        setLoading(false);
    };

    const sortedProducts = [...products].sort((a, b) =>
        a.brand.localeCompare(b.brand)
    );

    if (!isAdmin) return <Loader />;

    return (
        <>
            <div className="admin-container">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>Agregar Nuevo Producto</h2>
                    <input
                        id="name-admin"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        id="brand-admin"
                        type="text"
                        placeholder="Marca"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                    <input
                        id="model-admin"
                        type="text"
                        placeholder="Modelo"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                    <input
                        id="price-admin"
                        type="number"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        id="discount-admin"
                        type="number"
                        placeholder="Descuento (opcional)"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <textarea
                        id="description-admin"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <hr />
                    <input
                        id="text-color"
                        type="text"
                        placeholder="Color o variante"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    />
                    <input
                        id="color-hex"
                        type="color"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                    />
                    <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <button
                        className="add-color-btn"
                        type="button"
                        onClick={handleAddColorImages}
                        disabled={loading}
                    >
                        {loading
                            ? "Subiendo..."
                            : `Agregar imágenes para "${selectedColor || "..."}"`}
                    </button>

                    <section className="preview-images">
                        {Object.entries(colors).map(([colorName, data]) => (
                            <article key={colorName} className="color-preview">
                                <h4>Imágenes para: {colorName}</h4>
                                <section className="preview-row">
                                    {data.images.map((imageObj, idx) => (
                                        <img
                                            key={idx}
                                            src={getOptimizedImageUrl(imageObj.url)}
                                            alt={`${colorName}-${idx}`}
                                        />
                                    ))}
                                </section>
                            </article>
                        ))}
                    </section>

                    <button type="submit" disabled={loading} className="submit-btn-admin">
                        {loading ? "Guardando..." : "Agregar Producto"}
                    </button>
                </form>
            </div>

            <section className="product-admin">
                <h3 className="list-title">Productos existentes</h3>
                <div className="product-grid-admin">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="product-item-admin">
                            <ProductCard product={product} />
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    const allImages = Object.values(product.colors || {}).flatMap(
                                        (color) => color.images || []
                                    );
                                    deleteProduct(product.id, allImages);
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Admin;
