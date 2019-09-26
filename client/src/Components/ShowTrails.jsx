import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import key from '../../../config.js';
import Modal from 'react-modal';
import $ from 'jquery';
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



class ShowTrails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getSummary: false,
      favorite: '',
      mapModalOpen: false,
      isFavorite: 'Favorite',
      isHovering: false,
      weather : [],
      showWeather: false,
      descriptionModalOpen: false,
      description: this.props.trails.summary,
      nameClicked: false,
      style : {fontWeight: 'bold'}
    }
    this.showSummary = this.showSummary.bind(this);
    this.favoriteTrail = this.favoriteTrail.bind(this);
    this.openMapModal = this.openMapModal.bind(this);
    this.closeMapModal = this.closeMapModal.bind(this);
    this.hoverLength = this.hoverLength.bind(this);
    this.getWeatherReport = this.getWeatherReport.bind(this);
    this.openDescriptionModal = this.openDescriptionModal.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.closeDescriptionModal = this.closeDescriptionModal.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.italicizeName = this.italicizeName.bind(this);
  }

  hoverLength(){
    this.setState({
      isHovering: !this.state.isHovering
    })
  }
  
  openMapModal() {
    this.setState({mapModalOpen: true});
  }


  closeMapModal() {
    this.setState({mapModalOpen: false});
  }

  openDescriptionModal() {
    this.setState({descriptionModalOpen: true});
  }


  closeDescriptionModal() {
    this.setState({descriptionModalOpen: false});
  }

  showSummary(event){
    event.preventDefault();
    this.setState({
      getSummary: !this.state.getSummary
    })
  }

  changeDescription(event){
    event.preventDefault();
    this.setState({
      description: event.target.value
    })
  }

  favoriteTrail(event){
    event.preventDefault()
    console.log(this.state.isFavorite)
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

  submitEdit(event){
    event.preventDefault();
    console.log(this.props.trails._id)
    let newDescription = {_id : this.props.trails._id, summary: this.state.description}
    $.ajax({
      type: "PUT",
      url: "http://localhost:3001/changeDescription",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(newDescription),
      success: function(newDescription) {
        console.log(`${newDescription} changed in db`)
        alert("Trails are now available")
      }
    })    
    this.setState({
      descriptionModalOpen: false
    })
  }

  italicizeName(event){
    event.preventDefault();
    let style = {fontWeight: 'bold'}
    if (!this.state.style.fontStyle){
      style = {fontWeight: 'bold', fontStyle: 'italic'}
    }
    this.setState({
      nameClicked : !this.state.nameClicked,
      style : style
    })

  }

  render(){
    const style = {
      width: '100%',
      height: '100%'
    }     
    return(
        <div>
          <div onClick={this.showSummary} style={{float : 'left'}}>
            <span style={this.state.style} onClick={this.italicizeName}>{this.props.trails.name}, </span>
            <span>{' '} Difficulty: {this.props.trails.difficulty}, Rating: {this.props.trails.stars}  </span>
          </div>
          <div style={{float: "right"}}>
            <button onClick={this.openMapModal}>Open on Maps</button>
            <button onClick={this.favoriteTrail}>{this.state.isFavorite}</button>
          </div>
            <Modal
              isOpen={this.state.mapModalOpen}
              onRequestClose={this.closeMapModal}
              style={customStyles}
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
              <button onClick={this.closeMapModal}>close</button>
            </div>
            </Modal>
          <br/>
          {this.state.getSummary ? 
          <div style={{marginLeft: '30px'}}> 
            <button onClick={this.getWeatherReport} style={{float: "right", marginRight: '-152px'}}>Get Weather Report</button>
            <div> {this.state.description} </div>
            <button style={{float: "right"}} onClick={this.openDescriptionModal}>Edit Description</button>
            <div>
              <Modal
                isOpen={this.state.descriptionModalOpen}
                onRequestClose={this.closeDescriptionModal}
                style={customStyles}
              >
              <div>
                <form>
                  <label>{this.props.trails.name}</label>
                  {console.log(this.state.description)}
                  <br/>
                  <textarea value={this.state.description} style={{width: "380px", height: "200px", wordWrap: 'break-word', wordBreak: 'break-all'}} onChange={this.changeDescription}/>
                </form>
              </div>
              <div>  
                <button onClick={this.submitEdit}>Confirm Edit</button>
              </div>
              </Modal>
            <div> Low: {this.props.trails.low} feet</div>
            <div> High: {this.props.trails.high} feet</div>
            <div>Total Elevation Gain: {this.props.trails.high - this.props.trails.low} feet</div>
            <div onMouseOver={this.hoverLength}> Length: {this.props.trails.length} Miles </div>
            {this.state.isHovering ? <div style={style.bold}> Fun Fact: One mile is 5280. This trail is roughly {Math.round(this.props.trails.length * 5280)} feet. If the average person walks a mile in 15-30 minutes, it will take you a the average person {Math.round(this.props.trails.length * 15)} - {Math.round(this.props.trails.length * 30)} minutes
            </div> : null}
            </div>
          {this.state.showWeather ? 
            <div> 
              The temperature in {this.state.weather.city.name} is {Math.round((this.state.weather.list[0].main.temp - 273.15) * 9/5 + 32)} °F. It is {this.state.weather.list[0].main.sea_level} above sea level, has an atmospheric pressure of {this.state.weather.list[0].main.pressure}, humidity of {this.state.weather.list[0].main.humidity}, and {this.state.weather.list[0].weather[0].description}  
            </div>
            : null}
          </div>         
          : null}
          <br/>
        </div> 
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (key.google_api)
})(ShowTrails)
