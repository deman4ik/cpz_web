import React from "react";
// components
import AreaChart from "components/charts/AreaChart";
// styles
import styles from "../../styles/Common.module.css";

interface RobotChartCellProps {
    performance: Array<any>;
    height: number;
    profit: number;
    style?: React.CSSProperties;
}

/*Ячейка с графиком*/
const RobotChartCell: React.FC<RobotChartCellProps> = ({ performance, height, profit, style }) => {
    return (
        <div style={style} className={styles.robot_chart_cell}>
            <AreaChart height={height} positive={profit > 0} data={performance} />
        </div>
    );
};

export default RobotChartCell;
