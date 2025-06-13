import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "./restdb.js";
import "./App.css";
import { CustomerList } from "./components/CustomerList.js";
import {CustomerAddUpdateForm} from "./components/CustomerAddUpdateForm.js";


function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = formObject.id >= 0 ? "Update" : "Add";
  useEffect(() => { getCustomers() }, []);
    const getCustomers = async function() {
    log("in getCustomers()");
    try {
      const data = await getAll();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  }
  

  const handleListClick = function (item) {
  log("in handleListClick()");
  if (formObject.id === item.id) {
    setFormObject(blankCustomer);
  } else {
    setFormObject(item);
  }
};

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  };

  let onDeleteClick = async function () {
    log("in onDeleteClick()");
    if(formObject.id >= 0){
      try {
        await deleteById(formObject.id);
        await getCustomers(); // Refresh the list after deletion
        setFormObject(blankCustomer);
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }    }
  }  

  let onSaveClick = async function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      if (
        formObject.name === '' ||
        formObject.email === '' ||
        formObject.password === ''
      ) {
        setFormObject(blankCustomer);
        return;
      }
    }
    try {
      if (mode === 'Add') {
        // Create a new object without the id field for new customers
        const { id, ...customerWithoutId } = formObject;
        await post(customerWithoutId);
      }
      if (mode === 'Update') {
        await put(formObject.id, formObject);
      }
      await getCustomers(); // Refresh the list after save
      setFormObject(blankCustomer);
    } catch (error) {
      console.error('Failed to save customer:', error);
    }
  }

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={formObject.id}
        onItemClick={handleListClick}
      />
      <div>
        <CustomerAddUpdateForm
          mode={mode}
          formObject={formObject}
          onInputChange={handleInputChange}  
          onDeleteClick={onDeleteClick}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
      </div>
    </div>
  );
}  

export default App;

