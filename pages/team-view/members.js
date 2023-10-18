import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../api/memberData';
import MemberCard from '../../components/MemberCard';

function ShowMembers() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/team-view/new" passHref>
        <Button>Add Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {members.map((book) => (
          <MemberCard key={members.firebaseKey} memberObj={book} onUpdate={getAllMembers} />
        ))}
      </div>

    </div>
  );
}

export default ShowMembers;
