import styles from "./button-styles.module.css";
export const SignupButton = () => {
  return (
    <a className={styles.button} href="/api/auth/signup">
      Sign Up
    </a>
  );
};
