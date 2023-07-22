import "devextreme/dist/css/dx.dark.css";
import "./App.css";

import Scheduler, { View, Resource } from "devextreme-react/scheduler";
import { appointments, personData } from "./data";
import ArrayStore from "devextreme/data/array_store";
import { DataGrid, DropDownBox } from "devextreme-react";
import { useState } from "react";
import { Column } from "devextreme-react/data-grid";

const currentDate = new Date(2023, 1, 8);

const dsPerson = new ArrayStore({
  key: "id",
  data: personData,
});

const selectionOptions = {
  mode: "multiple",
};

function App() {
  const [value, setValue] = useState([1, 2]);
  const [groups, setGroups] = useState(["personId"]);
  const [data, setData] = useState(appointments);

  const selectionEvent = ({ selectedRowKeys, selectedRowsData }) => {
    setValue(selectedRowKeys);

    if (selectedRowKeys.length === 1) {
      setGroups([]);
      let newData = data.slice();
      setData(
        newData.filter(
          (appointment) => appointment.personId === selectedRowsData[0].id
        )
      );
    } else {
      setGroups(["personId"]);
      setData(appointments);
    }
  };

  const renderContent = () => {
    return (
      <DataGrid
        dataSource={dsPerson}
        columnAutoWidth={true}
        showBorders={true}
        hoverStateEnabled={true}
        selection={selectionOptions}
        onSelectionChanged={selectionEvent}
      >
        <Column dataField="text" />
        <Column dataField="age" />
        <Column dataField="discipline" />
      </DataGrid>
    );
  };

  return (
    <div className="App">
      <DropDownBox
        value={value}
        valueExpr="id"
        placeholder="Select a person ..."
        displayExpr="text"
        showClearButton={true}
        dataSource={dsPerson}
        contentRender={renderContent}
      />

      <Scheduler
        dataSource={data}
        textExpr="text"
        showAllDayPanel={false}
        height={600}
        recurrenceRuleExpr="recurrenceRule"
        currentDate={currentDate}
        groups={groups}
        currentView="month"
        startDayHour={9}
        endDayHour={20}
        timeZone="Europe/Berlin"
      >
        <View type="month" />
        <View type="timelineWeek" />
        <View type="agenda" />
        <Resource
          fieldExpr="personId"
          allowMultiple={false}
          dataSource={personData}
          label="Person"
        />
      </Scheduler>
    </div>
  );
}

export default App;
