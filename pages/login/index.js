import styles from "../../styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setErr } = useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://api.bloomhealth.app/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(console.log)
      .catch((err) => {
        console.log(err);
        setErr(err.toString());
      });
  };

  return (
    <>
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
    </>
  );
}
