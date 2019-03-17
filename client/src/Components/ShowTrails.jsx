import React from 'react'
import ReactDOM from 'react-dom'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import key from '../../../config.js'
import Modal from 'react-modal'
import $ from 'jquery'

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



class ShowTrails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getSummary: false,
      favorite: '',
      modalIsOpen: false,
      isFavorite: 'Favorite',
      isHovering: false,
      weather : [],
      showWeather: false
    }
    this.showSummary = this.showSummary.bind(this);
    this.favoriteTrail = this.favoriteTrail.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hoverLength = this.hoverLength.bind(this);
    this.getWeatherReport = this.getWeatherReport.bind(this);
  }


  hoverLength(){
    this.setState({
      isHovering: !this.state.isHovering
    })
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  showSummary(event){
    event.preventDefault();
    this.setState({
      getSummary: !this.state.getSummary
    })
  }

  favoriteTrail(){
    console.log(this.props.trails.hikeId)
    let favoriteStatus = null;
    if (this.state.isFavorite === 'Favorite'){
      favoriteStatus = 'Unfavorite'
    } else{
      favoriteStatus = 'Favorite'
    }
    this.setState({
      favorite: this.props.trails.hikeId,
      isFavorite: favoriteStatus
    })
  }

  getWeatherReport(event){
    event.preventDefault()
    let url = 'http://api.openweathermap.org/data/2.5/forecast?lon=' + this.props.trails.longitude + '&lat=' + this.props.trails.latitude + '&APPID=' + key.weather_api;
    console.log(url)
    $.get(url, (weather) => {
      console.log(weather)
      this.setState({
        weather: weather,
        showWeather: true
      })
    })
  }

  render(){
    const style = {
      width: '100%',
      height: '100%'
    }     
    return(
        <div>
          <li onClick={this.showSummary} style={{float : 'left'}}>
            <span style={{fontWeight: 'bold'}}>{this.props.trails.name}, </span>
            <span>{' '} Difficulty: {this.props.trails.difficulty}, Rating: {this.props.trails.stars}  </span>
          </li>
          <div style={{float: "right", position: "relative"}}>
            <button onClick={this.openModal}>Open on Maps</button>

          </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
            <div>  
              <Map 
                google={this.props.google} 
                style={style}                
                initialCenter={{
                  lat: this.props.trails.latitude,
                  lng: this.props.trails.longitude
                }}
                zoom={10}>
                <Marker 
                  name={this.props.trails.name}
                  position={{lat: this.props.trails.latitude, lng: this.props.trails.longitude}}
                />
              </Map>
              <button onClick={this.closeModal}>close</button>
            </div>
            </Modal>
          <br/>
          {this.state.getSummary ? 
          <div style={{marginLeft: '30px'}}> 
            <div>
            <div> {this.props.trails.summary} </div>
            <div> Low: {this.props.trails.low} feet</div>
            <div> High: {this.props.trails.high} feet</div>
            <div onMouseOver={this.hoverLength}> Length: {this.props.trails.length} Miles </div>
            {this.state.isHovering ? <div style={{fontWeight: 'bold'}}> Fun Fact: One mile is 5280. This trail is roughly {this.props.trails.length * 5280} feet. If the average person walks a mile in 15-30 minutes, it will take you at least {this.props.trails.length * 15} - {this.props.trails.length * 30} minutes
            </div> : null}
            </div>
            <button onClick={this.getWeatherReport} >Get Weather Report</button>
          {this.state.showWeather ? 
            <div> 
              The temperature in {this.state.weather.city.name} is {this.state.weather.list[0].main.temp} Kelvin. It is {this.state.weather.list[0].main.sea_level} above sea level, has an atmospheric pressure of {this.state.weather.list[0].main.pressure}, humidity of {this.state.weather.list[0].main.humidity}, and {this.state.weather.list[0].weather[0].description}  
            </div>
            : null}
          </div> 
          
          : null}
          <br/>
        </div> 
    )
  }
}

// export default ShowTrails
export default GoogleApiWrapper({
  apiKey: (key.google_api)
})(ShowTrails)
