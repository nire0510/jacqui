import { Request, Response, NextFunction } from 'express';
import * as db from '../services/db';
import * as shell from '../services/shell';
import { IProfile } from '@/models/profile';

async function updateAwsProfile(profile: IProfile): Promise<void> {
  try {
    await shell.execute(`aws configure set profile.${profile.name}.aws_access_key_id ${profile.accessKeyId}`, false);
    await shell.execute(`aws configure set profile.${profile.name}.aws_secret_access_key ${profile.accessKeySecret}`, false);
    await shell.execute(`aws configure set profile.${profile.name}.region ${profile.region}`, false);
    await shell.execute(`aws configure set profile.${profile.name}.output json`, false);
  }
  catch (error) {
    return error;
  }
}

/* GET */

export async function getGroup(req: Request, res: Response , next: NextFunction): Promise<void> {
  try {
    const group = await db.getGroup(req.params.groupId);

    res.json(group);
  }
  catch (error) {
    next(error);
  }
}

export async function getGroups(req: Request, res: Response , next: NextFunction): Promise<void> {
  try {
    const groups = await db.getGroups();

    res.json(groups);
  }
  catch (error) {
    next(error);
  }
}

export async function getGroupServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await db.getGroupServices(req.params.groupId);

    res.json(services);
  }
  catch (error) {
    next(error);
  }
}

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await db.getProfile(req.params.profileId);

    res.json(profile);
  }
  catch (error) {
    next(error);
  }
}

export async function getProfiles(req: Request, res: Response , next: NextFunction): Promise<void> {
  try {
    const profiles = await db.getProfiles();

    res.json(profiles);
  }
  catch (error) {
    next(error);
  }
}

export async function getQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = await db.getQuery(req.params.queryId);

    res.json(query);
  }
  catch (error) {
    next(error);
  }
}

export async function getQueries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const queries = await db.getQueries(req.query);

    res.json(queries);
  }
  catch (error) {
    next(error);
  }
}

export async function getQueryOutput(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = await db.getQuery(req.params.queryId);
    const profile = req.body.profile;
    let aws = query.aws;

    if (Array.isArray(req.body.params) && req.body.params.length) {
      aws = aws.replace(/({{.+?}})/g, (token: string) => req.body.params
        .find((param: { token: string; value: string; }) => param.token = token).value);
    }

    const queryOutput = await shell.execute(`aws ${aws} ${profile ? `--profile=${profile}` : ''} ${query.jq ? `| jq '${query.jq}'` : ''}`, true);

    res.json(queryOutput);
  }
  catch (error) {
    next(error);
  }
}

export async function getService(req: Request, res: Response , next: NextFunction): Promise<void> {
  try {
    const service = await db.getService(req.params.serviceId);

    res.json(service);
  }
  catch (error) {
    next(error);
  }
}

export async function getServiceQueries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const queries = await db.getServiceQueries(req.params.serviceId);

    res.json(queries);
  }
  catch (error) {
    next(error);
  }
}

export async function getServices(req: Request, res: Response , next: NextFunction): Promise<void> {
  try {
    const services = await db.getServices();

    res.json(services);
  }
  catch (error) {
    next(error);
  }
}

/* POST */

export async function addGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const group = await db.addGroup(req.body);

    res.json(group);
  }
  catch (error) {
    next(error);
  }
}

export async function addGroupService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const service = await db.addGroupService(req.params.groupId, req.body);

    res.json(service);
  }
  catch (error) {
    next(error);
  }
}

export async function addProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await db.addProfile(req.body);

    await updateAwsProfile(profile);

    res.json(profile);
  }
  catch (error) {
    next(error);
  }
}

export async function addServiceQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const service = await db.addServiceQuery(req.params.serviceId, req.body);

    res.json(service);
  }
  catch (error) {
    next(error);
  }
}

/* DELETE */

export async function deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await db.deleteGroup(req.params.groupId);

    res.json({});
  }
  catch (error) {
    next(error);
  }
}

export async function deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await db.getProfile(req.params.profileId);

    await db.deleteProfile(req.params.profileId);
    await shell.execute(`aws configure delete-profile --profile ${profile.name}`, false);

    res.json({});
  }
  catch (error) {
    next(error);
  }
}

export async function deleteQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await db.deleteQuery(req.params.queryId);

    res.json({});
  }
  catch (error) {
    next(error);
  }
}

export async function deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await db.deleteService(req.params.serviceId);

    res.json({});
  }
  catch (error) {
    next(error);
  }
}

/* PUT */

export async function updateGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const group = await db.updateGroup(req.params.groupId, req.body);

    res.json(group);
  }
  catch (error) {
    next(error);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await db.updateProfile(req.params.profileId, req.body);

    await updateAwsProfile(profile);

    res.json(profile);
  }
  catch (error) {
    next(error);
  }
}

export async function updateQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = await db.updateQuery(req.params.queryId, req.body);

    res.json(query);
  }
  catch (error) {
    next(error);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const service = await db.updateService(req.params.serviceId, req.body);

    res.json(service);
  }
  catch (error) {
    next(error);
  }
}
