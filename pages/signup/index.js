import styles from "../../styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/context";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setErr, setAlert, setUser } = useContext(userContext);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://api.bloomhealth.app/signup", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.succeeded) {
          setUser(r.data);
          router.push("/me");
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
          type="password"
          placeholder="confirm password"
          className={styles.inputField}
          required={true}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <input
          className={styles.submit}
          onClick={handleLogin}
          type="submit"
          value="Sign Up"
          disabled={
            !email.length ||
            !confirmPassword.length ||
            confirmPassword !== password
          }
        />
      </form>
    </div>
  );
}
