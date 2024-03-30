import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Studentist = () => {
     const [dt, setDt] = useState([]);
     const [uid, setUid] = useState();
     const [searchQuery, setSearchQuery] = useState('');
     const [reserdata, setReserData] = useState({
          name: '',
          rno: '',
          cource: '',
          age: '',
     })
     const handleChange = (e) => {
          const { name, value } = e.target;
          setReserData({ ...reserdata, [name]: value });
     }
     const fetchitem = async () => {
          try {
               await fetch("http://localhost:3000/rooms/").then(res => res.json()).then
                    (res => setDt(res));
          } catch (error) {
               console.log(error.message);
          }
     }
     useEffect(() => {
          fetchitem();
     }, []);

     const handleSubmit = (e) => {
          fetch('http://localhost:3000/rooms/', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(reserdata)
          })
               .then(res => res.json())
          fetchitem();
     }
     const handleSearchChange = (e) => {
          setSearchQuery(e.target.value);
     };

     const editData = (id) => {
          setUid(id);
          fetch("http://localhost:3000/rooms/" + id, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json"
               },
          })
               .then(res => res.json())
               .then(json => setReserData(json));
     }
     const deleteData = (id) => {

          setDt(dt.filter(item => item.id !== id));

          fetch("http://localhost:3000/rooms/" + id, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(reserdata)
          })
               .then(res => res.json())
               .then(json => console.log(json))
               .catch(error => console.error('Error deleting data:', error));

     }

     return (
          <>
               <div className='frm'>
                    <form onSubmit={handleSubmit} method='post'>
                         <Box
                              sx={{
                                   width: 500,
                                   maxWidth: '100%',
                                   marginLeft: "75px",
                                   marginTop: "30px"
                              }}
                         >
                              <TextField fullWidth label="userid" name='rno' value={reserdata.rno} onChange={handleChange} id="fullWidth" />
                              <br /><br />

                              <TextField fullWidth label="name" name='name' value={reserdata.name} onChange={handleChange} id="fullWidth" />
                              <br /><br />

                              <TextField fullWidth label="cource" name='cource' value={reserdata.cource} onChange={handleChange} id="fullWidth" />
                              <br /><br />

                              <TextField fullWidth label="age" name='age' value={reserdata.age} onChange={handleChange} id="fullWidth" />
                              <br /><br />
                              <Button type='submit' variant="contained" color="success">
                                   SaveData
                              </Button>
                         </Box>
                    </form>
               </div>
               <TextField
                    label="Search"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginTop: '20px', marginLeft: '75px', width: '400px' }}
               />

               <table className='table table-striped'>
                    <thead>
                         <tr className='fw-bold'>
                              <td>Id</td>
                              <td>Name</td>
                              <td>Cource</td>
                              <td>Age</td>
                         </tr>
                    </thead>
                    <tbody>
                         {
                              dt.map((i) => {
                                   return (
                                        <tr>
                                             <td>{i.rno}</td>
                                             <td>{i.name}</td>
                                             <td>{i.cource}</td>
                                             <td>{i.age}</td>
                                             <td><button className='btn btn-outline-info' onClick={() => editData(i.id)}>Edit</button>&nbsp;<button className='btn btn-outline-danger' onClick={() => deleteData(i.id)}>Delete</button></td>
                                        </tr>
                                   )
                              })
                         }
                    </tbody>
               </table>
          </>
     )
}

export default Studentist
