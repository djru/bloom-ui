import { userContext } from "../../context/context";
import { useContext } from "react";
import styles from "../../styles/Me.module.css";
import { Link } from "next/link";

export default function Home() {
  const { user } = useContext(userContext);
  if (!user?.email) {
    return <h1>Not Logged In</h1>;
  }
  return (
    <>
      <h2>Hello {user.email}</h2>
      {user.confirmed ? null : <h3>Your email is unconfirmed</h3>}
      <Link href="#">
        <a>Log Out</a>
      </Link>
      <button className={styles.deleteMyData}>
        Delete My Account and All Data
      </button>
    </>
  );
}
