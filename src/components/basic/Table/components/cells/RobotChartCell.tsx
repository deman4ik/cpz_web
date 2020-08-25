import React from "react";
// components
import AreaChart from "components/charts/AreaChart";
// styles
import styles from "./Cells.module.css";

interface RobotChartCellProps {
    perfomance: Array<any>;
    height: number;
    profit: number;
    style: React.CSSProperties;
}

const RobotChartCell: React.FC<RobotChartCellProps> = ({ perfomance, height, profit, style }) => {
    return (
        <div style={style} className={styles.robot_chart_cell}>
            <AreaChart height={height} positive={profit > 0} data={perfomance} />
        </div>
    );
};

export default RobotChartCell;
