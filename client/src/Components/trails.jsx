import $ from 'jquery';
import ShowTrails from './ShowTrails.jsx'

class Trails extends React.Component {
  constructor(){
    super()
    this.state = {
      hikingTrails : [],
      sentTrailReq: false,
      location: [],
      showTrails : []
    }    
    // this.getHikingTrailsAPI = this.getHikingTrailsAPI.bind(this);
    this.postHikingTrails = this.postHikingTrails.bind(this);
    // this.splitCities = this.splitCities.bind(this);
    this.getHikingTrail = this.getHikingTrail.bind(this);
    this.getLocationInformation = this.getLocationInformation.bind(this);
    this.getSingleTrail = this.getSingleTrail.bind(this);
  }

  componentDidMount(){
    // this.getHikingTrailsAPI()
    this.getHikingTrail()
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
          sentTrailReq: true,
          location: location,
          showTrails: intialLocation
      })
    })    
  }

  getSingleTrail(){

  }

  getHikingTrailsAPI(longitude, latitude){
    $.get('https://www.hikingproject.com/data/get-trails?lat=37.7749&lon=-122.4194&maxDistance=200&key=200431321-f969e1a55ee2e09a435b1f478690d809&maxResults=100', (trails) => {
      let cities = {};
      this.setState({
          hikingTrails : trails.trails,
          sentTrailReq: true
      })
    })
  }

  postHikingTrails(event){
    event.preventDefault();
    console.log(this.state.hikingTrails)
    let hikingTrails = this.state.hikingTrails;
    for (var i = 0; i < hikingTrails.length; i++) {
      console.log(i)
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
  }
//   splitCities(){
//     (this.state.sentTrailReq ? 
//     console.log(this.state.hikingTrails)
//     : null)
//   }


  render(){
    return(
      <div>
        <div>Welcome! </div>
        <button onClick={this.postHikingTrails}>Save Trail Information</button>
        {this.state.sentTrailReq ? 
        <div>
          <select onChange={this.getLocationInformation} className="location">
          {Object.keys(this.state.location).map(location => {
            return <option>{location}</option>
          })}
            </select>
          {this.state.showTrails.map(trails => {
            console.log(trails, 'here are trails')
            return <ShowTrails trails={trails}/>
          })}
          <div style={{fontWeight: 'bold'}}> 
            Difficulty 
            Green : Easy 
            Blue : Medium
            Black : Hard
          </div>
        </div>  
        : null}
      </div>
    )
  }
}

export default Trails