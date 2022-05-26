import React from "react";
import { faSmile, faSkull, faSadTear} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget} from "../components/Widgets";
import { trafficShares } from "../data/charts";

export default () => {
  return (
    <>
       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>NPS Calculator</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            {/* <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button> */}
          </ButtonGroup>
        </div>
      </div>
      <Row className="justify-content-md-center">
        
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Detractors"
            title="31"
            icon={faSadTear}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
           category="Passives"
           title="29"
            icon={faSkull}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Promoters"
            title="38"
            icon={faSmile}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>


      <Row className="justify-content-md-center">
        
        

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Total NPS Score: 7"
            
            data={trafficShares} />
        </Col>

        
      </Row>



    </>

    
  );
};
