import React, { useEffect, useRef } from "react";

import { ModalTemplate } from "./ModalTemplate";
import ClientOnlyPortal from "libs/ClientOnlyPortal";
import styles from "./index.module.css";

interface Props {
    isOpen: boolean;
    children?: React.ReactNode;
    onClose: React.MouseEventHandler;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    footer?: JSX.Element;
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
                <div ref={modalRef} className={`${styles.modal} ${props.className}`}>
                    <ModalTemplate
                        title={props.title}
                        onClose={props.onClose}
                        footer={props.footer}
                        style={props.style}>
                        {props.children}
                    </ModalTemplate>
                </div>
            </div>
        </ClientOnlyPortal>
    );
};
