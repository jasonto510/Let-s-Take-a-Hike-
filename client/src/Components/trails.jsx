import $ from 'jquery';
import ShowTrails from './ShowTrails.jsx'
import React from 'react'

class Trails extends React.Component {
  constructor(){
    super()
    this.state = {
      hikingTrails : [],
      location: [],
      showTrails : [],
      currentLocation : 'Bolinas, California'

    }    
    this.getHikingTrail = this.getHikingTrail.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
  }



  componentDidMount() {
    this.getHikingTrail()
  }

  
  getHikingTrail() {
    $.get('http://localhost:3001/hikingTrails', (trails) => {
      let location = {}
      let intialLocation = []
      for (var i = 0; i < trails.length; i++){
        if (trails[i].location === "Bolinas, California"){
          intialLocation.push(trails[i]);
        }
        if (!location[trails[i].location]){
          location[trails[i].location] = 1
        } else{
          location[trails[i].location] += 1
        }
      }
      console.log(location);
      this.setState({
          hikingTrails : trails,
          location: location,
          showTrails: intialLocation
      })
    })    
  }


  getLocationInformation(){
    console.log(event.target.value)
    let newLocation = event.target.value
    $.get(`http://localhost:3001/singleTrail/${newLocation}`, (trails) => {
      this.setState({
        showTrails: trails,
        currentLocation : newLocation
      })
    })    
  }


  render() {
    return(
      <div>
        <div>Welcome! {this.props.username}</div>
        <div>
          <select onChange={this.getLocationInformation} className="location">
          {Object.keys(this.state.location).map(location => {
            return <option>{location}</option>
          })}
            </select>
            <div style={{fontWeight: 'bold', fontSize: '24px'}}>{this.state.currentLocation}</div>
          {this.state.showTrails.map(trails => {
            return <ShowTrails trails={trails}/>
          })}
          <div>
            <div style={{fontWeight: 'bold', float: "left", margin: "auto", border: "5px solid black", padding: "10px"}}> 
              Difficulty
              <br/>
              <div style={{backgroundColor: "green", color: "white"}}>Green : Easy  </div>
              <div style={{backgroundColor: "Blue", color: "white"}}>Blue : Medium  </div>
              <div style={{backgroundColor: "Black", color: "white"}}>Black : Hard </div>
            </div>
          </div>    
        </div>
      </div>
    )
  }
}

export default Trails