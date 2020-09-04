/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-key */
import React, { useState, useMemo, useCallback } from "react";
import { useTable } from "react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

import { Modal } from "../../Modal";
import { CheckBox } from "../../CheckBox";

import { Reorder } from "assets/icons/svg";

// styles
import headerStyles from "../styles/TableHeader.module.css";

const DND_ITEM_TYPE = "row";

const RowTemplate = ({ index, moveRow, children }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = dropRef.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: DND_ITEM_TYPE, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0.5 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    return (
        <tr ref={dropRef} style={{ opacity }}>
            <td ref={dragRef}>
                <Reorder />
            </td>
            {children}
        </tr>
    );
};

const NestedRow = ({ index, moveRow }) => {
    return <RowTemplate index={index} moveRow={moveRow}></RowTemplate>;
};

const GroupRow = ({ row, index, moveRow }) => {
    console.log(row);
    return (
        <RowTemplate index={index} moveRow={moveRow}>
            {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
        </RowTemplate>
    );
};

const buildVisibilityToggleCell = ({ row: { original: column } }) => {
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

export const ColumnControlModal = ({ title, columns, isModalVisible, toggleModal, setColumns }) => {
    const getRowId = useCallback((row) => {
        return row.id;
    }, []);
    const columnsSchema = useMemo(
        () => [
            {
                Header: "Visible",
                accessor: "isVisible",
                Cell: buildVisibilityToggleCell
            },
            { Header: "Column", accessor: "Header" }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns: columnsSchema,
        data: columns,
        getRowId
    });

    const moveGroupRow = (dragIndex, hoverIndex) => {
        const dragRecord = columns[dragIndex];
        setColumns(
            update(columns, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord]
                ]
            })
        );
    };

    const moveNestedRow = (groupColumn, dragIndex, hoverIndex) => {
        const dragRecord = groupColumn.original.columns[dragIndex];
        setColumns(
            columns.map((col) => {
                if (col === groupColumn)
                    return update(col.original.columns, {
                        $splice: [[dragIndex, 1], [(hoverIndex, 0, dragRecord)]]
                    });
                return col;
            })
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Modal isOpen={isModalVisible} title={title} onClose={toggleModal}>
                <table {...getTableProps()} style={{ color: "white" }}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={headerStyles.table_header_cell}>
                                <th />
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(
                            (row, index) =>
                                prepareRow(row) || (
                                    <GroupRow index={index} row={row} moveRow={moveGroupRow} {...row.getRowProps()} />
                                )
                        )}
                    </tbody>
                </table>
            </Modal>
        </DndProvider>
    );
};
