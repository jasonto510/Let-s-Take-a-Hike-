import React from 'react'
import Modal from 'react-modal'
import faq from './faq.jsx'
import Gear from './gearNeeded.jsx'
import style from './style.css.js'


const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform   : 'translate(-50%, -50%)',
      height      : '300px',
      width       : '400px'
    }
  };


class NextTrip extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      faqOpen : false,
      gear: "",
      allGear: []
    }
    this.openFaq = this.openFaq.bind(this);
    this.closeFaq = this.closeFaq.bind(this);
    this.addGear = this.addGear.bind(this)
    this.addRecommendation = this.addRecommendation.bind(this);
  }

  componentDidMount(){
      console.log(faq.itemsToBring)
  }

  openFaq() {
    this.setState({faqOpen: true});
  }

  
  closeFaq() {
    this.setState({faqOpen: false});
  }
    
  addGear(event) {
    event.preventDefault()
    if (event.target.value){
      this.setState({
        gear: event.target.value
      })
    }
  }

  addRecommendation(event){
    event.preventDefault();
    let newGear = this.state.allGear;
    let list = document.getElementById("recList")
    newGear.push(this.state.gear);
    this.setState({
        gear: '',
        allGear : newGear
    })
    list.reset();
  }
    
  render(){
    return(
      <div>
          <div>
            <div style={style.bold}>Welcome {this.props.username}, are you excited to plan your next trip?</div>
            <button style={style.rightFloat} onClick={this.openFaq}>Frequency Asked Questions</button> 
            <br/>
            <Modal 
              isOpen={this.state.faqOpen}
              onRequestClose={this.closeFaq}
              style={customStyles}
            >
            <div>
              <div style={style.bold}>What should I bring?</div>
                {faq.itemsToBring.map(item => {
                  return <li key={item}>{item}</li>
                })}
              <br/>
              <div style={style.bold}>How much water do I need?</div>
                {faq.water.map(amount => {
                  return <li key={amount}>{amount}</li>
                })}
              <br/>
              <div style={style.bold}>How do I stay dry while hiking?</div>
                {faq.stayingDry.map(recommendation => {
                  return <p key={recommendation}>{recommendation}</p>
                })}
            </div>
            </Modal>
            <br/> 
          <div style={style.bold}>Add Gear</div>
          <form id="recList">
            <input type="text" value={this.state.gear} onChange={this.addGear}></input> 
            <button onClick={this.addRecommendation} >Add</button>
          </form>
          <br/>
          <div style={style.bold}>Gear Needed </div>
            {this.state.allGear.map(gear => {
              return <Gear gear={gear} />
            })}
          </div>
      </div>
    )
  }
}

export default NextTrip