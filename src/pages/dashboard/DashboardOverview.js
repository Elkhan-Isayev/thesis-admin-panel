
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faFolderPlus, faTicketAlt, faClock, faBook } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { trafficShares } from "../../data/charts";
import { getAllTickets, getAllCategories, getTicketCountByCategory } from "../../api/ThesisApi";
import moment from "moment-timezone";

export default () => {
  const [tickets, setTickets] = React.useState({ tickets: [] });
  const [categories, setCategories] = React.useState({ categories: [] });
  // const [bugsCount, setBugsCount] = React.useState

  React.useEffect(() => {
    try {
      getAllTickets().then(res => {
        setTickets({ tickets: res.body });
      });
    }
    catch (e) {
      console.log("error", e);
    }
    //
    try {
      getAllCategories().then(res => {
        console.log(res.body);
        let cats = res.body;

        cats.forEach(element => {

          getTicketCountByCategory(element.name).then(res => {
            // console.log(res);
            element.count = res.body;
            setCategories({ categories: cats });
          });

        });



      });
    }
    catch (e) {
      console.log("error", e);
    }
  }, [])

  // console.log(categories);
  let totalTicketsCounts = 0;
  categories.categories.forEach(element => {
    totalTicketsCounts += element.count;
  });
  // console.log(totalCounts);

  let totalTimeSpent = 0;
  tickets.tickets.forEach(element => {
    totalTimeSpent = moment(element.endTime).diff(moment(element.startTime), 'minutes') + totalTimeSpent;
  });

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Dashboard</h4>
          <p className="mb-0">Feedback Tool web analytics dashboard.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">

        </div>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="All Feedback Tickets"
            title={`${tickets.tickets.length}`}
            icon={faTicketAlt}
            iconColor="shape-secondary"
          />
        </Col>

       

        

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total minutes spent"
            title={totalTimeSpent}
            icon={faClock}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tickets without Category"
            title={tickets.tickets.length - totalTicketsCounts}
            icon={faFolderPlus}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="All Categories"
            title={`${categories.categories.length}`}
            icon={faBook}
            iconColor="shape-secondary"
          />
        </Col>
        </Row>
        <Row className="justify-content-md-center">
        {
          categories.categories.map((element, index) => (
            <Col xs={12} sm={6} xl={4} className="mb-4" key={`id-${index}`}>
              <CounterWidget
                category={element.name}
                title={element.count}
                icon={faChartLine}
                iconColor="shape-secondary"
              />
            </Col>
          ))
        }



      </Row>
    </>
  );
};
