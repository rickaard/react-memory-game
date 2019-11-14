import React from 'react'

export const CardList = ({flippedProps, ...props}) => {

    const borderStyling = {
        animationName: 'slideBorder',
        animationDuration: '.5s',
        animationIterationCount: '1',
        animationTimingFunction: 'ease-out'
    }

    return (
        <div {...flippedProps} className="flip-class">
        <div  className={`memory-card ${props.flipState ? 'flip' : ''}`} onClick={() => props.handleClick(props.itemIndex, props.cardItem)} style={props.completeCards.includes(props.itemIndex)?borderStyling:null}>
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
