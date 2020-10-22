import React, { useState } from "react";

export function useCountChildren(children) {
    const kids = React.Children.toArray(children)
    const [step, setStep] = useState(0);

    const currentChild = kids[step]

    return { currentChild, kids, step, setStep }
}