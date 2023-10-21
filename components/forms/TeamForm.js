import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const intialState = {
  team_name: '',
  image: '',
  division: '',
};

export default function TeamForm({ teamObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...intialState, uid: user.uid });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (teamObj.firebaseKey) {
      updateTeam(formInput).then(() => router.push(`/team-view/${teamObj.firebaseKey}`));
    } else {
      const payload = { ...formInput };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => router.push('/team-view/teams'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="team_name"
            value={formInput.team_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Division</Form.Label>
          <Form.Control
            type="text"
            placeholder="Which Division?"
            name="division"
            value={formInput.division}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Team
        </Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    image: PropTypes.string,
    division: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: intialState,
};
