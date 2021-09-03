import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutBlurb}>
      <h1>About Bloom</h1>
      <p>
        Bloom is a tool to help you monitor and visualize your blood pressue.
        This is a personal project by me,{" "}
        <a href="https://github.com/djru">Dan</a> to serve a need in my own life
        and to try out a new tech stack.
      </p>
      <p>
        Bloom is and will remain IN BETA. The tool is public and can be used by
        anyone, but no guarentees are made about functionality, data retention,
        bug fixes, or features.
      </p>
      <p>
        I reserve the right to change the service at any time, add
        remove/features, or take the service offline entirely.
      </p>
    </div>
  );
}
