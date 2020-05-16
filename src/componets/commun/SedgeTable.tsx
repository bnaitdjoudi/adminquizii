import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import  CommunService from "./../../services/CommunService";
import auth from "./../../userstuff/Authaurization";

interface SedgeTableState {
  columns: Array<Column<any>>;
  data: any;
  update:any;
  delete:any;
  actions:any

}

interface SedgeTableProp {
 oncreate:any;
 url:string
}
export default class SedgeTable extends React.Component<SedgeTableProp,SedgeTableState>{

  state:SedgeTableState={columns:[],data:[],actions:[],update:{},delete:{}};
  tableRef:any;
  service:CommunService;
  constructor(props:SedgeTableProp,mstate:SedgeTableState){
    super(props,mstate);
    this.state=mstate;
    this.service = new CommunService(this.props.url);
    
    this.tableRef = React.createRef();
  }

  componentWillMount(){
    this.setState({
      columns: [
        { title: "Title", field: "title" },
        { title: "CD", field: "createDate" },
        { title: "Category", field: "categorieTest.moduleName" },
      ]});
     this.setState({data:(query:any)=> new Promise((resolve,reject)=>{
       console.log(query);
      this.service.processSearch({pageNumber:(query.page + 1),size:query.pageSize,sorts:{id:"DESC"}})
      .then(resp=>{
        resolve({
          data: resp.data.rows,
          page: resp.data.pageNumber - 1,
          totalCount: resp.data.totalOfElements,
        })
        }).catch((error) => { 
          if(error.response.status===403){
          auth.resetLocalStoreSession();
          //window.location.reload(false);
          
        } 
        resolve({
          data: [],
          page: 0,
          totalCount: 0,
        })
      });
     })}); 

     this.setState({actions:
      [
        {
          icon: "refresh",
          tooltip: "Refresh",
          isFreeAction: true,
          onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
        },
        {
          icon: "edit",
          tooltip: "Edit",
          onClick: (event:any, rowData:any) => alert("You saved " + rowData.title)
        }
        ,
        {
          icon: 'create_new_folder',
          tooltip: 'Ajouter',
          isFreeAction: true,
          onClick: this.props.oncreate
        }
      ]
     }); 

     this.setState({update:(newData:any, oldData:any) =>
      new Promise((resolve) => {
        this.service.processPutOne(newData.id,newData).then(resp =>{
          resolve();
          
        });
       
        
        })
     }); 

     this.setState({delete:(oldData:any) =>
      new Promise((resolve) => {
        this.service.processDeleteOne(oldData.id).then(resp =>{
          resolve();
          
        });
      })
     }); 
     
  } 
  render(){
    return (
      <MaterialTable
      title="Liste des tests"
      columns={this.state.columns}
      data={this.state.data}
      tableRef={this.tableRef}
      editable={{
        onRowDelete: this.state.delete, 
      }}
      actions={this.state.actions}
    />
    );
  }
}


