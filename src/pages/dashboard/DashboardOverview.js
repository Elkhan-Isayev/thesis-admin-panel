
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { Col, Row} from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { trafficShares } from "../../data/charts";
import { getAllTickets, getAllCategories } from "../../api/ThesisApi";

export default () => {
  const [tickets, setTickets] = React.useState({ tickets: [] });
  const [categories, setCategories] = React.useState({ categories: [] });
  
  React.useEffect(() => {
    try {
      getAllTickets().then(res => {
        setTickets({tickets: res.body});
      });
    }
    catch(e) {
      console.log("error", e);
    }
    //
    try {
      getAllCategories().then(res => {
        setCategories(res.body);
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
            title={tickets.tickets.length}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="All Categories"
            title={categories.length}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Bugs"
            title="5"
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Insights"
            title="5"
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Praise"
            title="5"
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>
    </>
  );
};
