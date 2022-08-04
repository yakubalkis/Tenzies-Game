import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'


export default function App(){
  

  function allNewDice(){
    const newDice =  []
      for(let i=0; i<10; i++){
        newDice.push({
          value:Math.floor(Math.random() * 6) + 1,
          isHeld:false,
          id:nanoid()
          })
      }
      
    return newDice  //returns an object
  }

  function rollDice(){
    setDices(allNewDice())
  }

  function holdDice(id){
    setDices(oldDices => oldDices.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }
 
  const [dices,setDices] = React.useState(allNewDice())
  
  const diceElements = dices.map((dice) =>  <Die holdDice={() => holdDice(dice.id)} key={dice.id} value={dice.value} isHeld={dice.isHeld}/> )
  console.log(dices)
  
        return( 
                 <main className='container'>
                    <div className='dice-container'>
                        {diceElements}
                    </div>
                    <button onClick= {rollDice} className='button'>Roll</button>
                 </main>
              )
}