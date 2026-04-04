'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const links = [
  { href: '/', label: 'Anasayfa' },
  { href: '/about', label: 'Hakkımda' },
  { href: '/projects', label: 'Projeler' },
  { href: '/skills', label: 'Yetenekler' },
  { href: '/contact', label: 'İletişim' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className={`${styles.navbar}${scrolled ? ' ' + styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>Portfolio</Link>

          <ul className={styles.navLinks}>
            {links.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={pathname === l.href ? styles.active : ''}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.hamburger}${open ? ' ' + styles.open : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu}${open ? ' ' + styles.open : ''}`}>
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? styles.active : ''}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
