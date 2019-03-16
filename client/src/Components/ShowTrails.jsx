import React from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-maps-react'

class ShowTrails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getSummary: false,
      favorite: '',
      isFavorite: 'Favorite'
    }
    this.showSummary = this.showSummary.bind(this);
    this.favoriteTrail = this.favoriteTrail.bind(this);
  }

  componentDidMount(){
    console.log(this.props.trails.name)
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
            <div> Low: {this.props.trails.low} High: {this.props.trails.high} Length: {this.props.trails.length} Miles </div>
          </div> 
          : null}
          <br/>
        </div> 
    )
  }
}

export default ShowTrails