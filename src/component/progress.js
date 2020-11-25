import React from "react";
class progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progres_per:50,
      text:'',
      progres_color:''
    }
  }
  componentDidMount() {
    this.setState({progres_per:this.props.percentage,
                  text:this.props.percentage===0?"No Due Date":this.props.dateValue,
                  progres_color:this.props.progressColor+"80"})

  }
  componentWillReceiveProps(props){
    if(props!=null)
      this.setState({progres_per:props.percentage,text:props.percentage===0?"No Due Date":props.dateValue,progres_color:props.progressColor+"80"})
  }
  render(){
    return(<div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow="70"
                  aria-valuemin="0" aria-valuemax="100" style={{width:this.state.progres_per+'%',background:this.state.progres_color,border:'1px solid '+this.state.progres_color}}>
                  <span>{this.state.text}</span>
            </div>
          </div>)
  }
}
export default progress
