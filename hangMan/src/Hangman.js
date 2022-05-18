import React, { Component } from "react";
import "./Hangman.css";
import AlphaButtons from "./AlphaButtons";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 0,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {nGuessed: 0, nWrong: 0, status: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restVal = this.restVal.bind(this)
  }

 
  restVal() {
    this.setState({
      status: 0,
      nGuessed: 0, 
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }
  
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
   
    let ltr = evt.target.value;
    
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nGuessed: st.nGuessed + 1,
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, indx) => (
     
      <AlphaButtons

        key = {indx}
        value = {ltr}
        onClick = {this.handleGuess}
        disabled = {this.state.guessed.has(ltr)}
      />
    ));
  }
  /** render: render game */
  render() {
    
    const isLoser = this.state.nWrong >= this.props.maxWrong
    const isWinner = this.guessedWord().join("") === this.state.answer
    const txt_alt = `${this.state.nWrong} / ${this.props.maxWrong} guess`
    let gameState = this.generateButtons()
    if(isWinner) gameState = "You win  !"
    if(isLoser) gameState = "You lose !" 
    
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt = {txt_alt} />

        <p> Guesses: {this.state.nGuessed} Wrong guesses: {this.state.nWrong} </p>

        <p className='Hangman-word'>{!isLoser ? this.guessedWord() : this.state.answer}</p> 
        <p className="Hangman-btns">{gameState}</p>

        <button id = "reset" onClick = {this.restVal}>Reset</button>
      </div>
    );
  }
}

export default Hangman;
