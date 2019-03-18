import React from 'react';

class CurrentTrip extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props.trails.length);
  }
  render(){
    return(

      <div>
        {this.props.trails.length > 0 ? 
          <div> 
            Here are the trails around you
            {this.props.trails.trails.map(trail => {
                {console.log(trail.name)}
              return <li style={{fontWeight: "bold"}}>
              {trail.name}, {trail.location}: Rating {trail.stars}
              <div>{trail.summary}</div>
              </li>
            })}
            Get the full report in all hikes
          </div>    
        : 
        <div>Please go back to the homepage and enter in an area</div>
        }
      </div>
    )
  }
}

export default CurrentTrip;