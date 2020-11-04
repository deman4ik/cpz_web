import React, { Dispatch, FC, SetStateAction } from "react";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { Select } from "components/basic";
import { volumeTypeOptions } from "components/ui/Modals/helpers";
import { InputTypes, InputValues } from "components/ui/Modals/types";

interface SelectVolumeTypeProps {
    volumeType: string;
    onChangeVolumeType: Dispatch<SetStateAction<InputTypes>>;
    enabled: boolean;
    volumeTypeDescription: string;
}
export const SelectVolumeType: FC<SelectVolumeTypeProps> = ({
    volumeType,
    volumeTypeDescription,
    onChangeVolumeType,
    enabled
}) => {
    return (
        <div className={styles_subs.fieldset}>
            <div>
                <Select
                    data={volumeTypeOptions}
                    value={volumeType}
                    onChangeValue={onChangeVolumeType}
                    enabled={enabled}
                />
            </div>
            <div className={`${styles_subs.label} ${styles_subs.small}`}>{volumeTypeDescription}</div>
        </div>
    );
};
