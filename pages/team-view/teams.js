import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import TeamCard from '../../components/TeamCard';

export default function ShowTeams() {
  // TODO: Set a state for Orders
  const [teams, setTeams] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the Orders
  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  // TODO: make the call to the API to get all the Teams on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/team-view/new" passHref>
          <Button>Add A Team</Button>
        </Link>
        {teams.map((team) => <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTheTeams} />)}
      </div>
    </>
  );
}
