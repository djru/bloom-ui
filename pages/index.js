import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className={styles.bloomHead}>
        <span className={styles.bloom}>Bloom</span> helps you manage your blood
        pressure.
      </h1>
      <h2 className={styles.bloomSub}>
        Track, analyze, and export your readings
      </h2>
      <Link href="/signup">
        <a className={styles.signupLink}>Sign Up</a>
      </Link>
    </>
  );
}
