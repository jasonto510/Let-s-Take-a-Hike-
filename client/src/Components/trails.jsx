import $ from 'jquery';
import ShowTrails from './ShowTrails.jsx'

class Trails extends React.Component {
  constructor(){
    super()
    this.state = {
      hikingTrails : [],
      location: [],
      showTrails : [],
      apiReqTrails: [],
      currentLocation : 'Yosemite Valley, California'
    }    
    this.getHikingTrailsAPI = this.getHikingTrailsAPI.bind(this);
    this.postHikingTrails = this.postHikingTrails.bind(this);
    // this.splitCities = this.splitCities.bind(this);
    this.getHikingTrail = this.getHikingTrail.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.getNewTrailAPI = this.getNewTrailAPI.bind(this);
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
    let url = 'https://www.hikingproject.com/data/get-trails?lat=' + this.state.lat + '&lon=' + this.state.long + '&maxDistance=200&key=200431321-f969e1a55ee2e09a435b1f478690d809&maxResults=500'
    console.log(url)
    // $.get(url, (trails) => {
    //   console.log(trails);
    //   this.setState({
    //     apiReqTrails : trails
    //   })
    // })
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



  getNewTrailAPI(event){
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
        stars: hikingTrails[i].stars
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
          <div style={{fontWeight: 'bold'}}> 
            Difficulty
            <br/>
            Green : Easy 
            <br/>
            Blue : Medium 
            <br/>
            Black : Hard
          </div>
        </div>  
        <div>
          <form>
            <div><name>Longitude</name><input type="text" id="lat" onChange={this.getNewArea}></input></div>
            <div><name>Latitude</name><input type="text" id="long" onChange={this.getNewArea}></input></div>
            <div><name>Radius</name><input type="text" id="radius" onChange={this.getNewArea}></input></div>
            <div><name>Max Results</name><input type="text" id="MaxResults" onChange={this.getNewArea}></input></div>
          </form>
            <button onClick={this.getHikingTrailsAPI}>Get Hiking Information</button>
            <button onClick={this.postHikingTrails}>Save Trail Information</button>
            <button onClick={this.getNewHikingLocation}></button>        
        </div>  
      </div>
    )
  }
}

export default Trails