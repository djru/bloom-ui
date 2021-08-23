import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/context";

const Error = ({ children }) => {
  const { setErr } = useContext(userContext);
  return (
    <div
      className={styles.error}
      onClick={() => {
        setErr("");
      }}
    >
      {children}
    </div>
  );
};

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("https://api.bloomhealth.app/whoami", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.status !== "failed") {
          setUser(r);
        }
      })
      .catch((r) => {
        console.error(r);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Bloom - BP Tracker</title>
        <meta name="description" content="Bloom blood pressure tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
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
                <a>Hello, {user.email}</a>
              </Link>
            )}
          </div>
        </nav>
        <userContext.Provider value={{ user, setUser, setErr }}>
          {err.length ? <Error>{err}</Error> : null}
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            © Dan Ruswick {new Date().getFullYear()}
          </footer>
        </userContext.Provider>
      </div>
    </>
  );
}
