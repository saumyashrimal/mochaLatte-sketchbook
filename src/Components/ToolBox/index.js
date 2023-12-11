
import styles from './styles.module.css';
import { COLORS, MENUITEMS } from '@/contants';
import {useSelector, useDispatch} from 'react-redux';
import { changeColor, changeBrushSize } from '@/slice/toolboxSlice';
import cx from 'classnames';

const ToolBox = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)
    const showStrokeToolOption = activeMenuItem === MENUITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENUITEMS.PENCIL || activeMenuItem === MENUITEMS.ERASER;
    const {color,size} = useSelector((state) => state.toolbox[activeMenuItem]);
    const updateBrushSize = (e) => {
        dispatch(changeBrushSize({item: activeMenuItem, size: e.target.value}));
    }
    const updateColor = (newColor) => {
        dispatch(changeColor({item: activeMenuItem, color: newColor}));
    }
    return(
        <div className={styles.toolBoxContainer}>
            {showStrokeToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Stroke Color</h4>
                <div className={styles.itemContainer}>
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLACK})} style={{backgroundColor: COLORS.BLACK}} onClick={() => updateColor(COLORS.BLACK)} />
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.RED})} style={{backgroundColor: COLORS.RED}} onClick={() => updateColor(COLORS.RED)}/>
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.GREEN})} style={{backgroundColor: COLORS.GREEN}} onClick={() => updateColor(COLORS.GREEN)}/>
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLUE})} style={{backgroundColor: COLORS.BLUE}} onClick={() => updateColor(COLORS.BLUE)}/>
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.ORANGE})} style={{backgroundColor: COLORS.ORANGE}} onClick={() => updateColor(COLORS.ORANGE)}/>
                    <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.WHITE})} style={{backgroundColor: COLORS.WHITE}} onClick={ () => updateColor(COLORS.WHITE)}/>
                </div>
            </div>}
            {showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size</h4>
                <div className={styles.itemContainer}>
                    <input type="range" min={1} max={10} step={1} onChange={updateBrushSize} value={size}/>
                </div>
            </div>}
        </div>
    )
}

export default ToolBox;