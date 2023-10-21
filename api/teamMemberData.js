import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamMembers = (teamId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers.json?orderBy="teamId"&equalTo="${teamId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createTeamMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTeamMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleTeamMember = async (memberId, TeamId) => {
  const allTeamMembers = await getTeamMembers(TeamId);
  const singleTeamMember = await allTeamMembers.find((b) => b.memberId === memberId);

  return singleTeamMember;
};

const deleteTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSingleTeamMember, getTeamMembers, updateTeamMember, deleteTeamMember, createTeamMember,
};
