import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

/* GET */

export function getGroup(groupId: string): Promise<Group> {
  return axios.get(`/groups/${groupId}`)
    .then((response) => response.data);
}

export function getGroups(): Promise<Group[]> {
  return axios.get('/groups')
    .then((response) => response.data);
}

export function getGroupServices(groupId: string): Promise<Service[]> {
  return axios.get(`/groups/${groupId}/services`)
    .then((response) => response.data);
}

export function getQueryOutput(queryId: string, params?: any): Promise<Query[]> {
  return axios.post(`/queries/${queryId}/output`, {
    profile: localStorage.getItem('profile'),
    params,
  })
    .then((response) => response.data);
}

export function getProfile(profileId: string): Promise<Profile> {
  return axios.get(`/profiles/${profileId}`)
    .then((response) => response.data);
}

export function getProfiles(): Promise<Profile[]> {
  return axios.get('/profiles')
    .then((response) => response.data);
}

export function getService(serviceId: string): Promise<Service> {
  return axios.get(`/services/${serviceId}`)
    .then((response) => response.data);
}

export function getServiceQueries(serviceId: string): Promise<Query[]> {
  return axios.get(`/services/${serviceId}/queries`)
    .then((response) => response.data);
}

export function getServices(): Promise<Service[]> {
  return axios.get('/services')
    .then((response) => response.data);
}

export function getQueries(filter?: any): Promise<Query[]> {
  return axios.get('/queries', {
    params: filter,
  })
    .then((response) => response.data);
}

/* PUT */

export function toggleFavorite(queryId: string, isFavorite: boolean): Promise<Query[]> {
  return axios.put(`/queries/${queryId}`, {
    favorite: isFavorite,
  })
    .then((response) => response.data);
}

export function updateGroup(groupId: string, group: Group): Promise<Group> {
  return axios.put(`/groups/${groupId}`, group)
    .then((response) => response.data);
}

export function updateProfile(profileId: string, profile: Profile): Promise<Profile> {
  return axios.put(`/profiles/${profileId}`, profile)
    .then((response) => response.data);
}

export function updateQuery(queryId: string, query: Query): Promise<Query> {
  return axios.put(`/queries/${queryId}`, query)
    .then((response) => response.data);
}

export function updateService(serviceId: string, service: Service): Promise<Service> {
  return axios.put(`/services/${serviceId}`, service)
    .then((response) => response.data);
}

/* POST */

export function addGroup(group: Group): Promise<Group> {
  return axios.post('/groups', group)
    .then((response) => response.data);
}

export function addProfile(profile: Profile): Promise<Profile> {
  return axios.post('/profiles', profile)
    .then((response) => response.data);
}

export function addQuery(serviceId: string, query: Query): Promise<Query> {
  return axios.post(`/services/${serviceId}/queries`, query)
    .then((response) => response.data);
}

export function addService(groupId: string, service: Service): Promise<Service> {
  return axios.post(`/groups/${groupId}/services`, service)
    .then((response) => response.data);
}

/* DELETE */

export function deleteGroup(groupId: string): Promise<void> {
  return axios.delete(`/groups/${groupId}`)
    .then((response) => response.data);
}

export function deleteProfile(profileId: string): Promise<void> {
  return axios.delete(`/profiles/${profileId}`)
    .then((response) => response.data);
}

export function deleteQuery(queryId: string): Promise<void> {
  return axios.delete(`/queries/${queryId}`)
    .then((response) => response.data);
}

export function deleteService(serviceId: string): Promise<void> {
  return axios.delete(`/services/${serviceId}`)
    .then((response) => response.data);
}
