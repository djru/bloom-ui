import styles from "../../../styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/context";
import { useRouter } from "next/router";
import { passwordIsGood } from "../../../helpers/password";

export default function SetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");
  const { setErr, setAlert, setUser } = useContext(userContext);
  const router = useRouter();

  const handleRecover = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/recover", {
      method: "post",
      body: JSON.stringify({ email, password, recovery_id: id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setAlert(r.message);
        if (r.succeeded) {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.toString());
      });
  };

  useEffect(() => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
      setErr("No recovery id found. Please visit the link from the email");
    } else {
      setId(id);
    }
  }, [setId, setErr]);

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
        {passwordIsGood(password) ? null : (
          <label htmlFor="pw" className={styles.smallLabel}>
            Must be 8 chars, have a capital, a number and a special char
          </label>
        )}
        <input
          type="password"
          placeholder="new password"
          id="pw"
          className={styles.inputField}
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {password === confirmPassword && !!password ? null : (
          <label htmlFor="pw-conf" className={styles.smallLabel}>
            Passwords must match
          </label>
        )}
        <input
          type="password"
          placeholder="confirm password"
          id="pw-conf"
          className={styles.inputField}
          required={true}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <input
          type="text"
          disabled={true}
          className={styles.inputField}
          value={id}
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className={styles.submit}
          onClick={handleRecover}
          type="submit"
          value="Recover"
          disabled={
            !email.length ||
            !password.length ||
            password !== confirmPassword ||
            !recovery_id ||
            !passwordIsGood(password)
          }
        />
      </form>
    </div>
  );
}
