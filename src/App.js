import './App.css';
import Copy from './Copy';
import 'tachyons'
import React, { Component, createRef, createRoot } from 'react';
import Modal from './Modal';
import DomToImage from 'dom-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom'
// import domToPdfContent from './Domtopdf';

import reactToPdf from './Domtopdf';

const initialState = {
  display: false,
  startPrint: false,
  prevDom: null
}

const pdf = new jsPDF({
  format: 'a4',
  orientation: 'l',
  unit: 'px',
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.domRef = createRef();
    this.childRef = createRef(0);
  }


  async printer(doc, arr) {
    const i = doc.length;
    for (const image of arr) {
      try {
        console.log(image);
        const canvas = await html2canvas(image);
        
        const imageData = canvas.toDataURL('image/png');
        doc.addImage(
          imageData,
          'PNG',
          0,
          0,
          doc.internal.pageSize.getWidth(),
          doc.internal.pageSize.getHeight()
        );
        doc.addPage('a4', 'l');
        this.updateProgress();
      } catch (error) {
        console.error('Error printing:', error);
      }
    }
    doc.save();
    this.setState({
      display: false,
      startPrint: false
    });
  }


  updateProgress = () => {
    this.childRef.current.updateState(1);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.display) {
      if (this.state.startPrint && this.state.prevDom[0]) {
        const arr = [...this.state.prevDom];
        this.printer(pdf, arr);
      }
      else if (!this.state.prevDom[0]) {
        console.log("Nikal Lawde");
        this.setState({
          startPrint: false,
          display: false
        })
      }
    }
  }



  componentWillUnmount = () => {
  }

  componentDidMount() {
    this.setState({ prevDom: this.domRef.current });
  }


  render() {
    const inputs = [];

    const resetApp = () => {
      this.setState({
        display: false
      })
    }

    const displayModal = () => {
      this.setState({ display: true, startPrint: true })
    }

    var i = 50;
    this.childRef.current = 0
    return (
      <div>
        {this.domRef.current = inputs}
        {
          this.state.display && (<div style={{ width: "100%", position: "fixed", zIndex: "2", top: "0" }}>
            <article className=" br2 bg-white pt2 pb3 ba b--black-10 mv4 mw6 shadow-5 center">
              <div className='flex justify-end pr3 pt2'>
                <button id='butt' onClick={() => { this.setState({ startPrint: false }) }} className='ba b--near-white br3 flex-end shadow-4 dim pointer flex'> <p className='pa0 ma0 b'>X</p> </button>
              </div>
              <Modal ref={this.childRef} resetApp={resetApp} />
            </article>
          </div>
          )
        }
        <div className={(this.state.display) ? "dimmer" : ""}>
          <button className='br3 fw7 bco pl2 pr2 pb1 f4 link shadow white pointer mt1 mb1 ma2 bg-dark-blue' onClick={displayModal}>Print</button>
          <div>
            {(() => {
              var items = [];
              while (i > 0) {
                if (i === 50) { items.push(<div ref={el => this.domRef.current.push(el)} key={i}><Copy /> </div>); }
                else items.push(<div ref={el => this.domRef.current.push(el)} key={i} className="page-break"><Copy /> </div>);
                i--;
              }
              return items;
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
