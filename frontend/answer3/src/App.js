import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./App.css";

const EditForm = ({editData, onSubmitForm}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({mode: 'onBlur'});

  useEffect(() => {
    if (editData) {
      setValue('id', editData.id);
      setValue('Name', editData.Name);
      setValue('Info', editData.Info);
      setValue('Value', editData.Value);
    }
  }, [editData]);

  return <>
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div><label style={{color: errors.Name && 'red'}}>Name:</label><input {...register("Name", { required: true, maxLength: 20 })} ></input></div>
      <div><label style={{color: errors.Info && 'red'}}>Info:</label><input {...register("Info", { maxLength: 100 })}></input></div>
      <div><label style={{color: errors.Value && 'red'}}>Value:</label><input {...register("Value", {pattern: /^[0-9]+$/})}></input></div>
      <div style={{color: "red"}}>
        {Object.keys(errors).map(key => <div key={key}>{key + ": " + errors[key].type}</div>)}
      </div>
      <input type="hidden" {...register('id')} />
      <input type="submit" value={editData.id ? 'Сохранить' : 'Добавить'} />
    </form>
  </>
}

const Table = (props) => {
  const defaultRow = {id: 0, Name: 'NAME', Info: 'INFO', Value: '50'};
  const [editRow, setEditRow] = useState(defaultRow);
  const [table, setTable] = useState([
    {id: 1, Name: 'Alex', Info: 'Student', Value: '100'},
    {id: 2, Name: 'John', Info: 'Designer', Value: '120'},
    {id: 3, Name: 'Joel', Info: 'Actor', Value: '110'},
  ])
  const onSubmit = (data) => {
    if (data.id) {
      setTable(table.map(row => row.id === data.id ? data : row));
    } else {
      const newId = Math.max(0, ...table.map(row => row.id)) + 1;
      setTable([...table, {...data, id: newId}]);
    }
    setEditRow(defaultRow);
  }
  const onEdit = (rowId) => () => {
    setEditRow(table.filter(row => row.id === rowId)[0]);
  }
  const onDelete = (rowId) => () => {
    setTable(table.filter(row => row.id !== rowId));
  }

  return <>
    <EditForm editData={editRow} onSubmitForm={onSubmit}/>
    <table>
      <thead>
        <tr><th>Name</th><th>Info</th><th>Value</th><th colSpan={2}>Operations</th></tr>
      </thead>
      <tbody>
        {
          table.map(row =>
            <tr key={row.id}>
              <td>{row.Name}</td>
              <td>{row.Info}</td>
              <td>{row.Value}</td>
              <td><button onClick={onEdit(row.id)}>Edit</button></td>
              <td><button onClick={onDelete(row.id)}>Delete</button></td>
            </tr>)
        }
      </tbody>
    </table>
  </>
}

class App extends Component{
  render(){
    return(
      <div className="App">
        <Table />
      </div>
    );
  }
}

export default App;
