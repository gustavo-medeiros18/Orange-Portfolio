export interface IProject {
  title: string;
  tags: string[];
  link?: string;
  description: string;
  imgUrl?: string | FormData;
  createdAt: string;
  id?: number;
  firstName?: string;
  lastName?: string;
}

export interface IProjectEvent<T, K> {
  type: T;
  data: K;
}

export enum ProjecEventEnum {
  ADD_PROJECT = "ADD_PROJECT",
}
