import { Error, Types } from 'mongoose';
import logger from '../util/logger';
import Group, { IGroup } from '../models/group';
import Profile, { IProfile } from '../models/profile';
import Query, { IQuery } from '../models/query';
import Service, { IService } from '../models/service';
import data from '../data/queries.json';

/* READ */

export function getQueries(filter = {}): Promise<IQuery[]> {
  return new Promise((resolve, reject) => {
    Query
      .find(filter, function (error, queries: IQuery[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(queries);
      })
      .sort('name');
  });
}

export function getGroup(groupId: string): Promise<IGroup> {
  return new Promise((resolve, reject) => {
    Group
      .findById(groupId, function (error: Error, group: IGroup) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(group);
      })
      .sort('name');
  });
}

export function getGroups(): Promise<IGroup[]> {
  return new Promise((resolve, reject) => {
    Group
      .find(function (error: Error, groups: IGroup[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(groups);
      })
      .sort('name');
  });
}

export function getGroupServices(groupId: string): Promise<IService[]> {
  return new Promise((resolve, reject) => {
    Service
      .find({ groupId }, function (error, services: IService[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(services);
      })
      .sort('name');
  });
}

export function getProfile(profileId: string): Promise<IProfile> {
  return new Promise((resolve, reject) => {
    Profile
      .findById(profileId, function (error: Error, profile: IProfile) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(profile);
      });
  });
}

export function getProfiles(): Promise<IProfile[]> {
  return new Promise((resolve, reject) => {
    Profile
      .find(function (error, profiles: IProfile[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(profiles);
      })
      .sort('name');
  });
}

export function getQuery(queryId: string): Promise<IQuery> {
  return new Promise((resolve, reject) => {
    Query
      .findById(queryId, function (error: Error, query: IQuery) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(query);
      });
  });
}

export function getService(serviceId: string): Promise<IService[]> {
  return new Promise((resolve, reject) => {
    Service
      .findById(serviceId, function (error: Error, service: IService[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(service);
      })
      .sort('name');
  });
}

export function getServiceQueries(serviceId: string): Promise<IQuery[]> {
  return new Promise((resolve, reject) => {
    Query
      .find({ serviceId }, function (error, queries: IQuery[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(queries);
      })
      .sort('name');
  });
}

export function getServices(): Promise<IService[]> {
  return new Promise((resolve, reject) => {
    Service
      .find(function (error: Error, services: IService[]) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        resolve(services);
      })
      .sort('name');
  });
}

/* CREATE */

export function addGroup(group: IGroup): Promise<IGroup> {
  return new Promise(async (resolve, reject) => {
    try {
      const newGroup = await Group.create(group);

      return resolve(newGroup);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function addGroupService(groupId: string, service: IService): Promise<IService> {
  return new Promise(async (resolve, reject) => {
    try {
      const newService = await Service.create({
        groupId,
      ...service,
      });

      return resolve(newService);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function addProfile(profile: IProfile): Promise<IProfile> {
  return new Promise(async (resolve, reject) => {
    try {
      const newProfile = await Profile.create(profile);

      return resolve(newProfile);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function addServiceQuery(serviceId: string, query: IQuery): Promise<IQuery> {
  return new Promise(async (resolve, reject) => {
    try {
      const newQuery = await Query.create({
        serviceId,
        ...query,
      });

      return resolve(newQuery);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

/* DELETE */

export function deleteGroup(groupId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await Group.deleteOne({ _id: groupId });

      return resolve(null);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function deleteProfile(profileId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await Profile.deleteOne({ _id: profileId });

      return resolve(null);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function deleteQuery(queryId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await Query.deleteOne({ _id: queryId });

      return resolve(null);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

export function deleteService(serviceId: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await Service.deleteOne({ _id: serviceId });

      return resolve(null);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}

/* UPDATE */

export function updateGroup(groupId: string, group: IGroup): Promise<IGroup> {
  return new Promise((resolve, reject) => {
    Group.findByIdAndUpdate(groupId, group, { useFindAndModify: false, new: true },
      function (error, updatedGroup) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        return resolve(updatedGroup);
      });
  });
}

export function updateProfile(profileId: string, profile: IProfile): Promise<IProfile> {
  return new Promise((resolve, reject) => {
    Profile.findByIdAndUpdate(profileId, profile, { useFindAndModify: false, new: true },
      function (error, updatedProfile) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        return resolve(updatedProfile);
      });
  });
}

export async function updateQuery(queryId: string, query: IQuery): Promise<IQuery> {
  return new Promise((resolve, reject) => {
    Query.findByIdAndUpdate(queryId, query, { useFindAndModify: false, new: true },
      function (error, query) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        return resolve(query);
      });
  });
}

export async function updateService(serviceId: string, service: IService): Promise<IService> {
  return new Promise((resolve, reject) => {
    Service.findByIdAndUpdate(serviceId, service, { useFindAndModify: false, new: true },
      function (error, updatedService) {
        if (error) {
          logger.error(error);

          return reject(error);
        }

        return resolve(updatedService);
      });
  });
}

/* INIT */

(async () => {
  try {
    // await Group.deleteMany({});
    // await Service.deleteMany({});
    // await Query.deleteMany({});

    const groups: IGroup[] = await getGroups();

    if (groups.length === 0) {
      const groupsFromFile: any[] = [];
      const servicesFromFile: any[] = [];
      const queriesFromFile: any[] = [];

      data.forEach((group) => {
        const groupId = Types.ObjectId();

        groupsFromFile.push({
          _id: groupId,
          name: group.group,
          preset: true,
          updatedAt: null,
        });

        group.services.forEach((service) => {
          const serviceId = Types.ObjectId();

          servicesFromFile.push({
            _id: serviceId,
            name: service.name,
            groupId,
            preset: true,
            updatedAt: null,
          });

          (service.queries || []).forEach((query) => {
            queriesFromFile.push({
              _id: Types.ObjectId(),
              title: query.title,
              aws: query.aws,
              jq: query.jq,
              serviceId,
              preset: true,
              favorite: false,
              updatedAt: null,
            });
          });
        });
      });

      await Group.insertMany(groupsFromFile);
      await Service.insertMany(servicesFromFile);
      await Query.insertMany(queriesFromFile);
    }
  }
  catch (error) {
    logger.error(error);
    process.exit(-1);
  }
})();
