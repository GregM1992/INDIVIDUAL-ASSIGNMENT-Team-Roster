import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import TeamCard from '../../components/TeamCard';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

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
