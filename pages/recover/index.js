import styles from "../../styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/context";
import { useRouter } from "next/router";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const { setErr, setAlert, setUser } = useContext(userContext);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL + "/sendRecover");
    url.searchParams.append("email", email);
    fetch(url.toString(), {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setAlert(r.message);
        if (r.succeeded) {
          router.push("/");
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
          className={styles.submit}
          onClick={handleLogin}
          type="submit"
          value="Recover"
          disabled={!email.length}
        />
      </form>
    </div>
  );
}
