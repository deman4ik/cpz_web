import React, { Dispatch, FC, SetStateAction } from "react";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { Select } from "components/basic";
import { InputTypes, VolumeTypeOption } from "components/ui/Modals/types";

interface SelectVolumeTypeProps {
    volumeType: string;
    onChangeVolumeType: Dispatch<SetStateAction<InputTypes>>;
    enabled: boolean;
    width?: number;
    volumeTypeDescription: string;
    volumeTypeOptions: VolumeTypeOption[];
}
export const SelectVolumeType: FC<SelectVolumeTypeProps> = ({
    volumeType,
    onChangeVolumeType,
    enabled,
    width,
    volumeTypeOptions
}) => {
    return (
        <div className={styles_subs.fieldset}>
            <div>
                <Select
                    width={width}
                    data={volumeTypeOptions}
                    value={volumeType}
                    onChangeValue={onChangeVolumeType}
                    enabled={enabled}
                />
            </div>
        </div>
    );
};
