import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
