interface Query {
  _id?: string;
  title: string;
  aws: string;
  jq?: string;
  preset?: boolean;
  favorite?: boolean;
  serviceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
