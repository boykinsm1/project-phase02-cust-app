// CustomerList.js
import React from "react";

export function CustomerList(params){
    return (
      <div className="boxed">
      <h4>Customer List</h4>
          <table id="customer-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Pass</th>
              </tr>
            </thead>
            <tbody>
              {params.customers && params.customers.filter(Boolean).map(
                (item, index) => {
                  if (!item) return null; // extra safety
                  // Safely check formObject and its id
                  const isSelected = params.formObject && item.id === params.formObject.id;
                  return (
                    <tr key={item.id} 
                      className={isSelected ? 'selected' : ''}
                      onClick={() => params.handleListClick && params.handleListClick(item)} 
                    >
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password ? '*'.repeat(item.password.length) : ''}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
      </div>
    );
  }

export default CustomerList;