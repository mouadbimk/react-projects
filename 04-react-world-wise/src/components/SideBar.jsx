import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import FooterSideBar from "./FooterSideBar";
import styles from "./SideBar.module.css";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <FooterSideBar />
    </div>
  );
}
