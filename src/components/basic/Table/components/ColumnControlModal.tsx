/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useCallback } from "react";

import { Modal } from "../../Modal";
import { CheckBox } from "../../CheckBox";

import { ArrowUpIcon, ArrowDownIcon } from "assets/icons/svg";

// styles
import headerStyles from "../styles/TableHeader.module.css";

const VisibilityToggleCell = ({ column }) => {
    let isVisible = false;
    let toggleHidden;

    // the column references a group header
    if (column.columns) {
        column.columns.forEach((col) => {
            if (col.isVisible) isVisible = true;
        });
        toggleHidden = () =>
            column.columns.forEach((col) => {
                if (col.isVisible === isVisible) col.toggleHidden();
            });
    }
    // the column references data row
    else {
        isVisible = column.isVisible;
        toggleHidden = column.toggleHidden;
    }

    return <CheckBox checked={isVisible} onClick={toggleHidden} />;
};

const Row = ({ key, column, moveRowUp, moveRowDown }) => {
    return (
        <tr key={key}>
            <td>
                <div>
                    <span onClick={moveRowUp}>
                        <ArrowUpIcon />
                    </span>
                    <span onClick={moveRowDown}>
                        <ArrowDownIcon />
                    </span>
                </div>
            </td>
            <td>
                <VisibilityToggleCell column={column} />
            </td>
            <td>{column.Header}</td>
        </tr>
    );
};

enum MoveDirection {
    up,
    down
}

export const ColumnControlModal = ({ title, columns, isModalVisible, toggleModal, setColumns }) => {
    const moveGroup = (rowIdx: number, direction: MoveDirection) => {
        const newCols = columns;
        const row = newCols[rowIdx];

        if (direction === MoveDirection.up) {
            if (rowIdx === 0) return;
            newCols[rowIdx] = newCols[rowIdx - 1];
            newCols[rowIdx - 1] = row;
        } else {
            if (rowIdx === newCols.length - 1) return;
            newCols[rowIdx] = newCols[rowIdx + 1];
            newCols[rowIdx + 1] = row;
        }
        setColumns(newCols);
    };

    const moveRow = (groupIdx: number, rowIdx: number, direction: MoveDirection) => {
        const newCols = columns;
        const group = newCols[groupIdx].columns;
        const row = group[rowIdx];

        if (direction === MoveDirection.up) {
            if (rowIdx === 0) return;
            group[rowIdx] = group[rowIdx - 1];
            group[rowIdx - 1] = row;
        } else {
            if (rowIdx === group.length - 1) return;
            group[rowIdx] = group[rowIdx + 1];
            group[rowIdx + 1] = row;
        }
        setColumns(newCols);
    };

    return (
        <Modal
            isOpen={isModalVisible}
            title={title}
            onClose={toggleModal}
            style={{ maxHeight: "80%", overflowY: "scroll" }}>
            <table style={{ color: "white" }}>
                <tbody>
                    {columns.map((group, i) => (
                        <>
                            <Row
                                key={i}
                                column={group}
                                moveRowUp={() => moveGroup(i, MoveDirection.up)}
                                moveRowDown={() => moveGroup(i, MoveDirection.down)}
                            />
                            <tr key={`child_${i}`}>
                                <td />
                                <td>
                                    <table style={{ margin: 0 }}>
                                        <th />
                                        {group.columns.map((column, j) => (
                                            <Row
                                                key={`${j}`}
                                                column={column}
                                                moveRowUp={() => moveRow(i, j, MoveDirection.up)}
                                                moveRowDown={() => moveRow(i, j, MoveDirection.down)}
                                            />
                                        ))}
                                    </table>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </Modal>
    );
};
