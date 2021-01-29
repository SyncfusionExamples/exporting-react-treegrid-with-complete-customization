import React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective,
         Inject, Page, Toolbar, PdfExport, TreeGrid, ExcelExport} from '@syncfusion/ej2-react-treegrid';
import { summaryData } from './datasource';

import './App.css';

function App() {
  let treegrid: TreeGrid | null;
  const toolbarSettings: any = ["PdfExport", "ExcelExport"];
  const toolbarBtnClick = (args: any) =>{
    if(treegrid){
      //Customize pdf export
      if(args.item.id.includes("pdfexport")){
        treegrid.pdfExport({
          fileName: "SummaryData.pdf",
          theme: {
            header:{
              fontSize: 12,
              bold: true
            },
            record: {
              fontSize: 9,
              fontColor: "#0000ff"
            }
          },
          header: {
            fromTop: 0,
            height: 130,
            contents: [{
              type: 'Text',
              value: "Time Tracking Report",
              position: { x:0, y: 50 },
              style: {fontSize:20}
            }]
          },
          footer: {
            contents: [{
              type: 'Text',
              value: "Thank You",
              position: { x:0, y: 50 },
              style: {fontSize:18}
            }],
            fromBottom: 130,
            height: 130
          }
        });
      } //Customize excel export
      else if(args.item.id.includes("excelexport")){
        treegrid.excelExport({
          fileName: "SummaryData.xlsx",
          theme: {
            header:{
              fontSize: 12,
              bold: true
            },
            record: {
              fontSize: 9,
              fontColor: "#0000ff"
            }
          },
          header:{
            headerRows: 1,
            rows: [{
              cells: [{
                colSpan: 4,
                value: "Time Tracking Report",
                style: { fontSize: 20, hAlign: "Center", bold: true }
              }]
            }]
          },
          footer:{
            footerRows: 1,
            rows: [{
              cells: [{
                colSpan: 4,
                value: "Thank You",
                style: { fontSize: 14, hAlign: "Center", bold: true }
              }]
            }]
          }
        });
      }
    }
  }
  return (
    <TreeGridComponent ref={tg=> treegrid = tg} dataSource={summaryData} childMapping="subtasks" treeColumnIndex={1} allowPaging={true}
    toolbar={toolbarSettings} allowPdfExport={true} toolbarClick={toolbarBtnClick} allowExcelExport={true}>
      <Inject services={[Page, Toolbar, PdfExport, ExcelExport]} />                   
      <ColumnsDirective>
        <ColumnDirective field="taskID" headerText="Task ID" width='90' textAlign="Right"></ColumnDirective>
        <ColumnDirective field="taskName" headerText="Task Name"></ColumnDirective>
        <ColumnDirective field="startDate" headerText="Start Date" format='yMd'></ColumnDirective>
        <ColumnDirective field="duration" headerText="Duration"></ColumnDirective>
        <ColumnDirective field="priority" headerText="Priority"></ColumnDirective>
        <ColumnDirective field="approved" headerText="Approved"></ColumnDirective>
      </ColumnsDirective>
    </TreeGridComponent>
  );
}

export default App;
