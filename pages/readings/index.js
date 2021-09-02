import styles from "../../styles/Me.module.css";
import Link from "next/link";
import useLogin from "../../hooks/useLogin";

export default function Me() {
  const user = useLogin();

  if (!user) {
    return null;
  }
  return (
    <>
      <h2>Your Readings</h2>
      {user.confirmed ? null : (
        <div>
          <h3>Your email is unconfirmed</h3>
          <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + "/resend"}>
            <a>Resend My Link</a>
          </Link>
        </div>
      )}
      <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + "/logout"}>
        <a className={styles.logout}>Log Out</a>
      </Link>
      <button className={styles.deleteMyData}>
        Delete My Account and All Data
      </button>
    </>
  );
}
