import React from "react";

function AddSlideButtonComponent(): JSX.Element
{
    return (
        <button className="toolbar-button">
            <svg width="18" height="18" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.7647 4.41177C61.7647 1.97522 63.7399 0 66.1765 0H83.8235C86.2601 0 88.2353 1.97521 88.2353 4.41176V145.588C88.2353 148.025 86.2601 150 83.8235 150H66.1765C63.7399 150 61.7647 148.025 61.7647 145.588V4.41177Z" fill="#4A4949"/>
                <path d="M145.588 61.7647C148.025 61.7647 150 63.7399 150 66.1765V83.8235C150 86.2601 148.025 88.2353 145.588 88.2353H4.41176C1.97521 88.2353 0 86.2601 0 83.8235V66.1765C0 63.7399 1.97521 61.7647 4.41176 61.7647H145.588Z" fill="#4A4949"/>
            </svg>
        </button>
    );
}

export default AddSlideButtonComponent;