import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import MainNavigationMenu from "./MainNavigationMenu";
import styles from "./Dashboard.module.css";

const Dashboard: FunctionComponent = () => {
  return (
    <Box className={styles.dashboard}>
      <Box className={styles.leftNavFrame} />
      <Box className={styles.pilotDashboard}>
        <Box className={styles.container}>
          <Box className={styles.experienceSummary} />
          <Box className={styles.smallCards}>
            <Box className={styles.dayTimeWindow} />
            <Box className={styles.dayTimeWindow} />
            <Box className={styles.dayTimeWindow} />
          </Box>
        </Box>
      </Box>
      <img className={styles.logoIcon} alt="" src="/logo@2x.png" />
      <MainNavigationMenu />
    </Box>
  );
};

export default Dashboard;
