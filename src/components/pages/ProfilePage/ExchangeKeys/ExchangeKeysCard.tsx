import React, { memo, useContext, useState } from "react";
import { Button } from "components/basic";
import { ModalKey } from "./types";
import { ChevronRightIcon } from "assets/icons/svg";
import { capitalize, exchangeName, truncate, getColor, formatMoney } from "config/utils";
import { color } from "config/constants";
import styles from "./ExchangeKeysCard.module.css";
import { useQuery } from "@apollo/client";
import { USER_ROBOTS_BY_EXCHANGE_ID } from "graphql/robots/queries";
import { AuthContext } from "libs/hoc/context";

interface Props {
    item: any;
    handleSetVisibleModal: (key: ModalKey, formOptions: any) => void;
}

const EDIT_TOOLTIP = "Enabled keys that have linked started robots cannot be edited.";
const DELETE_TOOLTIP = "Keys that have any robots linked cannot be removed.";

const _ExchangeKeysCard: React.FC<Props> = ({ item, handleSetVisibleModal }) => {
    const [editDisabled, setEditDisabled] = useState(false);
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    const [editTooltip, setEditTooltip] = useState(null);
    const [deleteTooltip, setDeleteTooltip] = useState(null);

    const handleOnPressEditName = () => {
        handleSetVisibleModal(ModalKey.editName, { name: item.name, id: item.id });
    };

    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const { data } = useQuery(USER_ROBOTS_BY_EXCHANGE_ID, {
        variables: {
            user_ex_acc_id: item ? item.id : null,
            user_id
        },
        onCompleted: () => {
            console.log(item);
            if (item) {
                const userHasNoRobots = data.user_robots.length === 0;

                if (!userHasNoRobots) {
                    setDeleteDisabled(true);
                    setDeleteTooltip(DELETE_TOOLTIP);
                }

                const everyRobotIsStoppedOrPaused = data.user_robots.every((el) =>
                    ["stopped", "paused"].includes(el.status)
                );

                const canEdit = item.status === "invalid" || userHasNoRobots || everyRobotIsStoppedOrPaused;

                if (!canEdit) {
                    setEditDisabled(true);
                    setEditTooltip(EDIT_TOOLTIP);
                }
            }
        }
    });

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
            <div>
                <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                    <div className={styles.exchangeCell}>
                        <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                            Exchange
                        </div>
                        <div className={styles.tableCellText}>{exchangeName(item.exchange)}</div>
                    </div>
                    <div className={styles.exchangeCell}>
                        <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                            Status
                        </div>
                        <div
                            className={styles.tableCellText}
                            style={{ color: getColor(["invalid", "disabled"].includes(item.status)) }}>
                            {capitalize(item.status)}
                        </div>
                    </div>
                    <div className={styles.exchangeCell}>
                        <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                            Balance
                        </div>
                        <div className={styles.tableCellText}>{formatMoney(item.balance)} $</div>
                    </div>
                    {item.error && (
                        <div className={styles.errorCell}>
                            <div className={[styles.errorCellText].join(" ")}>
                                <div>
                                    <div style={{ color: color.negative }}>&gt; {item.error}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.btnGroup}>
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
                    disabled={deleteDisabled}
                    tooltip={deleteTooltip}
                />
            </div>
        </div>
    );
};

export const ExchangeKeysCard = memo(_ExchangeKeysCard);
