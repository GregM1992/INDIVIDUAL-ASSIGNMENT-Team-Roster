/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteATeam = () => {
    if (window.confirm(`Do you want to delete ${teamObj.team_name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.team_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.team_name}</Card.Title>
        <Card.Text>{teamObj.division} Division</Card.Text>
        <Link href={`/team-view/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteATeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    image: PropTypes.string,
    division: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
