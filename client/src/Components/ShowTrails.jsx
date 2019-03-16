class ShowTrails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      getSummary: false,
      favorite: ''
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
    // this.setState({
    //   favorite: this.props.trails.id
    // })
  }



  render(){
    return(
        <div>
          <li onClick={this.showSummary} style={{float : 'left'}}>
            <span style={{fontWeight: 'bold'}}>{this.props.trails.name}, </span>
            <span>{this.props.trails.location}, Difficulty: {this.props.trails.difficulty}, Rating: {this.props.trails.stars}  </span>
          </li>
          <button style={{float : 'right', marginRight: "25px"}} onClick={this.favoriteTrail}>Favorite </button>
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