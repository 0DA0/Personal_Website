'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HomeClient.module.css';

export default function HomeClient() {
  const [typed, setTyped] = useState('');
  const full = 'Full Stack Developer';

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < full.length) { setTyped(full.slice(0, ++i)); }
      else clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);

  const codeLines = [
    <><span className={styles.kw}>const</span> express = <span className={styles.fn}>require</span>(<span className={styles.st}>&apos;express&apos;</span>);</>,
    <><span className={styles.kw}>const</span> app = <span className={styles.fn}>express</span>();</>,
    <><span className={styles.cm}>// Building amazing APIs...</span></>,
    <><span className={styles.kw}>app</span>.<span className={styles.fn}>listen</span>(<span className={styles.nm}>3000</span>, () =&gt; {'{'}</>,
    <>&nbsp;&nbsp;console.<span className={styles.fn}>log</span>(<span className={styles.st}>&apos;Server running&apos;</span>);</>,
    <>{'}'});</>,
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <p className={`${styles.greeting} terminal-prompt`}>Merhaba, ben</p>
              <h1 className={styles.heroName}>
                <span className={styles.bracket}>&lt;</span>
                <span className={styles.nameGlow}>Doğukan</span>
                <span className={styles.bracket}>/&gt;</span>
              </h1>
              <h2 className={styles.heroTitle}>
                {typed}<span className={styles.cursor}>|</span>
              </h2>
              <p className={styles.heroDesc}>
                <span className="code-comment">// </span>
                Ölçeklenebilir web uygulamaları ve RESTful API&apos;ler geliştiriyorum.<br />
                <span className="code-comment">// </span>
                Clean code, performans ve güvenlik odaklı çalışıyorum.
              </p>
              <div className={styles.ctaRow}>
                <Link href="/projects" className={styles.btnPrimary}>&#123; Projelerime Göz At &#125;</Link>
                <Link href="/contact" className={styles.btnSecondary}>&gt;&gt; İletişime Geç</Link>
              </div>
              <div className={styles.scrollWrap}>
                <span className={styles.scrollTxt}>scroll_down</span>
                <div className={styles.scrollLine} />
              </div>
            </div>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={`${styles.dot} ${styles.dotR}`} />
                <span className={`${styles.dot} ${styles.dotY}`} />
                <span className={`${styles.dot} ${styles.dotG}`} />
                <span className={styles.codeTitle}>~/server.js</span>
              </div>
              <div className={styles.codeBody}>
                {codeLines.map((line, i) => (
                  <div key={i} className={styles.cl}>
                    <span className={styles.ln}>{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsRow}>
            <div><div className={styles.statNum}>9+</div><div className={styles.statLbl}>Projeler</div></div>
            <span className={styles.divider}>|</span>
            <div><div className={styles.statNum}>20+</div><div className={styles.statLbl}>Teknolojiler</div></div>
            <span className={styles.divider}>|</span>
            <div><div className={styles.statNum}>100%</div><div className={styles.statLbl}>Tutkulu</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
