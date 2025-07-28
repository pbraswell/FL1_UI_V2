import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import styles from "./Dashboard.module.css";

export type DashboardType = {
  className?: string;
};

const Dashboard: FunctionComponent<DashboardType> = ({ className = "" }) => {
  return (
    <Box className={[styles.dashboard, className].join(" ")}>
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
      <img className={styles.logoIcon} alt="" src="/logo1@2x.png" />
      <Box className={styles.mainNavigationMenu}>
        <button className={styles.crosswindExposure}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-36.svg"
          />
          <div className={styles.fl1BlogAnd}>Pilot Dashboard</div>
        </button>
        <button className={styles.uploadLogbook}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-35.svg"
          />
          <div className={styles.fl1BlogAnd}>Upload Logbook</div>
        </button>
        <button className={styles.crosswindExposure}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-34.svg"
          />
          <div className={styles.fl1BlogAnd}>My Logbooks</div>
        </button>
        <button className={styles.crosswindExposure}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-33.svg"
          />
          <div className={styles.fl1BlogAnd}>Plane Management</div>
        </button>
        <button className={styles.fl1BlogAndPodcast}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-32.svg"
          />
          <div className={styles.fl1BlogAnd}>FL1 Blog and Podcast</div>
        </button>
        <button className={styles.logout}>
          <img
            className={styles.pilotDashboardChild}
            alt=""
            src="/frame-31.svg"
          />
          <div className={styles.fl1BlogAnd}>Logout</div>
        </button>
      </Box>
    </Box>
  );
};

export default Dashboard;
