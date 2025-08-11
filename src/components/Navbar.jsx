import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../styles/components/navbar.css'
import { PreHeader } from './PreHeader'
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [loginMenu, setLoginMenu] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenu(!menu)
        setSearch(false)
        setLoginMenu(false);
    }

    const toggleSearch = () => {
        setSearchValue('');
        setSearch(!search)
        setMenu(false)
        setLoginMenu(false);
    }

    const toggleLoginMenu = () => {
        setLoginMenu(!loginMenu)
        setMenu(false);
        setSearch(false);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (trimmed !== '') {
            try {
                const searchRef = doc(db, 'searches', trimmed.toLowerCase());
                const snap = await getDoc(searchRef);
                if (snap.exists()) {
                    await updateDoc(searchRef, {
                        count: increment(1),
                        lastSearched: new Date(),
                    });
                } else {
                    await setDoc(searchRef, {
                        term: trimmed,
                        count: 1,
                        lastSearched: new Date(),
                    });
                }
            } catch (error) {
                console.error('Error guardando búsqueda:', error);
            }

            navigate(`/busqueda/${encodeURIComponent(trimmed)}`);
            toggleSearch();
        }
    };

    const handleLogout = async () => {
        await logout();
        setLoginMenu(false);
        navigate('/');
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const clickedMenu = event.target.closest('.menu') || event.target.closest('.menu-icon');
            const clickedSearch = event.target.closest('.search') || event.target.closest('.right-icons img') || event.target.closest('.inside-search');
            const clickedLogin = event.target.closest('.login') || event.target.closest('.right-icons img[alt="User Icon"]');

            if (menu && !clickedMenu) setMenu(false);
            if (search && !clickedSearch) setSearch(false);
            if (loginMenu && !clickedLogin) setLoginMenu(false);
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [menu, search, loginMenu]);

    useEffect(() => {
        if (menu || search || loginMenu) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [menu, search, loginMenu]);

    return (
        <header className='header'>
            <PreHeader />
            <nav className='navbar'>
                <section className="left">
                    <picture className='menu-icon'>
                        <img src="/menu.png" alt="Menu Icon" onClick={toggleMenu} />
                    </picture>
                </section>
                <section className={`menu ${menu ? 'active' : 'inactive'}`}>
                    <picture className='close-icon'>
                        <img src="/nav-icon/x.png" alt="Close Icon" onClick={toggleMenu} />
                    </picture>
                    <ul>
                        <li>
                            <NavLink to={'/'} onClick={toggleMenu}>INICIO</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/productos'} onClick={toggleMenu}>PRODUCTOS</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/sobre-nosotros'} onClick={toggleMenu}>NOSOTROS</NavLink>
                        </li>
                        {user?.role === "admin" && (
                            <li>
                                <NavLink to="/admin" onClick={toggleMenu}>ADMIN</NavLink>
                            </li>
                        )}
                    </ul>
                </section>

                <section className="middle">
                    <picture className='logo'>
                        <NavLink to={'/'} onClick={toggleMenu}>
                            <img src="/vault.png" alt="Logo" />
                        </NavLink>
                    </picture>
                </section>

                <section className="right">
                    <picture className='right-icons'>
                        <img src="/nav-icon/search.png" alt="Search Icon" onClick={toggleSearch} />
                    </picture>
                    <picture className='right-icons'>
                        <Link to={'/contacto'} onClick={toggleMenu}>
                            <img src="/nav-icon/ubicacion.png" alt="Location Icon" />
                        </Link>
                    </picture>
                    <picture className='right-icons'>
                        <img src="/nav-icon/user.png" alt="User Icon" onClick={toggleLoginMenu} />
                    </picture>
                </section>

                <section className={`login ${loginMenu ? 'active' : 'inactive'}`}>
                    {loginMenu && (
                        <article>
                            <div>
                                <picture className='close-login-icon'>
                                    <img src="/nav-icon/x.png" alt="close login" onClick={toggleLoginMenu} />
                                </picture>
                                <section className='login-menu-content'>
                                    {!user ? (
                                        <Link to={'/login'} onClick={toggleLoginMenu}>Iniciar sesión</Link>
                                    ) : (
                                        <>
                                            <div className="user-photo-wrapper">
                                                <img
                                                    src={user.photoURL || '/default-profile.jpg'}
                                                    alt="Foto de usuario"
                                                    className="user-photo"
                                                />
                                            </div>
                                            <p> {user.email}</p>
                                            <ul className="user-menu">
                                                <li>
                                                    <Link to={'/configuracion'} onClick={toggleLoginMenu}>Configuración</Link>
                                                </li>
                                                <li>
                                                    <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
                                                </li>
                                            </ul>
                                        </>
                                    )}
                                </section>
                            </div>
                        </article>
                    )}
                </section>


                <section className={`search ${search ? 'active' : 'inactive'}`}>
                    {search && (
                        <article>
                            <div className="search-container">
                                <picture className='close-search'>
                                    <img src="/nav-icon/x.png" alt="close search" onClick={toggleSearch} />
                                </picture>
                                <section className="logo-search">
                                    <img src="/vault.png" alt="Logo Icon" />
                                </section>
                                <section className="content-search">
                                    <div className="input-wrapper">
                                        <form onSubmit={handleSearchSubmit} className="input-wrapper">
                                            <input
                                                type="text"
                                                placeholder="¿Qué estás buscando?"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            {searchValue && (
                                                <button
                                                    type="button"
                                                    className="clear-button inside-search"
                                                    onClick={() => setSearchValue('')}
                                                >
                                                    <img src="/nav-icon/x.png" alt="Clear input Icon" />
                                                </button>
                                            )}
                                        </form>
                                    </div>
                                </section>

                            </div>
                        </article>
                    )}
                </section>
            </nav>
        </header>
    )
}
