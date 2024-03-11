import React,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DrawerLeft from './DrawerLeft';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, addTask, updateTask } from './taskSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TextField, Button, Modal, MenuItem, Select } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center"
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TaskForm() {

  const open = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [taskName, setTaskName] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskType, setTaskType] = useState('')
  const [hoursBudgeted, setHoursBudgeted] = useState()
  const [actualHoursTaken, setActualHoursTaken] = useState()
  const [addTaskModal, setAddTaskModal] =  useState(false)
  const [editTaskModal, setEditTaskModal] = useState(false)
  const [editTaskDetail, setEditTaskDetail] = useState({})
  const [editRowId, setEditRowId] = useState('')
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskStatus, setEditTaskStatus] = useState('')
  const [editTaskType, setEditTaskType] = useState('')
  const [editHoursBudgeted, setEditHoursBudgeted] = useState()
  const [editActualHoursTaken, setEditActualHoursTaken] = useState()

  useEffect(() => {
    dispatch(fetchTask());
    console.log("Fetch task calls")
  }, [dispatch]);

  const handleCloseAdd = () => {
    setAddTaskModal(false)
    handleResetAllData()
  }
  const handleCloseEdit = () => {
    setEditTaskModal(false)
    handleResetAllData()
  }
  const handleEdit = (e, idval) => {
    const taskToEdit = tasks.find(task => task._id === idval);
    console.log("task to edit", taskToEdit)
    setEditTaskDetail(taskToEdit)
    setEditTaskName(taskToEdit.taskName)
    setEditTaskStatus(taskToEdit.taskStatus)
    setEditTaskType(taskToEdit.taskType)
    setEditHoursBudgeted(taskToEdit.hoursBudgeted)
    setEditActualHoursTaken(taskToEdit.actualHoursTaken)
    setEditRowId(taskToEdit._id)
    setEditTaskModal(true)

  }

  const handleResetAllData = () => {
    setTaskName('')
    setTaskStatus('')
    setTaskType('')
    setHoursBudgeted()
    setActualHoursTaken()
    setEditTaskName('')
    setEditTaskStatus('')
    setEditTaskType('')
    setHoursBudgeted()
    setActualHoursTaken()
  }
  const handleAddTask = async (e) => {
    const taskFormData = {
      taskName: taskName,
      status: taskStatus,
      taskType: taskType,
      hoursBudgeted: hoursBudgeted,
      actualHoursTaken: actualHoursTaken,
    }
    console.log(taskFormData)
    e.preventDefault();
    dispatch(addTask(taskFormData));
    setAddTaskModal(false)
    handleResetAllData()
  }
  const handleEditTask = async (e, _id) => {
    const editTaskData = {
      taskName: editTaskName,
      status: editTaskStatus,
      taskType: editTaskType,
      hoursBudgeted: editHoursBudgeted,
      actualHoursTaken: editActualHoursTaken,
    }
    console.log(editTaskData, "editTaskDetail")
    const taskToEditVal = tasks.find(task => task._id === _id);
    handleCloseEdit(false)
    e.preventDefault();
    console.log(_id, "edit id")
    console.log(taskToEditVal)
    dispatch(updateTask({_id, ...editTaskData}));
    handleResetAllData()
  }

  const mainContentStyle = {
    transition: 'margin 0.5s ease',
    marginLeft: open ? "200px" : "0px",
    padding: '0px 23px',
    backgroundColor: '#eaecfb',
    height: '100vh',
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight:700,
    bgcolor: 'background.paper',
    boxShadow: '0.5px',
    overflow: 'auto',
  };
  return (
    <div style={{ backgroundColor:"#eaecfb", height: "100vh", overflowX: "hidden"}}>
      <DrawerLeft />
      <Box style={mainContentStyle}>
        <Grid container spacing={1} style={{display: 'flex', flexDirection: 'row', margin: '12px 37px'}}>
          <Grid item xs={12} sm={11} style={{paddingLeft: "16px", paddingTop: "16px",}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Task Name</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    {/* <StyledTableCell align="right">Due Date</StyledTableCell> */}
                    <StyledTableCell align="center">Task Type</StyledTableCell>
                    <StyledTableCell align="center">Hours Budgeted</StyledTableCell>
                    <StyledTableCell align="center">Actual Hours</StyledTableCell>
                    <StyledTableCell align="center">Edit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((tasks) => {
                    return(
                    <StyledTableRow key={tasks._id}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {tasks.taskName}
                      </StyledTableCell>
                      <StyledTableCell align="center">{tasks.status}</StyledTableCell>
                      <StyledTableCell align="center">{tasks.taskType}</StyledTableCell>
                      <StyledTableCell align="center">{tasks.hoursBudgeted}</StyledTableCell>
                      <StyledTableCell align="center">{tasks.actualHoursTaken}</StyledTableCell>
                      <StyledTableCell align="center"><ModeEditIcon style={{height: "20px", width: "20px", cursor: "pointer"}} onClick={(e) => handleEdit(e, tasks._id)}/></StyledTableCell>
                    </StyledTableRow>
                    )
                    })}
                    <TableRow style={{}}>
                      <TableCell colSpan={6} align='center'sx={{backgroundColor: '#48b6d7', textTransform: 'none', color: "#ffffff", cursor: "pointer"}} onClick={() => setAddTaskModal(true)}>Add Task +</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <>
        <Modal open={addTaskModal} onClose={handleCloseAdd}>
          <Box sx={style}>
            <div style={{margin: '20px 50px' }}>
              <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px'}}> Add your Task Details</h4>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Name</label>
                <TextField  hiddenLabel onChange={(e) => setTaskName(e.target.value)} placeholder='task name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Status</label>
                <Select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"pending"}>pending</MenuItem>
                  <MenuItem value={"in-progress"}>in-progress</MenuItem>
                  <MenuItem value={"completed"}>completed</MenuItem>
                </Select>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Type</label>
                <TextField  hiddenLabel onChange={(e) => setTaskType(e.target.value)} placeholder='task type' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Hours Budgeted</label>
                <TextField  hiddenLabel onChange={(e) => setHoursBudgeted(e.target.value)} placeholder='hours budgeted' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Actual Hours Taken</label>
                <TextField  hiddenLabel onChange={(e) => setActualHoursTaken(e.target.value)} placeholder='actual hours' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <Button onClick={(e) => handleAddTask(e)} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Save</Button>
              </div>
            </div>
          </Box> 
        </Modal>
      </>
      <>
        <Modal open={editTaskModal} onClose={handleCloseEdit}>
          <Box sx={style}>
            <div style={{margin: '20px 50px' }}>
              <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px'}}> Edit your Task Details</h4>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Name</label>
                <TextField  hiddenLabel onChange={(e) => setEditTaskName(e.target.value)} placeholder="Task Name" value={editTaskName} variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Status</label>
                <Select value={editTaskStatus} onChange={(e) => setEditTaskStatus(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"pending"}>pending</MenuItem>
                  <MenuItem value={"in-progress"}>in-progress</MenuItem>
                  <MenuItem value={"completed"}>completed</MenuItem>
                </Select>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Task Type</label>
                <TextField  hiddenLabel onChange={(e) => setEditTaskType(e.target.value)} placeholder="Task Type" value={editTaskType} variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Hours Budgeted</label>
                <TextField  hiddenLabel onChange={(e) => setEditHoursBudgeted(e.target.value)} placeholder="Hours budgeted" value={editHoursBudgeted} variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <label style={{fontSize: '16px', fontWeight: 700}}>Actual Hours Taken</label>
                <TextField  hiddenLabel onChange={(e) => setEditActualHoursTaken(e.target.value)} placeholder='Actual hours taken' value={editActualHoursTaken} variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                <Button onClick={(e) => handleEditTask(e, editRowId)} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Save</Button>
              </div>
            </div>
          </Box> 
        </Modal>
      </> 
    </div>
  );
}