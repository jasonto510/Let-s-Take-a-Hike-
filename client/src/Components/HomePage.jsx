import React from 'react'
import Trails from './trails.jsx'
import facts from './hikingFacts.jsx'
import $ from 'jquery'
import NextTrip from './NextTrip.jsx'


class HomePage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        onTrailPage: "home",
        userName : '',
        enterUserName: true,
        submitButton : "Submit Username",
        apiReqTrails : [],
        maxResults : 10,
        maxDistance: 10
      }
      this.getNewArea = this.getNewArea.bind(this);
      this.getHomePage = this.getHomePage.bind(this);
      this.getTrailsInformation = this.getTrailsInformation.bind(this);
      this.getUserName = this.getUserName.bind(this);
      this.submitUserName = this.submitUserName.bind(this);
      this.getNewHikingLocation = this.getNewHikingLocation.bind(this);
      this.postHikingTrails = this.postHikingTrails.bind(this);
      this.planTrip = this.planTrip.bind(this);
      // this.tryToGetTrail = this.tryToGetTrail.bind(this);
    }

    // tryToGetTrail(event){
    //   event.preventDefault();
    //   // let url = 'https://www.hikingproject.com/data/get-trails?lat=' + this.state.lat + '&lon=' + this.state.long + '&maxDistance=' + this.state.maxDistance + '&key=200431321-f969e1a55ee2e09a435b1f478690d809&maxResults=' + this.state.maxResults
    //   // $.get(`http://localhost:3001/getTheTrail/${this.state.lat}/${this.state.long}/${this.state.maxDistance}/${this.state.maxResults}`, (data) => {
    //   //   console.log('this isnt breaking')
    //   // })
    // }


    getHomePage(event){
      event.preventDefault();
      this.setState({
          onTrailPage: "home"
      })
    }

    getUserName(event){
      event.preventDefault();
      console.log(this.state.userName)
      this.setState({
          userName: event.target.value
      })
    }

    submitUserName(event){
      event.preventDefault();
      let edit = "Submit Username"
      if (this.state.submitButton === "Submit Username"){
        edit = "Edit Username"
      }
      this.setState({
          enterUserName: !this.state.enterUserName,
          submitButton : edit
      })
    }

    getTrailsInformation(event){
      event.preventDefault();
      console.log('this worked');
      this.setState({
        onTrailPage: "trails"
      })
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
          latitude: hikingTrails[i].latitude,
          additionalInfo: {}
        }
        $.ajax({
          type: "POST",
          url: "http://localhost:3001/hikingTrails",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(newTrail),
          success: function(newTrail) {
            console.log(`${newTrail} saved to db`)
            alert("Trails are now available")
          }
        })        
      }
    }    

    planTrip(event){
      event.preventDefault();
      this.setState({
        onTrailPage: "next trip"
      })
    }


    render() {
   
      // style={{backgroundImage: "linear-gradient(to bottom right, green, yellow)"}}
      return(
         <div>
          <div style={{margin: "auto", width: "50%", border: "5px solid green", padding: "10px"}}>
            <div style={{textAlign : "center"}}>
              Let's take a hike! You're next adventure awaits!
            </div>
              <div style={{textAlign : "center"}}>
              <button onClick={this.getHomePage}> Homepage </button>
              <button onClick={this.getTrailsInformation}> Hikes </button>
              <button onClick={this.planTrip}>Plan your next trip</button>
              </div>
            </div>

          {this.state.onTrailPage === "home" ?  
          <div>
            <button onClick={this.submitUserName} style={{float: "right"}}>{this.state.submitButton}</button>
            {this.state.enterUserName ? 
              <form style={{float:'right'}}>
                <label>Name:</label>
                <input type="text" value={this.state.userName} onChange={this.getUserName}/>
              </form>
               : null
            }


            <br/>
            Hiking Facts!
            {facts.map(fact => {
              return <li>{fact}</li>
            })}

            <div style={{float: "right", margin: "auto", border: "5px solid black", padding: "10px"}}>
              <form>
                Want to find a new trail?
                <div><label style={{float: "left"}}>Longitude</label><input type="text" id="long" onChange={this.getNewArea} style={{float: "right"}}></input></div>
                <br/>
                <div><label style={{float: "left"}}>Latitude</label><input type="text" id="lat" onChange={this.getNewArea} style={{float: "right"}}></input></div>
                <br/>
                <div><label style={{float: "left"}}>Max Distance</label><input type="text" id="maxDistance" onChange={this.getNewArea} style={{float: "right"}}></input></div>
                <br/>
                <div><label style={{float: "left"}}>Max Results</label><input type="text" id="maxResults" onChange={this.getNewArea} style={{float: "right"}}></input></div>
              </form>
                <button onClick={this.getNewHikingLocation}>Get Hiking Information</button>        
                <button onClick={this.postHikingTrails}>Save Trail Information</button>
                {/* <button onClick={this.getHikingTrailsAPI}>Get Hiking Information</button> */}
            </div>  
          </div> : null
          }

          {this.state.onTrailPage === "trails" ? 
            <Trails username={this.state.userName}/> 
          : null}         

          {this.state.onTrailPage === "next trip" ?
            <div>
              <NextTrip username={this.state.userName}/>
            </div>
          : null} 
        </div>
      )
    }
}

export default HomePage