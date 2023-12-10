
import styles from './styles.module.css';
import { COLORS, MENUITEMS } from '@/contants';
import {useSelector} from 'react-redux';

const ToolBox = () => {
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem === MENUITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENUITEMS.PENCIL || activeMenuItem === MENUITEMS.ERASER;
    const updateBrushSize = () => {

    }
    return(
        <div className={styles.toolBoxContainer}>
            {showStrokeToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Stroke Color</h4>
                <div className={styles.itemContainer}>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}}/>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.RED}}/>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.GREEN}}/>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}}/>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.ORANGE}}/>
                    <div className={styles.colorBox} style={{backgroundColor: COLORS.WHITE}}/>
                </div>
            </div>}
            {showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size {activeMenuItem}</h4>
                <div className={styles.itemContainer}>
                    <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} />
                </div>
            </div>}
        </div>
    )
}

export default ToolBox;