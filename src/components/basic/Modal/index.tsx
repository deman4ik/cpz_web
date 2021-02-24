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
    contentHeight?: number | string;
    isFrame?: boolean;
}

export const Modal: React.FC<Props> = (props) => {
    const modalRef = useRef(null);
    const bodyRef = useRef(document.body);

    useEffect(() => {
        const body = bodyRef.current;
        if (props.isOpen) {
            body.classList.add(styles.noScroll);
        }
        return () => {
            body.classList.remove(styles.noScroll);
        };
    }, [props.isOpen]);

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
                <div
                    ref={modalRef}
                    className={`${styles.modal} ${props.className ? props.className : ""} ${
                        props.isFrame ? styles.noBackground : ""
                    }`}>
                    <ModalTemplate
                        title={props.title}
                        onClose={props.onClose}
                        footer={props.footer}
                        style={props.style}
                        contentHeight={props.contentHeight}
                        isFrame={props.isFrame}>
                        {props.children}
                    </ModalTemplate>
                </div>
            </div>
        </ClientOnlyPortal>
    );
};
