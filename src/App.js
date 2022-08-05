import React from 'react'
import Die from './components/Die'
import Title from './components/Title'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App(){

  const [tenzies,setTenzies] = React.useState(false)
  const [dices,setDices] = React.useState(allNewDice())
  const [numberOfMoves, setNumberOfMoves] = React.useState(0) 
  const [record,setRecord] = React.useState(0)

  function generateNewDice(){ // creates new dice with its properties
    return {
      value:Math.floor(Math.random() * 6) + 1,
      isHeld:false,
      id:nanoid()
    }
  }


  function allNewDice(){ // creates 10 dices at start
    const newDice =  []
      for(let i=0; i<10; i++){
        newDice.push(generateNewDice())
      }
    return newDice  //returns an object
  }
  

  function rollDice(){ // roll the dices with clicked dices
    if(!tenzies)
    {
      setNumberOfMoves(prevNumber => prevNumber+1)
      setDices(oldDices => oldDices.map(oldDice => {
        return oldDice.isHeld ? oldDice : generateNewDice()
      }))
    }else
    {
      setRecord(oldDice => {return oldDice < numberOfMoves ? oldDice : numberOfMoves})
      setNumberOfMoves(0)
      setTenzies(false)
      setDices(allNewDice())
    }
  }


  function holdDice(id){
    setDices(oldDices => oldDices.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }
  
  
  React.useEffect(() => {
      const allHeld = dices.every(die => die.isHeld)
      const firstValue = dices[0].value
      const allSameValue = dices.every(die => die.value === firstValue)

      if(allHeld && allSameValue){
        setTenzies(true)
      }
  },[dices])
  

  const diceElements = dices.map((dice) =>  <Die holdDice={() => holdDice(dice.id)} key={dice.id} value={dice.value} isHeld={dice.isHeld}/> )

        return( 
                 <main className='container'>
                      <p className='moveNumber'>Total Moves: {numberOfMoves}</p>
                     {record>0 && <p className='record'>Your Record:{record}</p>}
                      {tenzies && <Confetti width={480} height={460}/>}
                        <Title/>
                      <div className='dice-container'>
                          {diceElements}
                      </div>
                      <button 
                          onClick= {rollDice} 
                          className='button'>
                          {tenzies ? 'New Game' : 'Roll'}
                      </button>
                 </main>
              )
}