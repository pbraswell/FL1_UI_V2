import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import styles from "./MainNavigationMenu.module.css";

export type MainNavigationMenuType = {
  className?: string;
};

const MainNavigationMenu: FunctionComponent<MainNavigationMenuType> = ({
  className = "",
}) => {
  return (
    <Box className={[styles.mainNavigationMenu, className].join(" ")}>
      <button className={styles.pilotDashboard}>
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
      <button className={styles.pilotDashboard}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-33.svg"
        />
        <div className={styles.fl1BlogAnd}>Crosswind Exposure</div>
      </button>
      <button className={styles.pilotDashboard}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-34.svg"
        />
        <div className={styles.fl1BlogAnd}>Proficiency Flight Tasks</div>
      </button>
      <button className={styles.pilotDashboard}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-37.svg"
        />
        <div className={styles.fl1BlogAnd}>Crosswind Training</div>
      </button>
      <img className={styles.menuDividerIcon} alt="" src="/menu-divider.svg" />
      <button className={styles.pilotDashboard}>
        <img className={styles.pilotDashboardChild} alt="" src="/frame-3.svg" />
        <div className={styles.fl1BlogAnd}>Pilot Information</div>
      </button>
      <button className={styles.pilotDashboard}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-38.svg"
        />
        <div className={styles.fl1BlogAnd}>Account and Settings</div>
      </button>
      <button className={styles.pilotDashboard}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-31.svg"
        />
        <div className={styles.fl1BlogAnd}>FL1 Blog and Help</div>
      </button>
      <button className={styles.logout}>
        <img
          className={styles.pilotDashboardChild}
          alt=""
          src="/frame-32.svg"
        />
        <div className={styles.logout1}>Logout</div>
      </button>
    </Box>
  );
};

export default MainNavigationMenu;
