import React from "react";
// components
import AreaChart from "components/charts/AreaChart";
// styles
import styles from "../../styles/Cell.module.css";

interface RobotChartCellProps {
    performance: Array<any>;
    height: number;
    style?: React.CSSProperties;
}

/*Ячейка с графиком*/
const RobotChartCell: React.FC<RobotChartCellProps> = ({ performance, height, style }) => {
    return (
        <div style={style} className={styles.robot_chart_cell}>
            <AreaChart height={height} data={performance} />
        </div>
    );
};

export default RobotChartCell;
