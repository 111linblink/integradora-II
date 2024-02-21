
import './App.css';

import 'bootstrap';
import {MdClose} from "react-icons/md"


function App() {
  return (
    <>
      <div className ="container">
        <button className='btn btn-add'>Add</button>
        <div className="addContainer">
          <form>
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name"></input>
          
            <label htmlFor="control">NumControl :</label>
            <input type="number" id="control" name="control"></input>
         
            <button className="btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
