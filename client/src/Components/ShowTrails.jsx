import React from 'react'
import ReactDOM from 'react-dom'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import key from '../../../config.js'
import Modal from 'react-modal'

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
      isFavorite: 'Favorite'
    }
    this.showSummary = this.showSummary.bind(this);
    this.favoriteTrail = this.favoriteTrail.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    console.log(this.props.trails.name)
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
          <button style={{float : 'right', marginRight: "25px"}} onClick={this.favoriteTrail}> {this.state.isFavorite} </button>
          <br/>
          {this.state.getSummary ? 
          <div style={{marginLeft: '30px'}}> 
            <div> {this.props.trails.summary} </div>
            {console.log(this.props.trails.longitude, this.props.trails.latitude)}
            <div> Low: {this.props.trails.low} High: {this.props.trails.high} Length: {this.props.trails.length} Miles </div>
            <button onClick={this.openModal}>Open on Maps</button>
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
