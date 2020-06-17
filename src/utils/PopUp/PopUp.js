import React, { useEffect, useState, useRef } from "react";
import './PopUp.css'

const PopUp = ({ children, openPop }) => {

    const node = useRef();
    const [open, setOpen] = useState(true);
    let popUpClickHandler = (e) => {
        // console.log("click inside");
        if (node.current.contains(e.target)) {
            return;
        }

        //outside click
        // console.log("click outside")
        setOpen(false);
        openPop(open);
    }
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", popUpClickHandler, false);
        } else {
            document.removeEventListener("mousedown", popUpClickHandler, false);
        }
        return () => {
            document.removeEventListener("mousedown", popUpClickHandler, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        < div className="util-popup-container" >
            <div className="util-popup-inner" ref={node}
                style={open ? { animation: 'animatebottomSetPopUp 0.4s ease' } : { animation: 'animatebottomDisappearPopUp 0.4s ease' }}
            >
                {console.log(open)}
                {children}
            </div>
        </div >
    );


}


export default PopUp;