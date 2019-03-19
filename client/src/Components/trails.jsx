import $ from 'jquery';
import ShowTrails from './ShowTrails.jsx'
import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import key from '../../../config.js'
import style from './style.css.js'


class Trails extends React.Component {
  constructor(){
    super()
    this.state = {
      hikingTrails : [],
      location: [],
      showTrails : [],
      currentLocation : 'Bolinas, California',
      receivedData : false,
      trailPoints : [],
      searching : false

    }    
    this.getHikingTrail = this.getHikingTrail.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.searchingForTrail = this.searchingForTrail.bind(this);
  }



  componentDidMount() {
    this.getHikingTrail()
  }

  searchingForTrail(event) {
    event.preventDefault
    console.log(event.target.value);
    this.setState({
      searching: true
    })
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
          location[trails[i].location] = [trails[i]]
        } else{
          location[trails[i].location].push(trails[i])
        }
      }
      if (this.props.trails.trails) {
        let newTrails = this.props.trails.trails
        for (var j = 0; j < newTrails.length; j++) {
          if (!location[newTrails[j].location]){
            location[newTrails[j].location] = [newTrails[j]];
          } else {
            location[newTrails[j].location].push(newTrails[j])
          }
        }
      }
      this.setState({
          hikingTrails : trails,
          location: location,
          showTrails: intialLocation,
          receivedData: true,
          trailPoints: intialLocation
      })
    })    
  }


  getLocationInformation(){
    let newLocation = event.target.value
    this.setState({
      showTrails: this.state.location[newLocation],
      currentLocation : newLocation,
      trailPoints : this.state.location[newLocation]
    })
  }


  render() {
    const style = {
      width: '40%',
      height: '40%'
    }     
    return(
      <div>
        <div>Welcome! {this.props.username}</div>
        <form style={style.rightFloat}>
          <input type="input" placeholder="Search" onChange={this.searchingForTrail}/>
        </form>
        <div>
          <select onChange={this.getLocationInformation} className="location">
          {Object.keys(this.state.location).map(location => {
            return <option>{location}</option>
          })}
            </select>
            <div style={style.boldFont}>{this.state.currentLocation}</div>
          {this.state.showTrails.map(trails => {
            return <ShowTrails trails={trails}/>
          })}
          <div>
            <div style={style.boldFloat}> 
              Difficulty
              <br/>
              <div style={style.green}>Green : Easy  </div>
              <div style={style.blue}>Blue : Medium  </div>
              <div style={style.black}>Black : Hard </div>
            </div>
          </div>  
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        {this.state.receivedData ?
          <Map 
              google={this.props.google} 
              style={style}                
              initialCenter={{
                lat: this.state.trailPoints[0].latitude,
                lng: this.state.trailPoints[0].longitude
              }}
              zoom={8}>
              {this.state.trailPoints.map(trail => {
              return <Marker 
                name={trail.name}
                position={{lat: trail.latitude, lng: trail.longitude}}
                onClick={console.log(trail.name)}
              />
            })}
            </Map>              
          : null}
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (key.google_api)
})(Trails)
