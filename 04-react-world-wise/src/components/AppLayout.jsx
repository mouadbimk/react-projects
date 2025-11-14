import SideBar from "./SideBar";
import styles from "./AppLayout.module.css";
import Map from "./Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
