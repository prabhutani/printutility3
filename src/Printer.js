import './App.css';
import 'tachyons'
import React, { Component, createRef } from 'react';
import Modal from './Modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const initialState = {
    display: false,
    startPrint: false,
    modalProgress: 0,
    completedPages: 0
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
    }

    toggleDisplay = () => {
        (this.state.display) ? this.setState({ display: false }) : this.setState({ display: true })
    }

    resetApp = () => {
        this.setState({
            display: false
        })
    }

    componentDidMount = () => {

    }

    componentDidUpdate = () => {
        const page = this.props.domRef.current[this.state.completedPages];
        var imageData;
        if (this.state.display && page) {
            html2canvas(page)
                .then((canvas) => {
                    imageData = canvas.toDataURL('image/png');
                    pdf.addImage(imageData, 'PNG', 0, 0);
                    pdf.addPage('a4', 'l', 'px');
                })
                .then(() => {
                    const percentage = Math.round(((parseInt(this.state.completedPages)) / (this.props.domRef.current.length)) * 100);
                    this.setState((prevState) => ({
                        modalProgress: parseInt(percentage),
                        completedPages: parseInt(prevState.completedPages) + parseInt(1)
                    }))
                })
        }
        else if (!page && this.state.display) {
            pdf.save();
            this.setState({ display: false, modalProgress: 0, completedPages: 0 })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.display && (<div className='h-100' style={{ width: "100%", position: "fixed", zIndex: "2", top: "0", background : "#EEEEEEAA" }}>
                        <article className="br2 bg-white pt2 pb3 ba b--black-10 mv4 mw6 shadow-5 center">
                            <div className='flex justify-end pr3 pt2'>
                                <button id='but' onClick={() => { this.setState({ display: false }) }} className='ba b--near-white br3 flex-end shadow-4 dim pointer flex'> <p className='pa0 ma0 b'>X</p> </button>
                            </div>
                            <Modal progress={this.state.modalProgress} resetApp={this.resetApp.bind(this)} />
                        </article>
                    </div>
                    )
                }
            </div>
        )
    }
}

export default App;