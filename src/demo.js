import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState, 
  GroupingState, 
  IntegratedGrouping, 
  IntegratedEditing, 
  EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
// import {
//   teal, indigo,
// } from '@material-ui/core/colors';

const appointments = [
  {
    id: 0,
    title: 'Jone Doe',
    members: [2],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 9, 30),
    endDate: new Date(2017, 4, 28, 12, 0),
    color: "#3ddcf7"
  }, {
    id: 1,
    title: 'John Doe(wc)',
    members: [1],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 12, 30),
    endDate: new Date(2017, 4, 28, 14, 30),
    color: "#3bafda"
  }, {
    id: 2,
    title: 'Adam Delroy',
    members: [3],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 12, 30),
    endDate: new Date(2017, 4, 28, 14, 30),
    color: "#009886"
  }, {
    id: 3,
    title: 'John Doe',
    members: [4],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 12, 30),
    endDate: new Date(2017, 4, 28, 14, 30),
    color: "#ffaa00"
  }, {
    id: 4,
    title: 'Adam Delroy',
    members: [5],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 12, 30),
    endDate: new Date(2017, 4, 28, 14, 30),
    color: "#f76397"
  }, {
    id: 5,
    title: 'Adam Delroy',
    members: [5],
    roomId: 1,
    startDate: new Date(2017, 4, 28, 14, 30),
    endDate: new Date(2017, 4, 28, 15, 30),
    color: "#7266ba"
  }
];

const owners = [
  {
    text: 'John Doe',
    id: 1,
  }, {
    text: 'Jone Doe',
    id: 2,
  }, {
    text: 'Adam Delroy',
    id: 3,
  }, {
    text: 'John Doe',
    id: 4,
  }, {
    text: 'Adam Delroy',
    id: 5,
  }
];

// const locations = [
//   { text: 'Room 1', id: 1 },
// ];

const GroupingPanelCell = React.memo(({ group, ...restProps }) => {
  return (
    <GroupingPanel.Cell
      group={group}
      {...restProps}
      style={{textAlign: 'center'}}
    >
      <div style={{backgroundColor: "#009886", borderRadius: "0.25rem", width: 20, color: "white", margin: "auto"}}>
        0
      </div>
      {/* <div>
        Vehicle 1
      </div> */}
    </GroupingPanel.Cell>
  );
});

const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
  return null;
});

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [{
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      }],
      grouping: [ {
        resourceName: 'members',
      }],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

   appointment ({children, style, ...restProps}) {
console.log("children = ", children)
console.log("style = ", style)
console.log("restProps = ", restProps)
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: restProps.data.color,
          borderRadius: '8px',
        }}
      >
        {children}
      </Appointments.Appointment>
    );
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources, grouping } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-28"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
          />

          <DayView
            startDayHour={9}
            endDayHour={21}
            dayScaleCellComponent={DayScaleCell}
          />
          <Appointments appointmentComponent={this.appointment} />
          <Resources
            data={resources}
            mainResourceName="members"
          />

          <IntegratedGrouping />
          <IntegratedEditing />

          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <GroupingPanel
            cellComponent={GroupingPanelCell}
          />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
