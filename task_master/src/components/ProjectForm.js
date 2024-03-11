import React, { useState, useEffect } from 'react';
import {Card, Divider, Grid, Box, Button, Modal, TextField } from '@mui/material';
import DrawerLeft from './DrawerLeft';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject, updateProject } from './projectSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


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



const ProjectForm = () => {
  const open = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [addProjectBool, setAddProjectBool] = useState(false)
  const [editProjectModal, setEditProjectModal] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const [estTime, setEstTime] = useState()
  const [actTime, setActTime] = useState()
  const [toolsUsed, setToolsUsed] = useState([])
  const [addInf, setAddInf] = useState('')
  const [editProjectComplete, setEditProjectComplete] = useState({})
  const [editProjectName, setEditProjectName] = useState('')
  const [editClientName, setEditClientName] = useState('')
  const [editProjectDetails, setEditProjectDetails] = useState('')
  const [editEstTime, setEditEstTime] = useState()
  const [editActTime, setEditActTime] = useState()
  const [editToolsUsed, setEditToolsUsed] = useState([])
  const [editAddInf, setEditAddInf] = useState('')
  const [editRowId, setEditRowId] = useState('')

  const mainContentStyle = {
    transition: 'margin 0.5s ease',
    marginLeft: open ? "200px" : "0px", 
    padding: '0px 23px',
    backgroundColor: '#eaecfb',
    height: '100vh',
};

const handleClose = () => {
  setAddProjectBool(false)
}

const handleCloseEditProject = () => {
  setEditProjectModal(false)
}

const handleResetProjectAddEdit = () => {
  setProjectName('')
  setClientName('')
  setProjectDetails('')
  setEstTime()
  setActTime()
  setToolsUsed([])
  setAddInf('')
  setEditProjectComplete({})
  setEditProjectName('')
  setEditClientName('')
  setEditProjectDetails('')
  setEditEstTime()
  setEditActTime()
  setEditAddInf('')
  setEditRowId('')
}

const handleAddProject = async (e) => {
  const projectformData = {
    projectName: projectName,
    projectDescription: projectDetails,
    clientName: clientName,
    estimationTime: estTime,
    actualTime: actTime,
    toolsUsed: toolsUsed,
    additionalInformation: addInf
  }
  console.log(projectformData)
  e.preventDefault();
  dispatch(addProject(projectformData));
  setAddProjectBool(false)
  handleResetProjectAddEdit()
}

const handleProjectEdit = (e, idval) => {
  const projectToEdit = projects.find(project => project._id === idval);
  console.log("task to edit", projectToEdit)
  setEditProjectComplete(projectToEdit)
  setEditProjectName(projectToEdit.projectName)
  setEditClientName(projectToEdit.clientName)
  setEditProjectDetails(projectToEdit.projectDescription)
  setEditEstTime(projectToEdit.estimationTime)
  setEditActTime(projectToEdit.actualTime)
  setEditToolsUsed(projectToEdit.toolsUsed)
  setEditAddInf(projectToEdit.additionalInformation)
  setEditRowId(projectToEdit._id)
  setEditProjectModal(true)
}

const handleEditProject = (e, id) => {
  const editProjectdata = {
    projectName: editProjectName,
    projectDescription: editProjectDetails,
    clientName: editClientName,
    estimationTime: editEstTime,
    actualTime: editActTime,
    toolsUsed: editToolsUsed,
    additionalInformation: editAddInf
  }
  console.clear()
  console.log(editProjectdata, "EditValues")
  dispatch(updateProject({id, ...editProjectdata}))
  setEditProjectModal(false)
  handleResetProjectAddEdit()
}


useEffect(() => {
  dispatch(fetchProjects());
  console.log("Fetch Project calls")
}, [dispatch]);


  return (
    <div style={{ backgroundColor:"#eaecfb", height: "100vh", overflowX: "hidden"}}>
      <DrawerLeft />
      <Box style={mainContentStyle}>
        <Grid container spacing={1} style={{display: 'flex', flexDirection: 'row', margin: '12px 37px', paddingRight: "50px"}}>
          {projects && projects.map((project) => {
            return(
              <Grid item xs={12} sm={6} md={4} style={{paddingLeft: "16px", paddingTop: "16px",}}>
                <Card sx={{maxWidth: "430px", height: "650px"}}>
                  <Box style={{maxWidth: "430px", height: "35px", backgroundColor: "#808080"}}>
                    <Grid container spacing={1} style={{display: "flex",flexDirection: "row"}}>
                      <Grid item xs={8}>
                        <h2 style={{color: "#fff", fontFamily: "sans-serif", fontWeight: 600, fontSize: "18px", textTransform: "capitalize", marginTop: "0px", marginLeft: "26px"}}>Project</h2>
                      </Grid>
                      <Grid item xs={4} style={{display:"flex", justifyContent: "flex-end"}}>
                      <ModeEditIcon style={{marginRight: "10px", color: "#fff"}} onClick={(e) => handleProjectEdit(e, project._id)} />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box style={{margin:20}}>
                    <Grid container spacing={1}  style={{display: "flex", flexDirection: "row"}}>
                      <Grid item xs={8}>
                        <Box style={{borderRight: "2px solid #e6e6e6"}}>
                          <p  style={{fontSize: "12px",fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-20px", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Project Name</p>
                          <h2 style={{fontFamily: "sans-serif", marginLeft: "20px",display: "flex", justifyContent:"center", alignItems:"center"}}>{project.projectName}</h2>
                        </Box>
                      </Grid>
                      <Divider />
                      <Grid item xs={4}>
                        <p style={{fontSize: "12px", fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-20px", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Client Name</p>
                        <h4 style={{fontFamily: "sans-serif", marginLeft: "20px",display: "flex", justifyContent:"center", alignItems:"center"}}>{project.clientName}</h4>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box>
                          <p style={{fontSize: "14px",fontWeight: 600, fontFamily: "sans-serif",marginTop: "10px", marginBottom: "-10px", backgroundColor: "#d3d6d8"}}>Project Details: </p>
                          <p style={{fontSize: "12px", fontFamily: "sans-serif", justifyContent: "start"}}>
                            {project.projectDescription}</p>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}  style={{display: "flex", flexDirection: "row"}}>
                      <Grid item xs={6}>
                        <Box style={{borderRight: "2px solid #e6e6e6"}}>
                          <p  style={{fontSize: "14px", fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-10px", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Estimation Time</p>
                          <p style={{fontFamily: "sans-serif",display: "flex", justifyContent:"center", alignItems:"center"}}>{project.estimationTime}</p>
                        </Box>
                      </Grid>
                      <Divider />
                      <Grid item xs={6}>
                        <Box>
                          <p  style={{fontSize: "14px", fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-10px", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Actual Time Taken</p>
                          <p style={{fontFamily: "sans-serif", display: "flex", justifyContent:"center", alignItems:"center"}}>{project.actualTime}</p>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={2} style={{display: "flex", flexDirection: "row"}}>
                      <Grid item xs={12}>
                        <Box>
                          <p  style={{fontSize: "14px", fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-10px",  display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Tools Used</p>
                          {project.toolsUsed.map((tools) => {
                            return (
                              <p style={{fontFamily: "sans-serif", display: "flex", justifyContent:"center", alignItems:"center"}}>{tools}</p>
                            )
                          })}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box style={{marginTop: "-20px"}}>
                          <p  style={{fontSize: "14px", fontWeight: 600, fontFamily: 'sans-serif', marginTop: "10px", marginBottom: "-10px", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "#d3d6d8"}}>Additional Information</p>
                          <p style={{fontFamily: "sans-serif", fontSize:"12px", display: "flex", justifyContent:"center", alignItems:"center"}}>{project.additionalInformation}</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
            )
          })}
          <Grid item xs={12} sm={6} md={4} style={{paddingLeft: "16px", paddingTop: "16px"}}>
            <Card sx={{maxWidth: "430px", height: "650px", border: "1px dashed blue", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "transparent"}}>
              <Box style={{margin:20}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box onClick={(e) => setAddProjectBool(true)} style={{width: "150px"}}>
                      <Button fullWidth style={{fontSize: "16px", fontFamily: "sans-serif", justifyContent: "center", backgroundColor: '#48b6d7', textTransform: "none", color: "#fff", alignItems: "center"}}>
                        Add Project + </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <>
        <Modal open={addProjectBool} onClose={handleClose}>
          <Box sx={style}>
              <div style={{margin: '20px 50px' }}>
                  <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px'}}> Add your Project Details</h4>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Project Name</label>
                      <TextField  hiddenLabel onChange={(e) => setProjectName(e.target.value)} placeholder='Project name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Client Name</label>
                      <TextField  hiddenLabel onChange={(e) => setClientName(e.target.value)} placeholder='Client Name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Project Details</label>
                      <TextField  hiddenLabel onChange={(e) => setProjectDetails(e.target.value)} placeholder='Project details' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Estimation Time</label>
                      <TextField  hiddenLabel onChange={(e) => setEstTime(e.target.value)} placeholder='Estimation time' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Actual Time Taken</label>
                      <TextField  hiddenLabel onChange={(e) => setActTime(e.target.value)} placeholder='Actual time' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Tools Used</label>
                      <TextField  hiddenLabel onChange={(e) => setToolsUsed([e.target.value])} placeholder='Tools used' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Additional information</label>
                      <TextField  hiddenLabel onChange={(e) => setAddInf(e.target.value)} placeholder='Additional information' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <Button onClick={(e) => handleAddProject(e)} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Add Project</Button>
                  </div>
              </div>
          </Box> 
        </Modal>
      </>

      <>
        <Modal open={editProjectModal} onClose={handleCloseEditProject}>
          <Box sx={style}>
              <div style={{margin: '20px 50px' }}>
                  <h4 style={{marginTop: '10px', marginBottom: '10px', fontSize: '16px'}}> Edit your Project Details</h4>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Project Name</label>
                      <TextField  hiddenLabel onChange={(e) => setEditProjectName(e.target.value)} value={editProjectName} placeholder='project name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Client Name</label>
                      <TextField  hiddenLabel onChange={(e) => setEditClientName(e.target.value)} value={editClientName} placeholder='Enter atleast 8+ characters' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Project Details</label>
                      <TextField  hiddenLabel onChange={(e) => setEditProjectDetails(e.target.value)} value={editProjectDetails} placeholder='project name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Estimation Time</label>
                      <TextField  hiddenLabel onChange={(e) => setEditEstTime(e.target.value)} value={editEstTime} placeholder='Enter atleast 8+ characters' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Actual Time Taken</label>
                      <TextField  hiddenLabel onChange={(e) => setEditActTime(e.target.value)} value={editActTime} placeholder='project name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Tools Used</label>
                      <TextField  hiddenLabel onChange={(e) => setEditToolsUsed([e.target.value])} value={editToolsUsed} placeholder='Enter atleast 8+ characters' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <label style={{fontSize: '16px', fontWeight: 700}}>Additional information</label>
                      <TextField  hiddenLabel onChange={(e) => setEditAddInf(e.target.value)} value={editAddInf} placeholder='project name' variant='outlined' fullWidth style={{backgroundColor: '#f4f6f7', marginRight: '5px'}} />
                  </div>
                  
                  <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                      <Button onClick={(e) => handleEditProject(e, editProjectComplete._id)} fullWidth variant='contained' style={{backgroundColor: '#48b6d7', textTransform: 'none'}}>Save</Button>
                  </div>
              </div>
          </Box> 
        </Modal>
      </>
    </div>
  )
}

export default ProjectForm