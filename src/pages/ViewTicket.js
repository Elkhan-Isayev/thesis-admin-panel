import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TicketDetails, TicketsTable, TicketDetailsSecond } from "../components/Tables";
import { useHistory } from "react-router-dom";
import { getTicketDetails, getAllCategories, updateTicket, updateTicketPriority } from "../api/ThesisApi";
import { CounterWidget, CircleChartWidget } from "../components/Widgets";
import { trafficShares } from "../data/charts";
import { faSadTear, faSmile, faSkull, faMehBlank, faCoffee } from '@fortawesome/free-solid-svg-icons';


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
    const npsTitle = "Total NPS Score:";

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
          <div className="d-block mb-4 mb-md-0" style={{ padding: "10px" }}>
            <h4>#{ticketDetails.id}</h4>
            {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
          </div>
          <div className="btn-toolbar mb-2 mb-md-0" style={{ padding: "10px" }}>
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
            <div style={{ marginLeft: "10px" }}>
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
        <div className="d-flex justify-content-between">
          <div className="d-block col-sm-6" style={{ padding: "10px" }}>
            <TicketDetails ticketDetails={ticketDetails} />
          </div>
          <div className="d-block col-sm-6" style={{ padding: "10px" }}>

            <div className="card border-0 shadow">
              <div className="card-body">

                <div className="d-block">
                  <div className="align-items-center me-5">
                    <div className="icon-sm icon-shape-danger rounded me-3" style={{ textAlign: "center" }}>
                      {
                        ticketDetails.satScore >= 1 && ticketDetails.satScore <= 6
                          ? <FontAwesomeIcon icon={faSadTear} className={`text-danger`} size="10x" />
                          : (ticketDetails.satScore >= 7 && ticketDetails.satScore <= 8
                            ? <FontAwesomeIcon icon={faMehBlank} className={`text-primary`} size="10x" />
                            : <FontAwesomeIcon icon={faSmile} className={`text-tertiary`} size="10x" />
                          )


                      }
                    </div>
                    <br />
                    <div className="d-block" style={{ textAlign: "center" }}>

                      <h2 className="fs-5 fw-bold mb-1">{"User Satisfaction Score:" + " " + ticketDetails.satScore}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ padding: "10px" }}>
          <TicketDetailsSecond ticketDetails={ticketDetails} />
        </div>
      </div>
    </>
  );
};
