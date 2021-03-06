import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/context";
import router from "next/router";

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

const Alert = ({ children }) => {
  const { setAlert } = useContext(userContext);
  return (
    <div
      className={styles.alert}
      onClick={() => {
        setAlert("");
      }}
    >
      {children}
    </div>
  );
};

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [alert, setAlert] = useState("");

  // on load, fetch the current user and set it as state
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV === "dev") {
      setUser({
        confirmed: true,
        email: "djruswick@outlook.com",
        id: 3,
      });
      return;
    }
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/whoami", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.succeeded) {
          setUser(r.data);
        } else {
          setUser(false);
        }
      })
      .catch((r) => {
        setUser(false);
      });
  }, []);

  // auto set the alert from the url
  useEffect(() => {
    const url = new URL(window.location);
    const alertMsg = url.searchParams.get("msg");
    if (alertMsg) {
      setAlert(alertMsg);
      // we want to delete the message portion so that the message does not show up again on reload
      // but we want to keep everything else
      url.searchParams.delete("msg");
      router.replace(`${url.pathname}?${url.searchParams.toString()}`);
    }
  }, []);

  // auto dismiss the errors and alerts after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      setErr("");
      setAlert("");
    }, 6000);
    return () => {
      clearTimeout(t);
    };
  }, [err, alert, setErr, setAlert]);

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
            <Link href="/">
              <a>
                ???? Bloom Health<sup>??</sup>
              </a>
            </Link>
          </h1>

          <div className={styles.links}>
            {!user ? (
              <>
                <Link href="/about">
                  <a style={{ marginRight: "2vw" }}>About</a>
                </Link>
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/readings">
                  <a className={styles.headerLink}>My Graph</a>
                </Link>
                <Link href="/readings/new">
                  <a className={styles.headerLink}>Add BP</a>
                </Link>
                <Link href="/me">
                  <a className={styles.headerLink}>My Account</a>
                </Link>
              </>
            )}
          </div>
        </nav>
        <userContext.Provider value={{ user, setUser, setErr, setAlert }}>
          {err.length ? <Error>{err}</Error> : null}
          {alert.length ? <Alert>{alert}</Alert> : null}
          <main className={styles.main}>{children}</main>
          {/* <footer className={styles.footer}>
            ?? Dan Ruswick {new Date().getFullYear()}
          </footer> */}
        </userContext.Provider>
      </div>
    </>
  );
}
