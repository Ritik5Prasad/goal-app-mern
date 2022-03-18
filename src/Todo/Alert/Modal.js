import React, { useEffect } from "react";
import "./Modal.css"
import party from "party-js";
const settings = {
  shapes: [
     "square",
    "rectangle",
    "roundedSquare",
    "circle",
    "roundedRectangle",
    "star",
    
  ],
  color: () =>
    party.random.pick([
      party.Color.fromHex("#ff0000"),
      party.Color.fromHex("#00ff00"),
      party.Color.fromHex("#0000ff"),
      party.Color.fromHex("#000000")
    ])
};


function Modal({ setOpenModal }) {
 
  
  const onClick= (e) => {
   
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <div>{(e)=> party.confetti(e.currentTarget, settings)}</div>
          <button
            onClick={() => {
              setOpenModal(false);
            
            
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Congratulations! You made it....</h1>
        </div>
        <div className="footer">
          
          <button id="btn" onClick={onClick}>Party!</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;