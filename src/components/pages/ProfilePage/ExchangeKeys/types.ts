export enum ModalKey {
  addKey,
  deleteKey,
  editName
}

export interface AddKey {
  name: string;
  id: string;
  exchange: string;
}

export interface DeleteKey {
  id: string;
  name: string;
}
export interface EditName {
  id: string;
  name: string;
}
