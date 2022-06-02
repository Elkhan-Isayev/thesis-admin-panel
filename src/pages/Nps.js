import React from "react";
import { faSmile, faSkull, faSadTear, faMehBlank} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget} from "../components/Widgets";
// import { trafficShares } from "../data/charts";
import { getNPSDetails } from "../api/ThesisApi";

export default () => {
  const [nps, setNPSDetails] = React.useState({ nps: [] });

  React.useEffect(() => {
    try{
      getNPSDetails().then(res => {
        setNPSDetails({nps: res.body});
      })
    }
    catch(e){
      console.log(e);
    }
  }, []);

  console.log(nps);

  const trafficShares = [
    { id: 1, label: "Promoters", value: parseInt(nps.nps.happy), color: "tertiary", icon: faSmile },
    { id: 2, label: "Detractors", value: parseInt(nps.nps.sad), color: "info", icon: faSadTear },
    { id: 3, label: "Passives", value: 100-(parseInt(nps.nps.sad)+parseInt(nps.nps.happy)), color: "primary", icon: faMehBlank }
];

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
            title={nps.nps.detractors}
            icon={faSadTear}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
           category="Passives"
           title={nps.nps.passives}
            icon={faMehBlank}
            iconColor="shape-primary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Promoters"
            title={nps.nps.promoters}
            icon={faSmile}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>


      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title={"Total NPS Score: " + nps.nps.nps}
            data={trafficShares} />
        </Col>
      </Row>
    </>
  );
};
