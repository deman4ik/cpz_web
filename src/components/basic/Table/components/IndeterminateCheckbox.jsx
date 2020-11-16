import { CheckBox } from "components/basic";
import React, { forwardRef, useEffect, useRef } from "react";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    
    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <CheckBox ref={resolvedRef} {...rest} />
        </>
    );
});

export default IndeterminateCheckbox;
