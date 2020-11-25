import React from "react";
import user from '../data/user'
class dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list:[],
      temp_list:[],
      togal_icon:'fa fa-caret-down',
      is_drop:false,
      selected_user:{},
      searchValue:'',
    }
  }
  componentDidMount() {
    user.map(main=>{
      return  main.is_selected=false,main.name_fl=main.name.charAt(0)
    })
    this.setState({user_list:user,temp_list:user})
    var obj={id:4, name: this.props.value, color: "#c4c4c4", is_selected: true, name_fl: this.props.value.charAt(0)}
    this.setState({selected_user:obj})
  }
  NameClick=(e)=>{
    var temp_list=this.state.user_list;
        temp_list.map(main=>{main.is_selected=false})
        var index=temp_list.findIndex(o=>o.id===parseInt(e.target.id))
        temp_list[index].is_selected=true;

        this.setState({user_list:temp_list,selected_user:temp_list[index]})
  }
  searchValueChange=(e)=>{
    let matches = this.state.temp_list.filter(v => v.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({searchValue:e.target.value,user_list:matches})
  }
  componentWillReceiveProps(props){
    if(props.value!==null){
      var obj={id:4, name: props.value, color: "#c4c4c4", is_selected: true, name_fl: props.value.charAt(0)}
      this.setState({selected_user:obj})
    }
  }
  render(){
    var load_user=this.state.user_list.map(main=>{
      return(<li key={main.id} id={main.id} className="list-group-item" onClick={this.NameClick}  style={{background:main.is_selected?'#F4F5F7':''}}>
              <div id={main.id} style={{background:main.color}}>{main.name_fl}</div>
              <a id={main.id}>{main.name}</a>
              <i className="tick fa fa-check" style={{display:main.is_selected?'block':'none'}}/>
      </li>)
    })
    return(
              <div className="dropdown">
                <div className="name_heading pull-left dropdown-toggle" style={{background:this.state.selected_user.color}} data-toggle="dropdown">
                {this.state.selected_user.name_fl}
                </div>
                <div className="selected_name dropdown-toggle" data-toggle="dropdown">{this.state.selected_user.name}</div>
                <a className="dropdown-toggle togal_arrow pull-right" data-toggle="dropdown"  >
                  <i className={this.state.togal_icon}/></a>
                <div className="dropdown-menu"  >
                  <div className="input-group">
                    <input type="text" className="form-control"  placeholder="Search for user" value={this.state.searchValue} onChange={this.searchValueChange} />
                    <span className="input-group-addon"><i className="fa fa-search"></i></span>
                  </div>
                  <div style={{width:"100%"}}>
                    <ul className="list-group list-group-unbordered">
                      {load_user}
                    </ul>
                  </div>
                </div>
              </div>
           )
  }
}
export default dropdown
