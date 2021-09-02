import styles from "../../../styles/Readings.module.css";
import Link from "next/link";
import useLogin from "../../../hooks/useLogin";
import { userContext } from "../../../context/context";
import { useState, useRef, useEffect, useContext } from "react";

export default function NewReading() {
  const user = useLogin();
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [pulse, setPulse] = useState(null);
  const [mood, setMood] = useState(null);

  const autoFocus = useRef();
  const { setErr, setUser, setAlert } = useContext(userContext);

  useEffect(() => {
    if (autoFocus.current) {
      autoFocus.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    console.log(top, bottom, pulse);
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/newReading", {
      method: "post",
      body: JSON.stringify({ top, bottom, pulse }),
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

  if (!user && process.env.NEXT_PUBLIC_ENV !== "dev") {
    return null;
  }
  return (
    <>
      <div className={styles.loginPosition}>
        <h2 className={styles.head}>Enter your blood pressure information:</h2>
        <form className={styles.form}>
          <input
            type="number"
            placeholder="systolic"
            ref={autoFocus}
            className={styles.inputField}
            required={true}
            onChange={(e) => {
              setTop(e.target.value);
            }}
          ></input>
          <input
            type="number"
            placeholder="diastolic"
            className={styles.inputField}
            required={true}
            onChange={(e) => {
              setBottom(e.target.value);
            }}
          ></input>
          <input
            type="number"
            placeholder="pulse"
            className={styles.inputField}
            required={true}
            onChange={(e) => {
              setPulse(e.target.value);
            }}
          ></input>
          <input
            className={styles.submit}
            onClick={handleSubmit}
            type="submit"
            value="Submit"
            disabled={!pulse || !top || !bottom}
          />
        </form>
      </div>
    </>
  );
}
