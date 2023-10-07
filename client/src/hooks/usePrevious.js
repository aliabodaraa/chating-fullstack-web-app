import { useRef } from "react";

const usePrevious = (value) => {
    let currentValue = useRef(value);
    let previousValue = useRef();

    if (currentValue.current !== value) {
        previousValue.current = currentValue.current;
        currentValue.current = value;
    }
    //console.log("currentValue----previousValue", currentValue, "--", previousValue)

    return currentValue.current !== previousValue.current;
}

export default usePrevious;