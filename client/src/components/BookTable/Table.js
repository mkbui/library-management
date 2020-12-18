//https://stackoverflow.com/questions/55262167/passing-props-to-usestate-react

import React, { Component, useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Datepicker from '../AuthorForm/DatePicker/DatePicker'
import './Table.css'

export function BookTable(props) {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  const initState = {
    columns: [
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
    rows: [...props.data]
  }
  //console.log(initState)
  const [datatable, setDatatable] = useState(initState)

  useEffect(() => { setDatatable({ ...datatable, rows: [...props.data] }) }, [props.data])

  return (
    <div class = "table-all">
      <div class="table-container">
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={6} pagesAmount={4} data={datatable} searchTop searchBottom={false}></MDBDataTableV5>
        </div>
    </div>
  );
}