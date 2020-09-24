import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { MODAL_VISIBLE } from "../graphql/local/queries";
import { SET_MODAL_VISIBLE } from "../graphql/local/mutations";

export const useVisibleModal = (): any => {
    const [titleModal, setTitleModal] = useState(null);
    const { data: dataModal } = useQuery(MODAL_VISIBLE);
    const [setModalVisibility] = useMutation(SET_MODAL_VISIBLE);

    const handleSetVisible = () => {
        setModalVisibility({ variables: { isVisible: false, type: "" } });
    };

    return {
        titleModal,
        setTitleModal,
        handleSetVisible,
        dataModal: !dataModal ? { ModalVisible: { isVisible: false, type: "" } } : dataModal
    };
};
