import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { CategoriesTable } from "../components/Tables";
import { getAllCategories } from "../api/ThesisApi";

export default () => {
  const [categories, setCategories] = React.useState({ categories: [] });
  
  React.useEffect(() => {
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
          <h4>Categories</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            {/* <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button> */}
          </ButtonGroup>
        </div>
      </div>
      <CategoriesTable categories={categories}/>
    </>
  );
};
