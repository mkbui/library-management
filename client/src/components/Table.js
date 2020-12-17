//https://stackoverflow.com/questions/55262167/passing-props-to-usestate-react

import React, {Component, useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export function BookTable (props){

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
        width: 370,
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
    ],
    rows: [...props.data] 
  }
  console.log(initState)
  const [datatable, setDatatable] = useState(initState)

  useEffect (() => { setDatatable({ ...datatable, rows: [...props.data] }) }, [props.data])

  return (<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />);
}