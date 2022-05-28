import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TicketDetails, TicketsTable } from "../components/Tables";
import { useHistory } from "react-router-dom";
import { getTicketDetails } from "../api/ThesisApi";

export const ViewTicket = (props) => {
  const [ticketDetails, setTicketDetails] = React.useState({ ticketDetails: [] });
  
  useEffect(() => {
    const id = props.match.params.id;
    try {
      getTicketDetails(id).then(res => {
        setTicketDetails(res.body);
      });
    }
    catch(e) {
      console.log("error", e);
    }
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>View tickets</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          {/* <ButtonGroup> */}
            {/* <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button> */}
          {/* </ButtonGroup> */}
        </div>
      </div>

      <TicketDetails ticketDetails={ticketDetails} />
    </>
  );
};
