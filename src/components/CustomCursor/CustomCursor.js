import React, {useState, useEffect} from 'react';
import "./CustomCursor.css";
const CustomCursor = () => {
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(()=> {
        const moveCursor = (e) => {
            const {clientX: x , clientY: y}= e;
            setPosition({x, y});
        };
        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
        };
    },[ ])
    return (
        <div className="custom-cursor" style={{left:`${position.x}px`, top: `${position.y}px`}} />
    )
}
 

export default CustomCursor;