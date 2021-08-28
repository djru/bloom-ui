import styles from "../styles/Home.module.css";
import { useContext } from "react";
import Link from "next/link";
import { userContext } from "../context/context";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useContext(userContext);
  const router = useRouter();
  if (user?.email) {
    router.push("/me");
    return;
  }
  return (
    <div className={styles.mainLayout}>
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
    </div>
  );
}
