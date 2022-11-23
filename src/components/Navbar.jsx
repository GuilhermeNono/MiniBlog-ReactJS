import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'

const Navbar = () => {

    const {user} = useAuthValue();
    const {logOut} = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink className={styles.brand} to="/">
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>
                    Home
                </NavLink>
            </li>
            {!user ? (
            <>
            <li>
                <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>
                    Entrar
                </NavLink>
            </li>
            <li>
                <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>
                    Cadastrar
                </NavLink>
            </li>
            </>
            ) : (
            <>
            <li>
                <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : '')}>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/post/create" className={({isActive}) => (isActive ? styles.active : '')}>
                    Novo Post
                </NavLink>
            </li>
            </>
            )}
            
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>
                    Sobre
                </NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logOut}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar