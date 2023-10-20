import { getMembers, getSingleMember } from './memberData';
import { getTeamMembers } from './teamMemberData';
import { getSingleTeam } from './teamData';

const getTeamDetails = async (teamId) => {
  const team = await getSingleTeam(teamId);

  const allTeamMembers = await getTeamMembers(teamId);

  const getSingleTeamMember = await allTeamMembers.map((teamMember) => getSingleMember(teamMember.memberId));

  const teamMembers = await Promise.all(getSingleTeamMember);

  return { ...team, teamMembers };
};

const getMembersNotInTheTeam = async (uid, teamId) => {
  const allMembers = await getMembers(uid);

  const teamMembers = await getTeamMembers(teamId);

  const memberPromises = await teamMembers.map((teamMember) => getSingleMember(teamMember.memberId));

  const members = await Promise.all(memberPromises);

  const filterMembers = await allMembers.filter((obj) => !members.some((e) => e.firebaseKey === obj.firebaseKey));

  return filterMembers;
};

export { getTeamDetails, getMembersNotInTheTeam };
