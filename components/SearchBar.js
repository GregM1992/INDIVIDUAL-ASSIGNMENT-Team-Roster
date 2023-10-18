import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SearchBar() {
  return (
    <div className="searchDiv">
      <Form.Control className="searchBar" />
      <Button type="submit"> Search </Button>
    </div>
  );
}
