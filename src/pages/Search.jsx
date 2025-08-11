import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import Fuse from 'fuse.js';
import { db } from '../firebase/firebase';
import { collection, getDocs, query as q, orderBy, limit } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import '../styles/pages/search.css';

const Search = () => {
    const { query } = useParams();
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAllProducts(productsArray);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchTrending = async () => {
            const searchesRef = collection(db, 'searches');
            const qSearch = q(searchesRef, orderBy('count', 'desc'), limit(5));
            const snapshot = await getDocs(qSearch);
            const terms = snapshot.docs.map(doc => doc.data().term);
            setTrending(terms);
        };
        fetchTrending();
    }, []);

    useEffect(() => {
        if (!loading && query) {
            const fuse = new Fuse(allProducts, {
                keys: ['name', 'brand', 'model', 'colors', 'description'],
                threshold: 0.4,
            });
            const searchResults = fuse.search(query).map(result => result.item);
            setResults(searchResults);
        }
    }, [loading, query, allProducts]);

    if (loading) return <Loader />;

    return (
        <main className="search-page">
            <h1>Resultados para: "{query}"</h1>
            {results.length > 0 ? (
                <section className="results-grid">
                    {results.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            ) : (
                <>
                    <section className="no-results">
                        <h2>No se encontraron resultados</h2>
                        <img src="/not/not-result.png" alt="No se encontró resultados" />
                        <p>
                            Mira lo más buscado:
                        </p>
                        <article className="results-grid-trending">
                            {trending.map((term, index) => (
                                <div
                                    key={index}
                                    className="trending-item"
                                    onClick={() => navigate(`/busqueda/${term}`)}
                                >
                                    <p>
                                        {term}
                                    </p>
                                </div>
                            ))}
                        </article>
                    </section>
                </>
            )}
        </main>
    );
};

export default Search;
