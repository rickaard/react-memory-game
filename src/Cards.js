import React, { useState } from 'react';



const Cards = ({cards, setCards}) => {
    const [flip, setFlip] = useState(true);

    const handleClick = (cards) => {
        // console.log('klick från cards.js')
        setFlip(true);
        setCards(cards);
    }

    return (
        <div className={`memory-card ${flip ? 'flip' : ''}`} onClick={() => handleClick(cards)}>
            <img
                className="front-face" 
                src={require(`./assets/${cards}.svg`)}
                alt={cards}
            />
            <img
                className="back-face"
                src={require("./assets/js-badge.svg")}
                alt="Javascript"
            />
        </div>
    )
};

export default Cards