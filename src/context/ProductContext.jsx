import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const data = querySnapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        setLoading(false);
    };

    const addProduct = async (productData) => {
        try {
            const docRef = await addDoc(collection(db, "products"), productData);
            setProducts((prev) => [...prev, { id: docRef.id, ...productData }]);
        } catch (error) {
            console.error("Error al agregar producto:", error);
            throw error;
        }
    };

    const editProduct = async (id, updatedData) => {
        try {
            const productRef = doc(db, "products", id);
            await updateDoc(productRef, updatedData);
            setProducts((prev) =>
                prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
            );
        } catch (error) {
            console.error("Error al editar producto:", error);
            throw error;
        }
    };

    const deleteProduct = async (id, images = []) => {
        try {
            const validImages = images.filter(img => img?.publicId);

            for (const img of validImages) {
                await addDoc(collection(db, "deletedImages"), {
                    publicId: img.publicId,
                    url: img.url,
                    deletedAt: new Date()
                });
            }

            const productRef = doc(db, "products", id);
            await deleteDoc(productRef);

            setProducts((prev) => prev.filter((p) => p.id !== id));

        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{ products, loading, addProduct, editProduct, deleteProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
