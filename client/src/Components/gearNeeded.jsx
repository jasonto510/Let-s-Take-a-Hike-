import React from 'react'


class Gear extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gear : this.props.gear,
      description: false,
      tempGear : '',
      strikethrough : {textDecoration : 'underline'}
    }
    this.editDescription = this.editDescription.bind(this);
    this.editGear = this.editGear.bind(this);
    this.changeGear = this.changeGear.bind(this);
    this.gotGear = this.gotGear.bind(this);
  }

  gotGear(event){
    //Iterate through the array, if the name matches splice it out  
    // style = {textDecoration: "lineThrough"}
    event.preventDefault();
    let strikeThrough = "line-through"
    if (this.state.strikethrough.textDecoration === "line-through"){
      strikeThrough = "underline"
    } 
    this.setState({
      strikethrough : {textDecoration: strikeThrough}
    })
  }


  editDescription(event){
    event.preventDefault();
    this.setState({
      description: !this.state.description
    })
  }
  
  editGear(event){
    event.preventDefault();
    this.setState({
      gear: event.target.value
    })
  }

  changeGear(event){
    event.preventDefault();
    this.setState({
      description: false
    })
  }

  render(){
    return(
      <div>
        <div>
          <li onClick={this.gotGear} style={this.state.strikethrough}>{this.state.gear}</li> 
          <button style={{float: "right"}} onClick={this.editDescription}>Edit</button> 
            {this.state.description ? 
              <form>
              <input type="text" value={this.state.gear} onChange={this.editGear}/>
              <button onClick={this.changeGear}> Confirm Edit </button>
             </form> 
            : null}
        </div>
      </div>
    )
  }
}

export default Gear;