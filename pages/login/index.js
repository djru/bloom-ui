import Layout from "../../components/layout";
import styles from "../../styles/Login.module.css";
import { useEffect, useState } from "next";

export default function Login() {
  return (
    <form className={styles.form}>
      <input
        type="email"
        placeholder="email"
        className={styles.inputField}
      ></input>
      <input
        type="password"
        placeholder="password"
        className={styles.inputField}
      ></input>
      <button className={styles.submit}>Log In</button>
    </form>
  );
}
