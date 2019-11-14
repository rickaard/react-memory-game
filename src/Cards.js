import React from 'react'

export const CardList = ({flippedProps, ...props}) => {


    return (
        <div {...flippedProps} className="flip-class">
        <div  className={`memory-card ${props.flipState ? 'flip' : ''}`} onClick={() => props.handleClick(props.itemIndex, props.cardItem)} style={{opacity: props.completeCards.includes(props.itemIndex)?'.3':'1'}}>
            <img
                className="front-face" 
                src={require(`./assets/${props.cardItem}.svg`)}
                alt={props.cardItem}
            />
            <img
                className="back-face"
                src={require("./assets/js-badge.svg")}
                alt="Javascript"
            />
        </div>
        </div>
    )
}

export default CardList;
