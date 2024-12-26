import React, { useState } from 'react'
import axios from 'axios'

function Create() {
        const [task, setTask] = useState('');
        const handleAdd =() => {
            axios.post('https://todolist-46vi.onrender.com/add' , {task: task})
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
        }

  return (
    <div className='create_form'>
        <input type='text' name='' id='' placeholder='Enter A Task' onChange={(e) => setTask(e.target.value)}/>
        <button type='button' onClick={handleAdd}>Add</button>




    </div>
  )
}

export default Create