import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import '../styles/pages/home.css'
import { Link } from 'react-router-dom';


export const Home = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <>
            <main>
                <section className='home-carrusel'>
                    <picture className='banner'>
                        <article className='banner-image'>
                            <Link to="/productos">
                                <img src="/home-images/banner-1.jpeg" alt="Banner oferta" />
                            </Link>
                        </article>
                    </picture>
                </section>

                <section className='home-icons'>
                    <picture className='icon'>
                        <img src="/home-icon/cuotas.png" alt="Icon 1" />
                        <p>
                            Hasta 3 cuotas sin interés
                        </p>
                    </picture>
                    <picture className='icon'>
                        <img src="/home-icon/descuento.png" alt="Icon 2" />
                        <p>
                            ¡25% de descuento pagando de contado!
                        </p>
                    </picture>
                    <picture className='icon'>
                        <img src="/home-icon/envio.png" alt="Icon 3" />
                        <p>
                            Envíos gratis superiores a $100.000
                        </p>
                    </picture>
                </section>

                <section className='home-categories'>
                    <picture className='category'>
                        <Link to={'/productos'}>
                            <article className='category-image'>
                                <p>CASUALS</p>
                                <img src="/category-1.webp" alt="Category 1" height={500} />
                            </article>
                        </Link>
                    </picture>
                    <picture className='category'>
                        <Link to={'/productos'}>
                            <article className='category-image'>
                                <p>DEPORTIVE</p>
                                <img src="/category-2.webp" alt="Category 2" height={500} />
                            </article>
                        </Link>

                    </picture>
                </section>

                <section className='home-products'>
                    <h2>Últimos lanzamientos</h2>
                    <article className='home-container-products'>
                        {products
                            .slice()
                            .sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateB - dateA;
                            })
                            .slice(0, 12)
                            .map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </article>
                </section>

            </main>
        </>
    )
}

export default Home