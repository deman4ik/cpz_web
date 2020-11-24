import React, { memo, useContext, useEffect, useState } from "react";

import { Button } from "components/basic";
import { ModalKey } from "./types";
import { ChevronRightIcon } from "assets/icons/svg";
import { capitalize, exchangeName, truncate, getColor } from "config/utils";
import { color } from "config/constants";
import styles from "./ExchangeKeysCard.module.css";
import { useQuery } from "@apollo/client";
import { USER_ROBOTS_BY_EXCHANGE_ID } from "graphql/robots/queries";
import { AuthContext } from "libs/hoc/context";

interface Props {
    item: any;
    handleSetVisibleModal: (key: ModalKey, formOptions: any) => void;
}

const _ExchangeKeysCard: React.FC<Props> = ({ item, handleSetVisibleModal }) => {
    const [editDisabled, setEditDisabled] = useState(false);
    const [editTooltip, setEditTooltip] = useState(null);

    const handleOnPressEditName = () => {
        handleSetVisibleModal(ModalKey.editName, { name: item.name, id: item.id });
    };

    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const { data: dataCheck, loading: loadingCheck } = useQuery(USER_ROBOTS_BY_EXCHANGE_ID, {
        variables: {
            user_ex_acc_id: item ? item.id : null,
            user_id
        }
    });

    useEffect(() => {
        if (!loadingCheck && item) {
            const everyRobotIsStoppedOrPaused = dataCheck.user_robots.every((el) =>
                ["stopped", "paused"].includes(el.status)
            );
            const canEdit =
                item.status === "invalid" || dataCheck.user_robots.length === 0 || everyRobotIsStoppedOrPaused;
            if (!canEdit) {
                setEditDisabled(true);
                setEditTooltip(
                    "Enabled keys that have linked robots with 'starting', 'started' or 'stopping' status cannot be edited"
                );
            }
        }
    }, [item, loadingCheck, dataCheck]);

    const handlePressEdit = () => {
        handleSetVisibleModal(ModalKey.addKey, {
            name: item.name,
            id: item.id,
            exchange: item.exchange,
            status: item.status
        });
    };

    const handlePressDelete = () => {
        handleSetVisibleModal(ModalKey.deleteKey, { name: item.name, id: item.id });
    };

    return (
        <div className={styles.container}>
            <div className={[styles.row, styles.topPart].join(" ")}>
                <div className={styles.name}>
                    <div className={styles.tableCellText}>{truncate(item.name, 30)}</div>
                </div>
                <div className={styles.btn}>
                    <Button isUppercase size="small" icon="bordercolor" onClick={handleOnPressEditName} />
                </div>
            </div>
            <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                <div>
                    <div className={styles.exchangeRow}>
                        <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                            Exchange
                        </div>
                        <div className={styles.tableCellText} style={{ marginLeft: 10 }}>
                            {exchangeName(item.exchange)}
                        </div>
                    </div>
                    <div className={styles.exchangeRow} style={{ marginTop: 10 }}>
                        <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                            Status
                        </div>
                        <div
                            className={styles.tableCellText}
                            style={{ marginLeft: 10, color: getColor(item.status === "invalid") }}>
                            {capitalize(item.status)}
                        </div>
                    </div>
                </div>
            </div>
            {item.status === "invalid" && item.error && (
                <div className={[styles.rowError, styles.errorGroup].join(" ")}>
                    <ChevronRightIcon color={color.negative} size={26} />
                    <div>
                        <div style={{ color: color.negative }}>{item.error}</div>
                    </div>
                </div>
            )}
            <div className={[styles.row, styles.btnGroup].join(" ")}>
                <Button
                    title="Edit"
                    width={77}
                    icon="settings"
                    size="small"
                    type="dimmed"
                    onClick={handlePressEdit}
                    disabled={editDisabled}
                    tooltip={editTooltip}
                />
                <Button
                    title="Delete"
                    width={77}
                    icon="close"
                    size="small"
                    type="dimmed"
                    style={{ marginLeft: 6 }}
                    onClick={handlePressDelete}
                />
            </div>
        </div>
    );
};

export const ExchangeKeysCard = memo(_ExchangeKeysCard);
