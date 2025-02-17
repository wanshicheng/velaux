import type { Project } from './project';

export type DeliveryTarget = {
  id?: string;
  name: string;
  alias?: string;
  project?: Project;
  description?: string;
  clusterAlias?: string;
  cluster?: {
    clusterName?: string;
    namespace?: string;
  };
  variable?: any;
};
