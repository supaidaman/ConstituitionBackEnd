export interface MendModel {
  id: string;
  changeType: ChangeType;
  mendType: MendType;
}

export enum ChangeType {
  FORESEEN,
  PASSED,
}

export enum MendType {
  LAW,
  CONSTITUITIONAMMEND,
  OTHERS,
}
