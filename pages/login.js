import styles from "../styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/context";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setErr, setUser, setAlert } = useContext(userContext);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.succeeded) {
          setUser(r.data);
          router.push("/readings");
        } else {
          setAlert(r.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.toString());
      });
  };

  return (
    <div className={styles.loginPosition}>
      <form className={styles.form}>
        <input
          type="email"
          placeholder="email"
          className={styles.inputField}
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          className={styles.inputField}
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          className={styles.submit}
          onClick={handleLogin}
          type="submit"
          value="Log In"
        />
      </form>
      <Link href="/recover">
        <a className={styles.forgotLink}>Forgot your password?</a>
      </Link>
    </div>
  );
}
