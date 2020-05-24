interface CheckboxProps {
    name: string;
    isActive: boolean;
    isLoading: boolean;
    disabled: boolean;
}

export interface NotificationProps {
    key: string;
    title: string;
    icon: string;
    checkboxes: CheckboxProps[];
}
