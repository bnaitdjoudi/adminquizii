import * as React from 'react';
import MaterialTable, { Column, QueryResult } from 'material-table';
import CommunService from "./../../services/CommunService";
import auth from "./../../userstuff/Authaurization";
import loc from "./../../locale/I18n";

interface SedgeTableState {
  columns: Array<Column<any>>;
  data: any;
  update: any;
  delete: any;
  actions: any


}

interface SedgeTableProp {
  oncreate: any;
  url: string
  title?: string | undefined
  columns: Array<Column<any>>;
  onedit?: (editObject: any) => void;
}



export default function SedgeTable(props: SedgeTableProp) {
  /**
 * definition de la localisation
 */
  const localisation = {
    body: {
      emptyDataSourceMessage: "",
      deleteTooltip: loc("delete"),
      editRow: {
        deleteText: loc("table.deleteMessage")
      }
    },
    toolbar: {
      searchTooltip: loc("table.toolbar.searchTooltip"),
      searchPlaceholder: loc("table.toolbar.searchPlaceholder")
    },
    pagination: {
      labelRowsSelect: loc("table.pagination.labelRowsSelect"),
      labelDisplayedRows: loc("table.pagination.labelDisplay"),
      firstTooltip: loc("table.pagination.first"),
      previousTooltip: loc("table.pagination.prev"),
      nextTooltip: loc("table.pagination.next"),
      lastTooltip: loc("table.pagination.last")
    }
  }

  const service = new CommunService(props.url);
  const tableRef: any = React.createRef();
  const data = (query: any) => new Promise<QueryResult<any>>((resolve, reject) => {

    service.processSearch({ pageNumber: (query.page + 1), size: query.pageSize, sorts: { id: "DESC" } })
      .then(resp => {
        resolve({
          data: resp.data.rows,
          page: resp.data.pageNumber - 1,
          totalCount: resp.data.totalOfElements,
        })
      }).catch((error) => {
        if (error.response.status === 403) {
          auth.resetLocalStoreSession();
         

        }
        resolve({
          data: [],
          page: 0,
          totalCount: 0,
        })
      });
  });

  const [actions] = React.useState<any>(
    [
      {
        icon: "refresh",
        tooltip: loc("refresh"),
        isFreeAction: true,
        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
      },
      {
        icon: "search",
        tooltip: loc("edit"),
        onClick: (event: any, rowData: any) => { if (props.onedit) { props.onedit(rowData); } else { console.log("row edit action not defined") } }
      }
      ,
      {
        icon: 'create_new_folder',
        tooltip: loc("create"),
        isFreeAction: true,
        onClick: props.oncreate
      }
    ]);

  const doDelete =
    (oldData: any) =>
      new Promise((resolve) => {
        service.processDeleteOne(oldData.id).then(resp => {
          resolve();

        });
      });


  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={data}
      tableRef={tableRef}
      editable={{
        onRowDelete: doDelete,
      }}
      actions={actions}

      localization={localisation}

    />
  );

}


