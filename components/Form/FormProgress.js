import {form_indicator, form_indicator_container} from '../../styles/Sidebar.module.css'

export function FormProgress({ steps, currentStep }) {

    function removeKeyPrefix(key) {
        return parseInt(key.replace(".", ""))
    }

    return (
        <div style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }} className={form_indicator_container}>
            {steps.map(({ key }) =>
                <span
                    className={
                        removeKeyPrefix(currentStep.key) >= removeKeyPrefix(key) && removeKeyPrefix(currentStep.key) > 0 ? form_indicator : null
                    }
                    key={key}
                >
                </span>
            )}
        </div>
    )
}