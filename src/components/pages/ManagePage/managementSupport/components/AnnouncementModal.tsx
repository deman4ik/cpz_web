import React, { useState } from "react";
import { Textarea, Modal, Button } from "components/basic";
import styles from "../styles/AnnouncementModal.module.css";
import { useMutation } from "@apollo/client";
import { BROADCAST_NEWS } from "graphql/manage/mutations";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const modalStyle = {
    width: 600
};

export const AnnouncementModal = ({ isOpen, onClose }: Props): JSX.Element => {
    const [announcement, setAnnouncement] = useState("");
    const [announce, { loading }] = useMutation(BROADCAST_NEWS);

    const postAnnouncement = () => {
        if (announcement !== "")
            announce({ variables: { message: announcement } }).then(() => {
                onClose();
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Post new annonuncement"
            style={modalStyle}
            footer={<Button title="Announce" type="success" onClick={postAnnouncement} isLoading={loading} />}>
            <Textarea value={announcement} onChangeText={setAnnouncement} rows={5} resizable />
        </Modal>
    );
};
