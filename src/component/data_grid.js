import React from "react";
import Dropdown from './dropdown'
import Progressbar from './progress'
import Pagination from "react-js-pagination";
import task from '../data/task';
var color_arr=["#F4AF64","#5F80B9","#80C483","#F4AF64","#5F80B9","#80C483","#F4AF64","#5F80B9","#80C483","#F4AF64","#5F80B9","#80C483"]

const sortTaskName = {
	up: { class: 'fa fa-fw fa-sort-amount-asc fa-lg', fn: (a, b) => a.task_name > b.task_name },
	down: { class: 'fa fa-fw fa-sort-amount-desc fa-lg', fn: (a, b) => b.task_name < a.task_name },
	default: { class: 'fa fa-fw fa-sort-amount-asc fa-lg', fn: (a, b) => a }
}

class data_grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
      tasks_temp:[],
      activePage:1,
      load:false,
      items_per_page:[10,20,30,40,50,60,70,80,90,100],
      select_no_item:10,
      is_checked:false,
      currSortTask: 'default',
      currentSort: 'default',
      search_val:'',
			togal_icon_task:'fa-sort-amount-asc',
			togal_icon_lob:'fa-sort-amount-asc',
			togal_icon_subtask:'fa-sort-amount-asc',
			togal_icon_assign_to:'fa-sort-amount-asc',
			togal_icon_step:'fa-sort-amount-asc',
			togal_icon_due_date:'fa-sort-amount-asc',
    }
  }
  componentDidMount() {
    task.map((main,i)=>{
      var index=Math.round(i/10)
      return main.due_date={date:this.format_date_time(new Date(+(new Date()) - Math.floor(Math.random()*10000000000))),
                            percent:Math.floor(Math.random() * 100),
                            color:color_arr[index]};main.is_selected=false
    })
    const offset = (1 - 1) * this.state.select_no_item;
    const current_page = task.slice(offset, offset + this.state.select_no_item);
    this.setState({ activePage:1,tasks:current_page,tasks_temp:task });
  }
  format_date_time=(date)=>{
            var day,month, hr,min,am_pm;
            var dt=new Date(date)
            day=dt.getDate()<10?'0'+dt.getDate():dt.getDate()
            month=(dt.getMonth()+1)<10?'0'+(dt.getMonth()+1):(dt.getMonth()+1);
            hr=dt.getHours()<10?'0'+dt.getHours():dt.getHours();
            min=dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes();
            am_pm=hr >= 12 ? 'PM' : 'AM';
            hr = hr % 12;
            hr = hr<10?'0'+hr:hr;

        var format_dt=month+'/'+day+'/'+dt.getFullYear()+' @ '+hr+':'+min+' '+am_pm;
        return(format_dt)
  }
  onPageChanged =(pageNumber)=> {
    const offset = (pageNumber - 1) * this.state.select_no_item;
    const current_page = this.state.tasks_temp.slice(offset, offset + this.state.select_no_item);
    this.setState({ activePage:pageNumber,tasks:current_page });
  };
  NameClick=(name)=>{

  }
  pagenoChange=(e)=>{

  }
  checkedChange=(e)=>{
    var task=this.state.tasks;
    task.map(main=>{
      return main.is_selected=e.target.checked
    })
    this.setState({is_checked:e.target.checked,tasks:task})
  }
  sortingTaskClick = (e) => {
			if (this.state.togal_icon_task==="fa-sort-amount-asc") {
					var arr_task = this.sort_data(this.state.tasks,"task_name",false)
					this.setState({togal_icon_task:"fa-sort-amount-desc",tasks:arr_task})
			}else {
					var arr_task = this.sort_data(this.state.tasks,"task_name")
					this.setState({togal_icon_task:"fa-sort-amount-asc",tasks:arr_task})
			}
	 }
	sortingSubtaskClick = (e) => {
		if (this.state.togal_icon_subtask==="fa-sort-amount-asc") {
				var arr_task = this.sort_data(this.state.tasks,"sub_tasks",false)
				this.setState({togal_icon_subtask:"fa-sort-amount-desc",tasks:arr_task})
		}else {
				var arr_task = this.sort_data(this.state.tasks,"sub_tasks")
				this.setState({togal_icon_subtask:"fa-sort-amount-asc",tasks:arr_task})
		}
	}
	sortingLobClick= (e) => {
		if (this.state.togal_icon_lob==="fa-sort-amount-asc") {
				var arr_task = this.sort_lob(this.state.tasks,"lob",false)
				this.setState({togal_icon_lob:"fa-sort-amount-desc",tasks:arr_task})
		}else {
				var arr_task = this.sort_lob(this.state.tasks,"lob")
				this.setState({togal_icon_lob:"fa-sort-amount-asc",tasks:arr_task})
		}
	}
	sortingAssignClick= (e) => {
		if (this.state.togal_icon_assign_to==="fa-sort-amount-asc") {
				var arr_task = this.sort_data(this.state.tasks,"assigned_to",false)
				this.setState({togal_icon_assign_to:"fa-sort-amount-desc",tasks:arr_task})
		}else {
				var arr_task = this.sort_data(this.state.tasks,"assigned_to")
				this.setState({togal_icon_assign_to:"fa-sort-amount-asc",tasks:arr_task})
		}
	}
	sortingStepClick= (e) => {
		if (this.state.togal_icon_step==="fa-sort-amount-asc") {
				var arr_task = this.sort_data(this.state.tasks,"step",false)
				this.setState({togal_icon_step:"fa-sort-amount-desc",tasks:arr_task})
		}else {
				var arr_task = this.sort_data(this.state.tasks,"step")
				this.setState({togal_icon_step:"fa-sort-amount-asc",tasks:arr_task})
		}
	}
	sortingDateClick= (e) => {
		if (this.state.togal_icon_due_date==="fa-sort-amount-asc") {
				var arr_task = this.sort_due_date(this.state.tasks,"due_date",false)
				this.setState({togal_icon_due_date:"fa-sort-amount-desc",tasks:arr_task})
		}else {
				var arr_task = this.sort_due_date(this.state.tasks,"due_date")
				this.setState({togal_icon_due_date:"fa-sort-amount-asc",tasks:arr_task})
		}
	}
  search_valChange=(e)=>{
  	let matches = this.state.tasks_temp.filter(v => v.lob.lob.toLowerCase().includes(e.target.value.toLowerCase()));
  this.setState({search_val:e.target.value})
	}
	sort_data=(objectsArr, prop, ascending = true)=> {
        let objectsHaveProp = objectsArr.every(object => object.hasOwnProperty(prop));
        if(objectsHaveProp)    {
            let newObjectsArr = objectsArr.slice();
            newObjectsArr.sort((a, b) => {
                if(isNaN(Number(a[prop])))  {
                    let textA = a[prop].toUpperCase(),
                        textB = b[prop].toUpperCase();
                    if(ascending)   {
                        return textA < textB ? -1 : textA > textB ? 1 : 0;
                    } else {
                        return textB < textA ? -1 : textB > textA ? 1 : 0;
                    }
                } else {
                    return ascending ? a[prop] - b[prop] : b[prop] - a[prop];
                }
            });
            return newObjectsArr;
        }
        return objectsArr;
    }
	sort_due_date=(objectsArr, prop, ascending = true)=> {
	        let objectsHaveProp = objectsArr.every(object => object.hasOwnProperty(prop));
	        if(objectsHaveProp)    {
	            let newObjectsArr = objectsArr.slice();
	            newObjectsArr.sort((a, b) => {
	                if(isNaN(Number(a[prop].date)))  {
	                    let textA = a[prop].date.toUpperCase(),
	                        textB = b[prop].date.toUpperCase();
	                    if(ascending)   {
	                        return textA < textB ? -1 : textA > textB ? 1 : 0;
	                    } else {
	                        return textB < textA ? -1 : textB > textA ? 1 : 0;
	                    }
	                } else {
	                    return ascending ? a[prop].date - b[prop].date : b[prop].date - a[prop].date;
	                }
	            });
	            return newObjectsArr;
	        }
	        return objectsArr;
	    }
	sort_lob=(objectsArr, prop, ascending = true)=> {
			        let objectsHaveProp = objectsArr.every(object => object.hasOwnProperty(prop));
			        if(objectsHaveProp)    {
			            let newObjectsArr = objectsArr.slice();
			            newObjectsArr.sort((a, b) => {
			                if(isNaN(Number(a[prop].lob)))  {
			                    let textA = a[prop].lob.toUpperCase(),
			                        textB = b[prop].lob.toUpperCase();
			                    if(ascending)   {
			                        return textA < textB ? -1 : textA > textB ? 1 : 0;
			                    } else {
			                        return textB < textA ? -1 : textB > textA ? 1 : 0;
			                    }
			                } else {
			                    return ascending ? a[prop].lob - b[prop].lob : b[prop].lob - a[prop].lob;
			                }
			            });
			            return newObjectsArr;
			        }
			        return objectsArr;
			    }
	checkedsingleChange=(e)=>{

	}
  render(){
      		const { tasks_temp,tasks,currSortTask ,currentSort} = this.state;
          var totl_rec=0
          if(tasks_temp.length>0)
             totl_rec=tasks_temp.length;
          var load_task=tasks.map((main,i)=>{
            return(
              <div className="grid-body" key={i}>
                <div className="settings"></div>
                <div className="check"><input type="checkbox" checked={main.is_selected} onChange={this.checkedsingleChange}/></div>
                <div className="task_name"><a href="#">{main.task_name}</a></div>
                <div className="lob"><div className="lob_style" style={{background:main.lob.color}}>{main.lob.lob}</div></div>
                <div className="sub_tasks text-center task_name" >{main.sub_tasks}</div>
                <div className="assigned_to"><Dropdown id={main.task_id} value={main.assigned_to} NameClick={this.NameClick} /></div>
                <div className="step" >{main.step}</div>
                <div className="due_date" >
                  <Progressbar percentage={main.due_date.percent} dateValue={main.due_date.date} progressColor={main.due_date.color}/>
                </div>
            </div>
            )
          });
          var load_page_count=this.state.items_per_page.map(main=>{
              return(<option key={main} value={main}>{main}</option>)
          })
    return(<div className="supervisor-view-grid">
            <div className=" row grid-control">
                <div className="col-md-1 pad-l-5 pad-r-5">
                    <label className="switch">
                      <input type="checkbox"/>
                      <span className="slider round"></span>
                    </label>
                </div>
                <div className="col-md-3 pad-l-5 pad-r-5">
                  <div className="form-horizontal">
                    <div className="form-group">
                          <div className="col-sm-8 pad-l-5 pad-r-5" style={{marginTop:9}}>
                            <input type="text" className="form-control progress" value={this.state.search_val} onChange={this.search_valChange} />
                          </div>
                          <span className="col-sm-4 pad-l-5 pad-r-5">Result {tasks_temp.length}</span>
                      </div>
                  </div>
                </div>
                <div className="col-md-2 pad-l-5 pad-r-5">
                  <div className="form-horizontal">
                  <div className="form-group">
                    <span className="col-sm-8 pad-l-5 pad-r-5" for="email">Items per page :</span>
                        <div className="col-sm-4 pad-l-5 pad-r-5" style={{marginTop:9}}>
                          <select className="form-control" style={{width:65}} value={this.state.select_no_item} onChange={this.pagenoChange}>{load_page_count}</select>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pad-l-5 pad-r-5">
                  <Pagination activePage={this.state.activePage} pageRangeDisplayed={5}
                              prevPageText={<i className='fa  fa-chevron-left'/>}
                              nextPageText={<i className='fa  fa-chevron-right'/>}
                              itemsCountPerPage={this.state.select_no_item} totalItemsCount={totl_rec} onChange={this.onPageChanged} />
                </div>
                <div className="col-md-2 pad-l-5 pad-r-5">
                <div className="form-horizontal">
                  <div className="form-group">
                        <span className="col-sm-5 pad-l-5 pad-r-5" for="email">Go to page :</span>
                        <div className="col-sm-3 pad-l-5 pad-r-5" style={{marginTop:10}}>
                          <input type="text" className="form-control" />
                        </div>
                        <span className="col-sm-4 pad-l-5 pad-r-5" ><a href="#">Go </a></span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="grid-head">
              <div className="settings"><i className="fa fa-fw fa-cogs fa-2x"></i></div>
              <div className="check"><input type="checkbox" checked={this.state.is_checked} onChange={this.checkedChange}/></div>
              <div className="task_name">Task name <a href="#" onClick={this.sortingTaskClick} id="task_name" className="pull-right "><i className={"fa fa-fw fa-lg "+this.state.togal_icon_task}/> </a></div>
              <div className="lob">lob <a href="#" onClick={this.sortingLobClick} id="lob" className="pull-right"><i className={"fa fa-fw fa-lg "+this.state.togal_icon_lob}/> </a></div>
              <div className="sub_tasks">subtasks <a href="#"  onClick={this.sortingSubtaskClick} id="sub_tasks" className="pull-right"><i className={"fa fa-fw fa-lg "+this.state.togal_icon_subtask}/> </a></div>
              <div className="assigned_to">assignedto <a href="#" onClick={this.sortingAssignClick} id="assigned_to" className="pull-right"><i className={"fa fa-fw fa-lg "+this.state.togal_icon_assign_to}/> </a></div>
              <div className="step">step <a href="#"  onClick={this.sortingStepClick} id="step" className="pull-right"><i className={"fa fa-fw fa-lg "+this.state.togal_icon_step}/> </a></div>
              <div className="due_date">due date <a href="#"  onClick={this.sortingDateClick} id="due_date" className="pull-right"><i className={"fa fa-fw fa-lg "+this.state.togal_icon_due_date}/> </a></div>
            </div>
              {load_task}

           </div>)
  }
}
export default data_grid
