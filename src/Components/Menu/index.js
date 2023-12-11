import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';
import { MENUITEMS } from '@/contants';
import cx from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
export default function index() {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const handleMenuClick = (itemName) => {
        dispatch(menuItemClick(itemName));
    }

    const handleActionItemClick = (itemName) => {
        dispatch(actionItemClick(itemName));
    }
  return (
    <div className={styles.menuContainer}>
        <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENUITEMS.PENCIL})} onClick={() => handleMenuClick(MENUITEMS.PENCIL)}>
            <FontAwesomeIcon icon={faPencil} className={styles.icon}/>
        </div>
        <div className={cx(styles.iconWrapper, {[styles.active]: activeMenuItem === MENUITEMS.ERASER})} onClick={() => handleMenuClick(MENUITEMS.ERASER)}>
            <FontAwesomeIcon icon={faEraser} className={styles.icon} />
        </div>
        <div className={styles.iconWrapper} onClick={() => handleActionItemClick(MENUITEMS.UNDO)}>
            <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
        </div>
        <div className={styles.iconWrapper} onClick={() => handleActionItemClick(MENUITEMS.REDO)}>
            <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
        </div>
        <div className={styles.iconWrapper} onClick={() => handleActionItemClick(MENUITEMS.DOWNLOAD)}>
            <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
        </div>
    </div>
  )
}
