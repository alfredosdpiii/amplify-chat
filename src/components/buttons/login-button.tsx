import styles from "./button-styles.module.css";
export const LoginButton = () => {
  return (
    <a className={styles.button} href="/api/auth/login">
      Log In
    </a>
  );
};
