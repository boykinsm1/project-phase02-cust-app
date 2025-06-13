import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "./memdb.js";
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
  
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = function () {
    log("in getCustomers()");
    setCustomers(getAll());
  };

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

  let onDeleteClick = function () {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
      getCustomers();
    }
    setFormObject(blankCustomer);
  };

  let onSaveClick = function () {
    log("in onSaveClick()");
    if (mode === 'Add') {
      if (formObject.name === '' || formObject.email === '' || formObject.password === '') {
        setFormObject(blankCustomer);
      return;
    }
    post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    } 
    setFormObject(blankCustomer);
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

