import './App.css';
import Copy from './Copy';
import 'tachyons'
import React, { createRef } from 'react';
import Printer from './Printer';

const domRef = createRef();
const childRef = createRef();
domRef.current = [];
function App() {
  var i = 50;
  return (
    <div>
      <Printer domRef={domRef} ref = {childRef} />
      <button className='br3 fw7 bco pl2 pr2 pb1 f4 link shadow white pointer mt1 mb1 ma2 bg-dark-blue' onClick={() => childRef.current.toggleDisplay()}>Print</button>
      <div>
        {(() => {
          var items = [];
          while (i > 0) {
            items.push(<div ref={el => domRef.current.push(el)} key={i}><Copy /> </div>)
            i--;
          }
          return items;
        })()}
      </div>
    </div>
  )
}

export default App;
