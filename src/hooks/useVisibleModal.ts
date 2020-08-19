import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { MODAL_VISIBLE } from "../graphql/local/queries";
import { SET_MODAL_VISIBLE } from "../graphql/local/mutations";

export const useVisibleModal = () => {
    const [titleModal, setTitleModal] = useState(null);
    const { data: dataModal } = useQuery(MODAL_VISIBLE);
    const [setVisibleModal] = useMutation(SET_MODAL_VISIBLE);

    const handleSetVisible = () => {
        setVisibleModal({ variables: { isVisible: false, type: "" } });
    };

    return {
        titleModal,
        setTitleModal,
        handleSetVisible,
        dataModal: !dataModal ? { ModalVisible: { isVisible: false, type: "" } } : dataModal
    };
};
