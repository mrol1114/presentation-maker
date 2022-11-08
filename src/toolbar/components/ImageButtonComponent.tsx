import React from "react";

function ImageButtonComponent()
{
    return (
        <button className="toolbar-button">
            <svg width="25" height="18" viewBox="0 0 231 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M175 15H55V135H175V15ZM55 0C46.7157 0 40 6.71573 40 15V135C40 143.284 46.7157 150 55 150H175C183.284 150 190 143.284 190 135V15C190 6.71573 183.284 0 175 0H55Z" fill="#4A4949"/>
                <path d="M135 75L164.444 123.75H105.555L135 75Z" fill="#4A4949"/>
                <path d="M86.0004 91L106.785 124H65.2158L86.0004 91Z" fill="#4A4949"/>
            </svg>
        </button>
    );
}

export default ImageButtonComponent;