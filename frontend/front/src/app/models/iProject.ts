
export interface IProject {
  title: string;
  tags?: string[];
  link?: string;
  description: string;
  img?: string;
  releaseDate: string;
  id: number;
}

export interface IProjectEvent<T, K> {
  type: T;
  data: K;
}

export enum ProjecEventEnum {
  ADD_PROJECT = 'ADD_PROJECT'
}
