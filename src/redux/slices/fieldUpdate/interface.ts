export declare interface FieldUpdateState {
  fieldUpdateMode: 'instant' | 'submit';
  editedFields:
  | {
    attributes: {
      type: string;
    };
    id: string;
    [key: string]: string | number | object;
  }[]
  | null;
  selectedRows: any[] | null;
  selectedViewBy: string;
  panelView: string;
}