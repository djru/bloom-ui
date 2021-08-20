import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("https://api.bloomhealth.app/whoami", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setUser(r);
      })
      .catch((r) => {
        console.error(r);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Bloom - BP Tracker</title>
        <meta name="description" content="Bloom blood pressure tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.nav}>
        <h1>
          <Link href="/">🌸 Bloom Health</Link>
        </h1>

        <div className={styles.links}>
          {!user ? (
            <Link href="/login">
              <a>Log In</a>
            </Link>
          ) : (
            <Link href="/me">
              <a>Hello {user.email}</a>
            </Link>
          )}
        </div>
      </nav>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        © Dan Ruswick {new Date().getFullYear()}
      </footer>
    </div>
  );
}
