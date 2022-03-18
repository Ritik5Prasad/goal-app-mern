import React,{useState,useContext,useEffect } from 'react'
import Axios from 'axios';
import dbs from './dbs.jpg'
import { CredentialsContext } from "../App";
import party from 'party-js'
import Login from '../Login/Login';
import Modal from "react-modal";
import './Todo.css'

Modal.setAppElement("#root");


party.resolvableShapes[
  "logo"
] = `<img width="32px" src="https://i.pinimg.com/originals/eb/e4/9c/ebe49c9609b15a98b84de9f2b057b16f.png"/>`;

const confettiSettings = {
  shapes: [
    "square",
    "rectangle"
    // "roundedSquare",
    // "circle",
    // "roundedRectangle",
    // "star",
    // "logo"
  ],
  // The amount of confetti particles that should be emitted.
  count: party.variation.range(80, 100),
  // The amount of spread that is applied to the emission angle. Note that the default angle points upwards.
  spread: 40,
  // The initial speed that the confetti particles are emitted with.
  speed: party.variation.range(50, 600),
  // The initial size that the confetti particles are emitted with.
  size: party.variation.skew(1, 0.8),
  // The initial rotation that the confetti particles are emitted with.
  rotation: () => party.random.randomUnitVector().scale(180),
  // The initial color that particles are emitted with.
  color: () =>
    party.random.pick([
      party.Color.fromHex("#238446"),
      party.Color.fromHex("#1D7DB2"),
      party.Color.fromHex("#FFC800"),
      party.Color.fromHex("#FFFFFF")
    ])
};



function Todo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById("modal") && isOpen) {
        party.confetti(document.getElementById("modal"), confettiSettings);
      }
    }, 300);
  }, [isOpen]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const onOpenModal = () => {
    setIsOpen(true);
  };




  const [goalList, setGoalList] = useState([]);
  const[deleted,setDeleted]=useState("")
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [enteredText,setEnteredText]=useState("") 
  useEffect(()=>{
    if(credentials==null)
    return
    Axios.get('https://goal-app-fullstack.herokuapp.com/read',{
      user:credentials.user
    }).then((response)=>{
      setGoalList(response.data);
      
    })
  },)


  const deleteGoal=(id)=>{
    setIsOpen(true);
    Axios.delete(`https://goal-app-fullstack.herokuapp.com/delete/${id}`,{
    headers:{
      user:credentials.user
    }  
  })
    setDeleted("del")
  }
  const [goal,setGoal]=useState("")
  
   const onChange=(e)=>{
     setEnteredText(e.target.value)
      setGoal(e.target.value);
   }
   const persist=(newTodos)=>{
        
        Axios.post('https://goal-app-fullstack.herokuapp.com/insert',{
          goalName:newTodos,
          user:credentials.user
        })

   }
   const submitHandler = (e) => {
    e.preventDefault();
    if (!goal) return;
    const newTodo = { text: goal };
    const newTodos = [...goalList, newTodo];
    setGoalList(newTodos);
    setEnteredText("")
    setGoal("");
    persist(newTodos);
  };
  

  return (
    
    <div className='b'>
      
      {(credentials==null) ? <Login/> : 
      <div >
       <text className='header'>Dream Big | Set Goals | Take Action</text>
<div className='Todo'> 
  <form className='form' onSubmit={submitHandler}>
        <label>New Goal</label>
      <input onChange={onChange} value={enteredText}  type="text"/> 
      <button type='submit' >Add to List</button>
      </form>
    </div>
    <div className='gcover'>
    <div className='YourGoals'>
          <h1 className='urText'>Your Goals</h1>
          {(goalList.length === 0)?<h1 className='add'>Add Some Goal</h1>:goalList.map((todo)=>{
        return<div className='gl' key={todo.id}>
          <div className='leftside'> <text>{todo.text}</text></div>
      <div className='rightside'>  <button onClick={()=>deleteGoal(todo._id)} >Achieved!</button></div>
           </div>})}
    </div>
    </div>
    <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div id="modal" className="modal-content">
          <div>Congratulations! You made it.....🥳</div>
          <button className="close-modal-btn" onClick={toggleModal}>
            Wooohoo!!!
          </button>
        </div>
      </Modal>

    </div>
    }
   </div>

  )
}

export default Todo