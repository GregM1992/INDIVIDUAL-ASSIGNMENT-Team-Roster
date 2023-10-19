import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';
import searchMembers from '../../api/memberData';

export default function Search() {
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const searchAllMembers = () => {
    searchMembers(searchInput, user.uid).then(setFilteredMembers);
  };

  useEffect(() => {
    searchAllMembers();
    return () => {
      setFilteredMembers([]);
    };
  }, [user.uid]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {filteredMembers.map((member) => <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={searchAllMembers} />)}
      </div>
    </>
  );
}
