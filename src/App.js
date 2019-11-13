import React, { useState } from 'react';
import Cards from './Cards'

function App() {

  const [cardItem] = useState([
    'angular',
    'aurelia',
    'backbone',
    'ember',
    'react',
    'vue'
  ]);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);


  const resetBoard = () => {
    setHasFlipped(false);
    setFirstCard(null);
    setSecondCard(null);
  }

  const checkForMatch = () => {
    // console.log('firstCard: ',firstCard);
    // console.log('secondCard: ', secondCard);
    if (firstCard === secondCard) {
      console.log('samma');
      return;
    }
    console.log('inte samma');
    // resetBoard();
  }

  const setCards = (card) => {
    // console.log('klick från app.js, du har skickat med: ', card)
    if (!hasFlipped) {
      setHasFlipped(true);
      setFirstCard(card);
      return;
    }
    setSecondCard(card);
    checkForMatch();
    return;
  }

  const showStates = () => {
    console.log('hasFlipped är: ',hasFlipped);
    console.log('firstCard är: ',firstCard);
    console.log('secondCard är: ',secondCard);
  }

  const amountOfCards = cardItem.map(item => {
    return (
      <React.Fragment key={item}>
        <Cards cards={item} setCards={setCards}/>
        {/* <Cards cards={item} /> */}
      </React.Fragment>

    )
  })

  return (
    <section className="memory-game">
      {amountOfCards}
      {amountOfCards}
      <button onClick={showStates}>Visa states</button>
    </section>
  );
}

export default App;
