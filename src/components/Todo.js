import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';


// Getting Local storage data

const getLocalstroargeData = () => {
    const list = localStorage.getItem("My todo list")
    if (list) {
        return JSON.parse(list);
    }
    else {
        return []
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalstroargeData())
    const [editItem, setEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)




    // Adding data into todolist

    const addDatain = () => {

        if (!inputData) {
            console.warn("Enter Any task")
        }
        else if (inputData && toggleButton) {
            setItems(
                items.map((data) => {
                    if (data.id == editItem) {
                        return { ...data, name: inputData }
                    }
                    return data;
                })
            )
            setInputData("")
            setEditItem(null)
            setToggleButton(false)

        }

        else {

            // Getting unique id 


            const gettingId = {
                id: new Date().getTime().toString(),
                name: inputData

            };
            setItems([...items, gettingId])
            setInputData("")
        }
    }

    // deleteing data from a todolist

    const deleteData = (index) => {
        const filterData = items.filter((data) => {
            return data.id !== index;
        });
        setItems(filterData)
    };


    // Remove all the Element in the todo list
    const removeAll = () => {
        setItems([])
    }

    //   This is method used for storing data in localstorage
    useEffect(() => {
        localStorage.setItem("My todo list", JSON.stringify(items))
    }, [items])

    // Updateing the data 

    const updateDateTask = (index) => {
        const item_tobe_update = items.find((data) => {
            return data.id === index;
        })
        setInputData(item_tobe_update.name)
        setEditItem(index)
        setToggleButton(true)
    }

    return (
        <div>
            <br />
            <Button variant="info" style={{width:"60%"}}>Daily Task to Assign candidate...</Button>
            <br /><br />
            <input type='text' style={{width:"20%"}} placeholder='Enter Task here..' value={inputData} onChange={(event) => setInputData(event.target.value)} />


            {/* Toggle the Button */}

            {toggleButton ?
                (<button style={{ backgroundColor: "green", color: "whitesmoke" }} onClick={addDatain}>Update Task</button>
                ) : <button style={{ backgroundColor: "green", color: "whitesmoke" }} onClick={addDatain}>Add Task</button>




            }
            <div> <br /><br />
                {items.map((data) => {
                    return (
                        <div key={data.id} className="Editt">

                            <button style={{width:"40%",height:"50px"}}><h5>{data.name}</h5></button> &nbsp;
                            <button style={{height:"50px",backgroundColor:"greenyellow"}} onClick={() => updateDateTask(data.id)}>Update Task</button>  &nbsp;
                             <button style={{height:"50px",backgroundColor:"red", color:"white"}} onClick={() => deleteData(data.id)}>Delete</button>
                            <br></br><br></br>
                        </div>

                    )
                })}
            </div>
            <Button onClick={removeAll}>Remove all</Button>
        </div>
    )
}

export default Todo
