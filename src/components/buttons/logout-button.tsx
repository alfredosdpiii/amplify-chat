import styles from "./button-styles.module.css";
export const LogoutButton = () => {
  return (
    <a className={styles.button} href="/api/auth/logout">
      Log Out
    </a>
  );
};
