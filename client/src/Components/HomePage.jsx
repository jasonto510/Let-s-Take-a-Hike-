import React from 'react'
import Trails from './trails.jsx'
import facts from './hikingFacts.jsx'


class HomePage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        onTrailPage: false,
        userName : '',
        enterUserName: true,
        submitButton : "Submit Username"
      }
      this.getHomePage = this.getHomePage.bind(this);
      this.getTrailsInformation = this.getTrailsInformation.bind(this);
      this.getUserName = this.getUserName.bind(this);
      this.submitUserName = this.submitUserName.bind(this);
    }

    componentDidMount(){
    //   console.log(key.google_api)
    }

    getHomePage(event){
      event.preventDefault();
      this.setState({
          onTrailPage: false
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
        onTrailPage: true
      })
    }

    render() {
   
      // style={{backgroundImage: "linear-gradient(to bottom right, green, yellow)"}}
      return(
         <div>
          <div style={{margin: "auto", width: "50%", border: "5px solid green", padding: "10px"}}>
          <div></div>
          <div style={{textAlign : "center"}}>
            Let's take a hike! You're next adventure awaits!
          </div>
            <button onClick={this.getHomePage} style={{marginLeft : "250px"}}> Homepage </button>
            <button onClick={this.getTrailsInformation} style={{textAlign : "center"}}> Hikes </button>
          </div>

          {this.state.onTrailPage ? 
          <Trails username={this.state.userName}/> : 
          <div>
            {this.state.enterUserName ? 
              <form>
                <label>Name:</label>
                <input type="text" value={this.state.userName} onChange={this.getUserName}/>
              </form>
               : null
            }    
            <button onClick={this.submitUserName}>{this.state.submitButton}</button>
            <br/>
            Hiking Facts!
            {facts.map(fact => {
              return <li>{fact}</li>
            })}
          </div>
          }
         </div>
      )
    }
}

export default HomePage




// {/* <Marker onClick={this.onMarkerClick}
// name={'Current location'} />

// <InfoWindow onClose={this.onInfoWindowClose}>
// <div>
// {/* <h1>{this.state.selectedPlace.name}</h1> */}
// </div>
// </InfoWindow> */}