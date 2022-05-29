import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TicketDetails, TicketsTable } from "../components/Tables";
import { useHistory } from "react-router-dom";
import { getTicketDetails, getAllCategories, updateTicket, updateTicketPriority } from "../api/ThesisApi";

export const ViewTicket = (props) => {
  const [ticketDetails, setTicketDetails] = React.useState({ ticketDetails: [] });
  const [categories, setCategories] = React.useState({ categories: [] });

  useEffect(() => {
    const id = props.match.params.id;
    try {
      getTicketDetails(id).then(res => {
        setTicketDetails(res.body);
      });
    }
    catch (e) {
      console.log("error", e);
    }
    // Get all categories
    try {
      getAllCategories().then(res => {
        setCategories({ categories: res.body });
        console.log(categories);
      });
    }
    catch (e) {
      console.log("error", e);
    }
  }, [])

  const handleCatChange = (e) => {
    console.log(e.target);
    // const selectedIndex = e.target.options.selectedIndex;
    // console.log(e.target.options[selectedIndex].getAttribute('data-key'));

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('data-id');
    console.log(option);
    try {
      updateTicket(ticketDetails.id, option).then(res => {
        console.log(res);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  const handlePriorityChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('data-id');

    try {
      updateTicketPriority(ticketDetails.id, option).then(res => {
        console.log(res);
      });
    }
    catch (e) {
      console.log(e);
    }

  }

  let catList = categories.categories ? categories.categories : [];
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h4>#{ticketDetails.id}</h4>
            {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Set priority</Form.Label>
                  <Form.Select onChange={handlePriorityChange}>
                    {ticketDetails.priority == 0 ? <option selected data-id="0">Set Priority</option> : <option data-id="0">Set Priority</option>}
                    {ticketDetails.priority == 1 ? <option selected data-id="1">High</option> : <option data-id="1">High</option>}
                    {ticketDetails.priority == 2 ? <option selected data-id="2">Medium</option> : <option data-id="2">Medium</option>}
                    {ticketDetails.priority == 3 ? <option selected data-id="3">Low</option> : <option data-id="3">Low</option>}
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            {/* -------------------------------------------------------- */}
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Set category</Form.Label>
                  <Form.Select onChange={handleCatChange}>
                    {
                      catList.map(element => {
                        // console.log(element.id, ticketDetails.category.id);
                        if (ticketDetails.category) {
                          if (element.id === ticketDetails.category.id) {
                            return (
                              <option selected data-id={element.id} key={element.id}>{element.name}</option>
                            )
                          }
                          else {
                            return (
                              <option data-id={element.id} key={element.id}>{element.name}</option>
                            )
                          }
                        }
                      })
                    }
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>

        <TicketDetails ticketDetails={ticketDetails} />
      </div>
    </>
  );
};
