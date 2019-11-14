import React, { Component } from 'react'
import Cards from './Cards';
import CardItems from './CardItems';
import { Flipper, Flipped } from 'react-flip-toolkit';
import {shuffle} from 'lodash';

const secondCardArray = CardItems.map((item, index) => {
  return Object.assign({}, item, {
    id: item.id+10
  })
})

const carditems = [...CardItems, ...secondCardArray];

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: carditems,
      completedCards: [],
      firstCard: null,
      secondCard: null,
      lockBoard: false,
      keyPresses: 0
    }
  }

  componentDidMount() {
    this.shuffleCards()
  }

  shuffleCards = () => {
    setTimeout(() => {
      this.setState({
        cards: shuffle(this.state.cards)
      })
    }, 10);
  }

  handleClick = (index, cardname) => {

    // return from the function if index parameter is included in completedCards array
    if (this.state.completedCards.includes(index)) return;

    // return from function if lockBoard-state is true
    if (this.state.lockBoard) return;

    // return from function if the pressed card is the same as the previus pressed card (which is saved in firstCard-state)
    if (index === this.state.firstCard) return;

    let cardCopy = JSON.parse(JSON.stringify(this.state.cards))
    cardCopy[index].flipped = true;
    this.setState({
      cards: cardCopy,
      keyPresses: this.state.keyPresses+1
    })

    // if no firstCard is saved, save the pressed card to firstCard, then return
    if (this.state.firstCard === null) {
      this.setState({
        firstCard: index
      })
      return;
    }

    // save pressed card to secondCard-state and lock the board when the checkForMatch function is running
    this.setState({
      secondCard: index,
      lockBoard: true
    }, () => {
      this.checkForMatch(this.state.firstCard, this.state.secondCard)
      return;
    })

  }

  resetBoard = () => {
    if (this.state.completedCards.length === 12) {
      if (window.confirm(`YEY, YOU MADE IT ON ${this.state.keyPresses} KEY PRESSES`)) {
        this.setState({
          cards: carditems,
          completedCards: [],
          firstCard: null,
          secondCard: null,
          lockBoard: false,
          keyPresses: 0
        })
      }
    }
    this.setState({
      lockBoard: false,
      firstCard: null,
      secondCard: null
    })
  }

  checkForMatch = (firstIndex, secondIndex) => {

    if (this.state.cards[firstIndex].name === this.state.cards[secondIndex].name) {
      setTimeout(() => {
        this.setState({
          completedCards: this.state.completedCards.concat(firstIndex, secondIndex)
        }, () => {
          this.resetBoard();
        })
      }, 500);
      return;
    }

    setTimeout(() => {
      let cardCopy = JSON.parse(JSON.stringify(this.state.cards))
      cardCopy[firstIndex].flipped = false;
      cardCopy[secondIndex].flipped = false;
      this.setState({
        cards: cardCopy,
      }, () => {
        this.resetBoard()
      })
    }, 1500);


  }


  render() {

    const cards = this.state.cards
    .map((item, index) => {
      return (
        <Flipped key={index} flipId={item.id}>
          {flippedProps => <Cards 
                              flippedProps={flippedProps} 
                              cardItem={item.name} 
                              flipState={item.flipped} 
                              handleClick={this.handleClick} 
                              itemIndex={index}
                              completeCards={this.state.completedCards}
                            />}
        </Flipped>
          
      )
    })


    return (
      <Flipper className="memory-game" flipKey={this.state.cards.map((item, index) => item.id).join('')}>
          {cards}
      </Flipper>

    )
  }
}

export default App