import React, { useState } from "react";

const Collapse = ({ title, content, className }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const collapseClass = isCollapsed ? "closed" : "opened";

    return (
        <article className={className}>
            <h4 onClick={handleClick} className={`collapse ${collapseClass}`}>
                {title}
                <i
                    className={`fas fa-chevron-up`}
                    style={{
                        transformOrigin: "center",
                        transform: `rotate(${
                            isCollapsed ? "0deg" : "-180deg"
                        })`,
                        transition: "all 0.3s ease-in-out",
                    }}
                ></i>
            </h4>
            <div
                className={`collapse-content ${collapseClass}`}
                style={{
                    maxHeight: isCollapsed ? "0" : "1000px",
                    transform: `scaleY(${isCollapsed ? 0 : 1})`,
                    transformOrigin: "top",
                    transition: "all 0.3s ease-in-out",
                }}
            >
                {content}
            </div>
        </article>
    );
};

export default Collapse;
