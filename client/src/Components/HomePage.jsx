import React from 'react';
import Trails from './trails.jsx';
import facts from './hikingFacts.jsx';
import $ from 'jquery';
import NextTrip from './NextTrip.jsx';
import CurrentTrip from './CurrentTrip.jsx';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import style from './style.css.js'


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
      this.getCurrentHike = this.getCurrentHike.bind(this);
      this.searchTrail = this.searchTrail.bind(this);
    }


    getCurrentHike(event){
      event.preventDefault();
      this.setState({
        onTrailPage: "currentHike"
      })
    }

    searchTrail(event){
      event.preventDefault();
      this.setState({
        onTrailPage: "search"
      })
    }

    getHomePage(event){
      event.preventDefault();
      this.setState({
          onTrailPage: "home"
      })
    }

    getUserName(event){
      event.preventDefault();
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
      $.get(url, (trails) => {
        this.setState({
          apiReqTrails : trails
        })
      })
    }
  

    postHikingTrails(event){
      event.preventDefault();
      // console.log(this.state.apiReqTrails)
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
   
      return(
         <div style={style.font}>
          <div style={style.header}>
            <div style={style.logo}>
              Take a Hike! Your next adventure awaits!
            </div>
              <div style={style.buttonContainer}>
              <button onClick={this.getHomePage} className="homeButton"> Homepage </button>
              <button onClick={this.getTrailsInformation} className="homeButton"> All Hikes </button>
              <button onClick={this.getCurrentHike} className="homeButton">Current Hike</button> 
              <button onClick={this.planTrip} className="homeButton">Plan your next trip</button>
            </div>
          </div>
          {this.state.onTrailPage === "home" ?  
          <div>
            <button onClick={this.submitUserName} style={style.rightFloat}>{this.state.submitButton}</button>
            {this.state.enterUserName ? 
              <form style={style.rightFloat}>
                <input type="text" value={this.state.userName} onChange={this.getUserName} placeholder="Name"/>
              </form>
               : null
            }
                <br/>
                Hiking Facts!
                {facts.map(fact => {
                  
                  return <li key={fact}>{fact}</li>
                })}
    
                <div style={style.newTrailContainer}>
                  <form>
                    Want to find a new trail?
                    <div><label style={style.leftFloat}>Latitude</label><input type="text" id="lat" onChange={this.getNewArea} style={style.rightFloat}></input></div>
                    <br/>
                    <div><label style={style.leftFloat}>Longitude</label><input type="text" id="long" onChange={this.getNewArea} style={style.rightFloat}></input></div>
                    <br/>
                    <div><label style={style.leftFloat}>Max Distance</label><input type="text" id="maxDistance" onChange={this.getNewArea} style={style.rightFloat}></input></div>
                    <br/>
                    <div><label style={style.leftFloat}>Max Results</label><input type="text" id="maxResults" onChange={this.getNewArea} style={style.rightFloat}></input></div>
                  </form>
                    <button onClick={this.getNewHikingLocation}>Get Hiking Information</button>        
                    <button onClick={this.postHikingTrails}>Save Trail Information</button>
                </div>  
              </div> : null
              }
          


          {this.state.onTrailPage === "trails" ? 
            <Trails username={this.state.userName} trails={this.state.apiReqTrails}/> 
          : null}         

          {this.state.onTrailPage === "next trip" ?
            <div>
              <NextTrip username={this.state.userName}/>
            </div>
          : null} 
          {this.state.onTrailPage === "currentHike" ? 
          <div> 
            <CurrentTrip trails={this.state.apiReqTrails}/>
          </div>
          : null}
        </div>
      )
    }
}

export default HomePage