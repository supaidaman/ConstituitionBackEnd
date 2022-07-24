export interface MendModel {
  id: string;
  urn: string;
  changeType: ChangeType;
  mendType: MendType;
  name: string;
  alternateName: string;
  keywords: string[];
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
