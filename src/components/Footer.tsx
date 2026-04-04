import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>Doğukan</h3>
            <p>Full Stack Web Developer</p>
          </div>
          <div className={styles.col}>
            <h4>Hızlı Linkler</h4>
            <ul>
              {[['/', 'Anasayfa'], ['/projects', 'Projeler'], ['/skills', 'Yetenekler'], ['/about', 'Hakkımda'], ['/contact', 'İletişim']].map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Sosyal Ağlar</h4>
            <ul>
              <li><a href="https://github.com/0DA0" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/dogukan-aras-424184340/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {year} Doğukan. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
