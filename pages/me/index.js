import { userContext } from "../../context/context";
import { useContext, useEffect } from "react";
import styles from "../../styles/Me.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { user, setErr } = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    if (!user?.email) {
      setErr("You are not logged in");
      router.push("/");
    }
  }, [router, setErr, user]);

  return (
    <>
      <h2>Hello {user?.email}</h2>
      {user?.confirmed ? null : <h3>Your email is unconfirmed</h3>}
      <Link href="https://api.bloomhealth.app/logout">
        <a>Log Out</a>
      </Link>
      <button className={styles.deleteMyData}>
        Delete My Account and All Data
      </button>
    </>
  );
  return <></>;
}
