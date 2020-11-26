import React, { useState } from "react";
import { Textarea, Modal, Button } from "components/basic";
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
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [announce, { loading }] = useMutation(BROADCAST_NEWS);

    const handleAnnouncePress = () => {
        setError(null);
        if (announcement !== "")
            announce({ variables: { message: announcement } }).then(
                () => {
                    setSuccess(true);
                    setTimeout(onClose, 1000);
                },
                (err) => setError(err)
            );
        else {
            setError("Empty announcements are not allowed.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Post new annonuncement"
            style={modalStyle}
            footer={
                <Button
                    title="Announce"
                    icon={success ? "check" : ""}
                    type="success"
                    onClick={handleAnnouncePress}
                    isLoading={loading}
                    disabled={success}
                />
            }>
            <Textarea value={announcement} onChangeText={setAnnouncement} rows={5} resizable error={error} />
        </Modal>
    );
};
