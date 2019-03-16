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
      apiReqTrails: [],
      currentLocation : 'Yosemite Valley, California',
      maxResults : 10,
      maxDistance: 10
    }    
    this.getHikingTrailsAPI = this.getHikingTrailsAPI.bind(this);
    this.postHikingTrails = this.postHikingTrails.bind(this);
    // this.splitCities = this.splitCities.bind(this);
    this.getHikingTrail = this.getHikingTrail.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.getNewArea = this.getNewArea.bind(this);
    this.getNewTrails = this.getNewTrails.bind(this);
    this.getNewHikingLocation = this.getNewHikingLocation.bind(this);
  }

  componentDidMount(){
    // this.getHikingTrailsAPI()
    console.log(this.props.username)
    this.getHikingTrail()
  }

  getNewTrails(){

  }

  getNewArea(event){
    event.preventDefault()
    this.setState({
      [event.target.id] : event.target.value
    })
  }



  getNewHikingLocation(event){
    event.preventDefault()
    let url = 'https://www.hikingproject.com/data/get-trails?lat=' + this.state.lat + '&lon=' + this.state.long + '&maxDistance=' + this.state.maxDistance + '&key=200431321-f969e1a55ee2e09a435b1f478690d809&maxResults=' + this.state.maxResults
    console.log(url)
    alert('Searching for queries')
    $.get(url, (trails) => {
      console.log(trails);
      this.setState({
        apiReqTrails : trails
      })
    })
  }

  
  getHikingTrail(){
    $.get('http://localhost:3001/hikingTrails', (trails) => {
      let cities = {};
      console.log(trails)
      let location = {}
      let intialLocation = []
      for (var i = 0; i < trails.length; i++){
        if (trails[i].location === "Yosemite Valley, California"){
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

  getHikingTrailsAPI(event){
    event.preventDefault()
    $.get('https://www.hikingproject.com/data/get-trails?lat=37.7749&lon=-122.4194&maxDistance=200&key=200431321-f969e1a55ee2e09a435b1f478690d809&maxResults=500', (trails) => {
      console.log(trails);
      this.setState({
        apiReqTrails : trails
      })
    })
  }



  postHikingTrails(event){
    event.preventDefault();
    console.log(this.state.apiReqTrails)
    let hikingData = this.state.apiReqTrails;
    let hikingTrails = hikingData.trails
    for (var i = 0; i < hikingTrails.length; i++) {
      let newTrail = {
        hikeId: hikingTrails[i].id,
        name: hikingTrails[i].name,
        difficulty: hikingTrails[i].difficulty,
        low: hikingTrails[i].low, 
        high: hikingTrails[i].high,
        summary: hikingTrails[i].summary,
        location: hikingTrails[i].location,
        length: hikingTrails[i].length,
        stars: hikingTrails[i].stars,
        longitude: hikingTrails[i].longitude, 
        latitude: hikingTrails[i].latitude
      }
      console.log(newTrail)
      $.ajax({
        type: "POST",
        url: "http://localhost:3001/hikingTrails",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(newTrail),
        success: function(newTrail) {
          console.log(`${i} saved to db`)
        }
      })        
    }
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
//   splitCities(){
//     (this.state.sentTrailReq ? 
//     console.log(this.state.hikingTrails)
//     : null)
//   }


  render(){
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
          <div style={{float: "right", margin: "auto", border: "5px solid black", padding: "10px"}}>
            <form>
              Want to find a new trail?
              <div><name style={{float: "left"}}>Longitude</name><input type="text" id="long" onChange={this.getNewArea} style={{float: "right"}}></input></div>
              <br/>
              <div><name style={{float: "left"}}>Latitude</name><input type="text" id="lat" onChange={this.getNewArea} style={{float: "right"}}></input></div>
              <br/>
              <div><name style={{float: "left"}}>Radius</name><input type="text" id="maxDistance" onChange={this.getNewArea} style={{float: "right"}}></input></div>
              <br/>
              <div><name style={{float: "left"}}>Max Results</name><input type="text" id="maxResults" onChange={this.getNewArea} style={{float: "right"}}></input></div>
            </form>
              <button onClick={this.getNewHikingLocation}>Get Hiking Information</button>        
              <button onClick={this.postHikingTrails}>Save Trail Information</button>
              {/* <button onClick={this.getHikingTrailsAPI}>Get Hiking Information</button> */}
          </div>  
        </div>
      </div>
    )
  }
}

export default Trails