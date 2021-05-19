interface Profile {
  _id?: string;
  name: string;
  accessKeyId: string;
  accessKeySecret: string;
  region: string;
  outputFormat: string;
  createdAt?: Date;
  updatedAt?: Date;
}
