import React, { useEffect, useRef } from "react";

import { ModalTemplate } from "./ModalTemplate";
import ClientOnlyPortal from "../../../libs/ClientOnlyPortal";
import styles from "./index.module.css";

interface Props {
    isOpen: boolean;
    children?: React.ReactNode;
    onClose: React.MouseEventHandler;
    title?: string;
    style?: React.CSSProperties;
}

export const Modal: React.FC<Props> = (props) => {
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.onClose(event);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, props]);
    if (!props.isOpen) return null;
    return (
        <ClientOnlyPortal selector="#modal">
            <div className={styles.backdrop}>
                <div ref={modalRef} className={styles.modal} style={props.style}>
                    <ModalTemplate title={props.title} onClose={props.onClose}>
                        {props.children}
                    </ModalTemplate>
                </div>
            </div>
        </ClientOnlyPortal>
    );
};
