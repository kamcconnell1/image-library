import classNames from 'classnames';
import styles from './Tab.module.css';

interface TabProps {
  id: string;
  selectedTabId: string;
  title: string;
  onClick: (id: string) => void;
}

const Tab = ({ id, selectedTabId, title, onClick }: TabProps) => {
  const isSelected = selectedTabId === id;
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      id={id}
      className={classNames(styles.tab, { [styles.selected]: isSelected })}
      onClick={() => onClick(id)}>
      <span>{title}</span>
    </button>
  );
};

export default Tab;
