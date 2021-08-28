import styles from "../../styles/Me.module.css";
import Link from "next/link";
import useLogin from "../../hooks/useLogin";

export default function Home() {
  const user = useLogin();

  if (!user) {
    return null;
  }
  return (
    <>
      <h2>Hello {user.email}</h2>
      {user.confirmed ? null : <h3>Your email is unconfirmed</h3>}
      <Link href="https://api.bloomhealth.app/logout" className={styles.logout}>
        <a>Log Out</a>
      </Link>
      <button className={styles.deleteMyData}>
        Delete My Account and All Data
      </button>
    </>
  );
}
