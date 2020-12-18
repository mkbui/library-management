import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './DatePicker.css'

import "react-datepicker/dist/react-datepicker.css";

export function Datepicker() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker className = "containerDate" selected={startDate} onChange={date => setStartDate(date)} />
    )
};