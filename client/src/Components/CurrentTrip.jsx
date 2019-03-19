import React from 'react';

class CurrentTrip extends React.Component {
  constructor(props){
    super(props)
  }

  // componentDidMount(){
  //   console.log(this.props.trails.length);
  // }

  
  render(){
    return(

      <div>
        {this.props.trails.trails ? 
          <div> 
            <div style={{fontSize: "24px"}}>Here are the trails around you </div>
            {this.props.trails.trails.map(trail => {
              return <li style={{fontWeight: "bold"}}>
              {trail.name}, {trail.location}: Rating {trail.stars}
              <div>{trail.summary}</div>
              </li>
            })}
            Get the full report in all hikes
          </div>    
        : 
        <div style={{fontSize: "24px"}}>Please go back to the homepage and enter in an area</div>
        }
      </div>
    )
  }
}

export default CurrentTrip;