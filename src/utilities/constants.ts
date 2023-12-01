// - form validations - -
export const errorType: string[] = [
  'manual',
  'required',
  'pattern',
  'validate',
  'minLength',
  'maxLength',
  'max',
  'min',
  'positive',
  'lessThanTen',
  'greaterThan',
  'checkUrl',
];

// ag grid field types
export const fieldTypes = {
  REFERENCE: 'reference',
  BOOLEAN: 'boolean',
  STRING: 'string', // done
  TEXTAREA: 'textarea', // done
  PICKLIST: 'picklist', // done
  CURRENCY: 'currency', // done
  PERCENT: 'percent',
  DOUBLE: 'double',
  DATE: 'date',
  DATETIME: 'datetime',
  EDITFORM: 'editForm',
  INT: 'int',
  // new changes
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  CUSTOMERNAME: 'customername',
  TIER: 'tier',
  EXPERIENCELEVEL: 'experiencelevel',
  STATUS: 'status',
  LIFECYCLE: 'lifecyclestage',
  ACTION: 'action',
  CIS: 'cis',
  PROJECT: 'project',
  BDM: 'bdm',
  GUIDELINES: 'guidelines',
  GPB: 'gbp',
  ROCKS: 'rocks',
  MS: 'ms',
  NNB: 'nnb',
  ON: 'on',
  JOB: 'job',
  COMS: 'coms',
};
