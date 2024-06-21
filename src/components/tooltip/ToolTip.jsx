/* eslint-disable react/prop-types */
import { useState } from 'react';
import './toolTip.scss';

export default function ToolTip({ message, children }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const toggleTooltipEnter = () => {
        setShowTooltip(true);
    };
    const toggleTooltipLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div
            className="tooltip"
            onMouseEnter={toggleTooltipEnter}
            onMouseLeave={toggleTooltipLeave}
        >
            <span className={`tooltip-text ${showTooltip ? 'visible' : ''}`}>
                {message}
            </span>
            {children}
        </div>
    );
}
