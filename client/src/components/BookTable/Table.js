//https://stackoverflow.com/questions/55262167/passing-props-to-usestate-react

import React, { Component, useState, useEffect } from 'react';
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import './Table.css'

export function BookTable(props) {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const bookInfo = (book) => {
  }

  props.data.map(row => row.View = <button onClick = {bookInfo(row)}>View</button>)

  const initState = {
    columns: [
      {
        label: 'View',
        field: 'View',
        width: 250,
      },
      {
        label: 'ISBNCode',
        field: 'ISBNCode',
        width: 250,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Title',
        field: 'Title',
        width: 170,
      },
      {
        label: 'Publisher',
        field: 'Publisher',
        width: 300,
      },
      {
        label: 'Year',
        field: 'Year',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'NumPage',
        field: 'NumPage',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Authors',
        field: 'Authors',
        sort: 'disabled',
        width: 300,
      }
    ],
    rows: [
       ...props.data
    ]
  }
  //console.log(initState)
  const [datatable, setDatatable] = useState(initState)

  useEffect(() => { setDatatable({ ...datatable, rows: [...props.data ] }) }, [props.data])
  // useEffect(() => { setDatatable({ ...datatable, rows: [...item] }) }, [item])

  return (
    <div className = "table-all">
      <div className="table-container">
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={6} pagesAmount={4} data={datatable} searchTop searchBottom={false}></MDBDataTableV5>
        </div>
    </div>
  );
}