import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import styles from "./LandingPage.module.css";

const LandingPage: FunctionComponent = () => {
  return (
    <Box className={styles.landingPage}>
      <Box className={styles.heroFrame}>
        <header className={styles.topHeader}>
          <Box className={styles.menu}>
            <div className={styles.home}>Home</div>
            <a className={styles.blog}>Blog</a>
            <div className={styles.login}>Login</div>
          </Box>
        </header>
        <img className={styles.logoIcon} alt="" src="/logo1@2x.png" />
      </Box>
    </Box>
  );
};

export default LandingPage;
