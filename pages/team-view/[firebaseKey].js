/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMembersNotInTheTeam, getTeamDetails } from '../../api/mergedData';
import {
  createTeamMember, deleteTeamMember, getSingleTeamMember, updateTeamMember,
} from '../../api/teamMemberData';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [membersNotInTeam, setMembersNotInTeam] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getTeamDetails(firebaseKey).then(setTeamDetails);
    getMembersNotInTheTeam(user.uid, firebaseKey).then(setMembersNotInTeam);
  }, [teamDetails.teamMembers]);

  const addMemberToTeam = (memberFirebaseKey) => {
    const payload = { teamId: teamDetails.firebaseKey, memberId: memberFirebaseKey };

    createTeamMember(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };

      updateTeamMember(patchPayload).then(() => router.push(`/team-view/${firebaseKey}`));
    });
  };

  const deleteMemberFromTeam = (memberId) => {
    getSingleTeamMember(memberId, firebaseKey).then((teamMember) => deleteTeamMember(teamMember.firebaseKey));
  };

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <div className="text-white ms-5 details">
            <h2>{teamDetails.team_name} </h2>
            <h3>{teamDetails.division} division</h3>
          </div>
          <h3> Add Members to Team</h3>
          { membersNotInTeam.map((member) => (
            <Card>
              <img className="card-img-top" src={member.image} alt={member.name} style={{ height: '80px', width: '80px' }} />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <h6 className="card-subtitle"> {member.role}</h6>
              </div>
              <Button onClick={() => addMemberToTeam(member.firebaseKey)}> Add Member to Team</Button>
            </Card>
          ))}
          <h2>Members In Team</h2>
          { teamDetails.teamMembers?.map((member) => (
            <Card style={{ width: '18rem', margin: '10px' }}>
              <Card.Img variant="top" src={member.image} alt={member.name} style={{ height: '400px' }} />
              <Card.Body>
                <Card.Title>{member.role}</Card.Title>
                <Card.Title>{member.teamId}</Card.Title>
                <Button variant="danger" onClick={() => deleteMemberFromTeam(member.firebaseKey)} className="m-2">
                  DELETE
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
