
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { getAllCategories, getAllTickets } from "../api/ThesisApi";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};


export const TicketsTable = (props) => {
  console.log(props);
  // const [tickets, setTickets] = React.useState({ tickets: [] });
  const { ticketList } = props;
  // try {
  //   getAllTickets().then(res => {
  //     setTickets({tickets: res.body});
  //   });
  // }
  // catch(e) {
  //   console.log("error", e);
  // }


  const TableRow = (props) => {
    const { id, postDate, email, ticketNumber, data, position, category } = props;
    const history = useHistory();

    return (
      <tr>
        <td >
          {position + 1}
        </td>
        <td>
          {
            category.id == null ? (<span class="badge-md notification-count ms-2 badge rounded-pill text-primary bg-secondary">New</span>) : null
          }
          &#160;
          {id}
        </td>
        <td>
          {email}
        </td>
        <td>
          <span className="fw-normal">
            {postDate}
          </span>
        </td>
        <td>
          {/* <Card.Link as={Link} to={Routes.Vi.path + '/' + id} className="fw-normal"> */}
          <div onClick={() => { history.push(Routes.ViewTicket.path + '/' + id) }}>
            <FontAwesomeIcon icon={faEye} className="dropdown-arrow" />
          </div>

          {/* </Card.Link> */}
        </td>
      </tr>
    );
  };

  // let ticketsList = tickets.tickets ? tickets.tickets : [];
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Ticket ID</th>
              <th className="border-bottom">User email</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Manage</th>
            </tr>
          </thead>
          <tbody>
            {
              ticketList.map((t, index) =>
                <TableRow key={`ticket-${index}`} {...t} position={index} />
              )}
          </tbody>
        </Table>
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer> */}
      </Card.Body>
    </Card>
  );
};

export const CategoriesTable = (props) => {
  console.log(props);



  const TableRow = (props) => {
    const { ticketNumber, data, position, name } = props;

    return (
      <tr>
        <td >
          {position + 1}
        </td>
        <td>
          {name}
        </td>

        <td>
          <Card.Link as={Link} to={Routes.ViewTicket.path} className="fw-normal">
            <FontAwesomeIcon icon={faEye} className="dropdown-arrow" />
          </Card.Link>
        </td>
      </tr>
    );
  };

  let categoriesList = props.categories.length > 0 ? props.categories : [];
  console.log(categoriesList);
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Category Name</th>
              <th className="border-bottom">Manage</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((t, index) => <TableRow key={`transaction-${t.id}`} {...t} position={index} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TicketDetails = (props) => {
  const {
    browserFontSize,
    browserName,
    category,
    email,
    gender,
    id,
    isActive,
    m1,
    m2,
    m3,
    name,
    postDate,
    priority,
    satScore,
    screenResolution,
    skill,
    userIp
  } = props.ticketDetails;

  return (
    <>
      <div>
        <table className="table table-hover table-bordered" style={{ width: "100%" }}>

          <tbody>
            <tr>
              <td>User's Name and Surname</td>
              <td>{name}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>

            <tr>
              <td>Gender</td>
              <td>{gender}</td>
            </tr>

            <tr>
              <td>Feedback Submit Date</td>
              <td>{postDate}</td>
            </tr>
            <tr>
              <td>User's Skill rank</td>
              <td>{skill}</td>
            </tr>
            <tr>
              <td>Browser Name</td>
              <td>{browserName}</td>
            </tr>
            <tr>
              <td>Browser Font Size</td>
              <td>{browserFontSize}</td>
            </tr>
            <tr>
              <td>User Ip</td>
              <td>{userIp}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export const TicketDetailsSecond = (props) => {

  const {
    m1,
    m2,
    m3,
    m1desc,
    m2desc,
    m3desc,
    startTime,
    endTime,
    finaldesc
  } = props.ticketDetails;


  return (
    <>
      <div style={{ overflowX: "auto", overflowY: "auto" }}>
        <table className="table table-hover table-bordered" 
        style={{ overflow:"hidden", width: "100%", textAlign: "center", tableLayout:"fixed" }}>

          <tbody>
            <tr>
              <th colSpan="3">User's choice</th>
            </tr>
            <tr>
              <th>Alternative 1</th>
              <th>Alternative 2</th>
              <th>Alternative 3</th>
            </tr>

            <tr>
              <td>Version {m1 ? m1 : "-"}</td>
              <td>Version {m2 ? m2 : "-"}</td>
              <td>Version {m3 ? m3 : "-"}</td>
            </tr>

            <tr style={{minHeight: "10px"}}>
              <td style={{ overflow:"auto", whiteSpace: "initial"}}><p>{m1desc ? m1desc : "-"}</p></td>
              <td style={{ overflow:"auto", whiteSpace: "initial"}}><p>{m2desc ? m2desc : "-"}</p></td>
              <td style={{ overflow:"auto", whiteSpace: "initial"}}><p>{m3desc ? m3desc : "-"}</p></td>
            </tr>

            <tr>
              <th colSpan="3">User's Final Opinion</th>
            </tr>
            <tr>
              <td colSpan="3" style={{whiteSpace: "initial"}}>{finaldesc ? finaldesc : "-"}</td>
            </tr>

            <tr>
              <td colSpan="3" >
                User started:
                &nbsp;
                <label style={{ color: "red" }}>{moment(startTime).format("DD/MM/YYYY, h:mm:ss")}</label>
                &nbsp;
                and finished:
                &nbsp;
                <label style={{ color: "red" }}>{moment(endTime).format("DD/MM/YYYY, h:mm:ss")}</label>
                &nbsp;
                and spent
                &nbsp;
                <label style={{ color: "red" }}>{moment(endTime).diff(moment(startTime), 'minutes')}</label>
                &nbsp;
                mins for the feedback.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}