import React from "react";

function BackgroundImageButtonComponent(): JSX.Element
{
    return (
        <button className="toolbar-button">
            <svg width="25" height="18" viewBox="0 0 231 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.9999 87L85.7127 129.75H30.2871L57.9999 87Z" fill="#4A4949"/>
                <path d="M121.5 67L158.306 130H84.6943L121.5 67Z" fill="#4A4949"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M208 15H23L23 135H208V15ZM23 0C14.7157 0 8 6.71573 8 15V135C8 143.284 14.7157 150 23 150H208C216.284 150 223 143.284 223 135V15C223 6.71573 216.284 0 208 0H23Z" fill="#4A4949"/>
                <path d="M199 43.5C199 56.4787 188.255 67 175 67C161.745 67 151 56.4787 151 43.5C151 30.5213 161.745 20 175 20C188.255 20 199 30.5213 199 43.5Z" fill="#4A4949"/>
            </svg>
        </button>
    );
}

export default BackgroundImageButtonComponent;