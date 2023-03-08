import styles from './Tabs.module.css';

interface Tabs {
  children: React.ReactNode;
  label: string;
}
const Tabs = ({ children, label }: Tabs) => {
  return (
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {children}
    </div>
  );
};

export default Tabs;
