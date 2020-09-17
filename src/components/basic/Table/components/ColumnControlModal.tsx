/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";

// components
import { Modal } from "../../Modal";
import { CheckBox } from "../../CheckBox";
import { Button } from "components/basic/Button";
//icons
import { ArrowUpIcon, ArrowDownIcon } from "assets/icons/svg";

// styles
import modalStyles from "../styles/ControlModal.module.css";

interface ModalProps {
    title: string;
    columns: any;
    isModalVisible: boolean;
    toggleModal: () => void;
    setColumns: (columns) => void;
}

enum MoveDirection {
    up,
    down
}

export const ColumnControlModal = (props: ModalProps): JSX.Element => {
    const { title, columns, isModalVisible, toggleModal, setColumns } = props;

    const [colsState, setColsState] = useState(columns);
    const saveChanges = () => setColumns(colsState);

    const moveGroup = (rowIdx: number, direction: MoveDirection) => {
        const newColsState = [...colsState];
        const row = newColsState[rowIdx];

        if (direction === MoveDirection.up) {
            if (rowIdx === 0) return;
            newColsState[rowIdx] = newColsState[rowIdx - 1];
            newColsState[rowIdx - 1] = row;
        } else {
            if (rowIdx === newColsState.length - 1) return;
            newColsState[rowIdx] = newColsState[rowIdx + 1];
            newColsState[rowIdx + 1] = row;
        }
        setColsState(newColsState);
    };

    const moveRow = (groupIdx: number, rowIdx: number, direction: MoveDirection) => {
        const newColsState = [...colsState];
        const group = newColsState[groupIdx].columns;
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
        setColsState(newColsState);
    };

    const GroupVisibilityCell = ({ groupIdx, groupColumn }) => {
        const isVisible = groupColumn.columns.map((col) => col.isVisible).includes(true);

        const toggleVisibility = () => {
            const groupCols = [...groupColumn.columns];
            groupCols.forEach((col) => {
                col.isVisible = !isVisible;
            });
            setColsState(
                colsState.map((col, i) => {
                    if (i === groupIdx) return { ...groupColumn, columns: groupCols };
                    return col;
                })
            );
        };
        return (
            <span className={modalStyles.checkbox}>
                <CheckBox checked={isVisible} onClick={toggleVisibility} />
            </span>
        );
    };

    const ColumnVisibilityCell = ({ groupIdx, rowIdx, groupColumn, column }) => {
        const { isVisible } = column;
        const toggleVisibility = () => {
            const groupCols = [...groupColumn.columns];
            groupCols[rowIdx] = { ...column, isVisible: !isVisible };
            setColsState(
                colsState.map((group, i) => {
                    if (i === groupIdx) return { ...group, columns: groupCols };
                    return group;
                })
            );
        };

        return (
            <span className={modalStyles.checkbox}>
                <CheckBox checked={isVisible} onClick={toggleVisibility} />
            </span>
        );
    };

    const GroupRow = ({ groupIdx, groupColumn, moveRowUp, moveRowDown }) => {
        return (
            <div className={`${modalStyles.row_item} ${modalStyles.group_head}`}>
                <div className={modalStyles.order_arrows_group}>
                    {groupIdx !== 0 ? (
                        <span onClick={moveRowUp} className={modalStyles.order_arrow} title="Move up">
                            <ArrowUpIcon size={20} />
                        </span>
                    ) : null}
                    {groupIdx !== columns.length - 1 ? (
                        <span onClick={moveRowDown} className={modalStyles.order_arrow} title="Move down">
                            <ArrowDownIcon size={20} />
                        </span>
                    ) : null}
                </div>
                <GroupVisibilityCell groupIdx={groupIdx} groupColumn={groupColumn} />
                {groupColumn.Header}
            </div>
        );
    };

    const Row = ({ groupIdx, rowIdx, groupColumn, column, moveRowUp, moveRowDown }) => {
        return (
            <div className={modalStyles.row_item}>
                <div className={modalStyles.order_arrows_group}>
                    {rowIdx !== 0 ? (
                        <span onClick={moveRowUp} className={modalStyles.order_arrow} title="Move up">
                            <ArrowUpIcon size={20} />
                        </span>
                    ) : null}
                    {rowIdx !== colsState[groupIdx].columns.length - 1 ? (
                        <span onClick={moveRowDown} className={modalStyles.order_arrow} title="Move down">
                            <ArrowDownIcon size={20} />
                        </span>
                    ) : null}
                </div>

                <ColumnVisibilityCell groupIdx={groupIdx} rowIdx={rowIdx} groupColumn={groupColumn} column={column} />

                {column.Header}
            </div>
        );
    };

    return (
        <Modal
            isOpen={isModalVisible}
            title={title}
            onClose={toggleModal}
            className={modalStyles.modal}
            footer={
                <>
                    <Button
                        title="Apply"
                        icon="check"
                        onClick={() => {
                            saveChanges();
                            toggleModal();
                        }}
                        className="success"
                    />
                    <Button title="Discard" icon="close" onClick={toggleModal} className="dimmed" />
                </>
            }>
            <div className={modalStyles.body}>
                {colsState.map((groupColumn, i) => (
                    <div key={`group_${i}`}>
                        <GroupRow
                            groupIdx={i}
                            groupColumn={groupColumn}
                            moveRowUp={() => moveGroup(i, MoveDirection.up)}
                            moveRowDown={() => moveGroup(i, MoveDirection.down)}
                        />
                        <div className={modalStyles.row_group}>
                            {groupColumn.columns.map((column, j) => (
                                <Row
                                    key={column.id}
                                    groupIdx={i}
                                    rowIdx={j}
                                    groupColumn={groupColumn}
                                    column={column}
                                    moveRowUp={() => moveRow(i, j, MoveDirection.up)}
                                    moveRowDown={() => moveRow(i, j, MoveDirection.down)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};
