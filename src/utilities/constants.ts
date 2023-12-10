import {
  ContactIcon,
  HomeIcon,
  LeadIcon,
  PipelineIcon,
  UserIcon,
} from "@/chakraConfig/icons";
import { FlexProps } from "@chakra-ui/react";

export const staticDashboards: any = [
  { href: "/dashboard/lead", icon: LeadIcon, label: "Lead", action: "lead" },
  {
    href: "/dashboard/contact",
    icon: ContactIcon,
    label: "Contact",
    action: "contact",
  },
];

export const icons = [PipelineIcon, UserIcon];

//method for updating URL with path /id and set queryparms (page,limit)
export const updateUrl = (id: string, queryParamsObject: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("id", id);
  Object.entries(queryParamsObject).forEach(([key, value]: any) => {
    urlParams.set(key, value);
  });
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};

//method for handling page dispaly on refresh

export const iconStyles = {
  height: "2rem",
  width: "2rem",
  borderRadius: "50%",
  bg: "bgClr.Grey500",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: ["column", null, "row"], // Responsive array for flexDirection
  overflow: "hidden",
} as FlexProps;

export const textStyle = {
  color: "bgClr.Grey400",
  textAlign: "center",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "130%",
};

export const buttonData = [
  { text: "Filters" },
  { text: "Manage Columns" },
  { text: "Show Metrices" },
  { text: "... More" },
];

// - - form fields - - - -
export const errorType: string[] = [
  "manual",
  "required",
  "pattern",
  "validate",
  "minLength",
  "maxLength",
  "max",
  "min",
  "positive",
  "lessThanTen",
  "greaterThan",
  "checkUrl",
];

// ag grid field types
export const fieldTypes = {
  REFERENCE: "reference",
  BOOLEAN: "boolean",
  STRING: "string", // done
  TEXTAREA: "textarea", // done
  PICKLIST: "picklist", // done
  CURRENCY: "currency", // done
  PERCENT: "percent",
  DOUBLE: "double",
  DATE: "date",
  DATETIME: "datetime",
  EDITFORM: "editForm",
  INT: "int",
};

export const operators = [
  { id: "1", label: "=", value: "=" },
  { id: "2", label: "!=", value: "!=" },
  { id: "3", label: ">", value: ">" },
  { id: "4", label: ">=", value: ">=" },
  { id: "5", label: "<=", value: "<=" },
  { id: "6", label: "like", value: "like" },
  { id: "7", label: "in", value: "in" },
  { id: "8", label: "not", value: "not" },
  { id: "9", label: "includes", value: "includes" },
  { id: "10", label: "excludes", value: "excludes" },
];

export const capsLetter = (value: string) => {
  return value?.toUpperCase();
};

export const getDirtyFields = (formFields: any, dirtyFields: any) => {
  const newValidFields: any = {};
  Object.keys(formFields)?.map((ke) => {
    if (dirtyFields[ke]) {
      newValidFields[ke] = formFields?.[ke];
    }
  });
  return newValidFields;
};

export function CurrencyFormatter({ value }: { value: number }) {
  const formatter = new Intl.NumberFormat(`en-${"US"}`, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function removeEmptyFields(data: { [key: string]: any }) {
  Object.keys(data).forEach((key) => {
    if (
      data[key] === "" ||
      data[key] == null ||
      data[key]?.length === 0 ||
      data[key] === false
    ) {
      delete data[key];
    }
  });
  return data;
}

export const viewByMeta = [
  {
    _id: "63cd4b8605e7ffa4f72e5f87",
    isActive: true,
    columnDetails: [
      {
        name: "Id",
        isVisible: false,
        columnOrder: 1,
      },
      {
        name: "StageName",
        isVisible: true,
        columnOrder: 2,
      },
      {
        name: "Name",
        isVisible: true,
        columnOrder: 3,
      },
    ],
    user: "005Dn000003HOOPIA4",
    isDefault: false,
    view: "tab",
    visibility: "private",
    tenant: "00DDn000006AGagMAG",
    sfObject: "Opportunity",
    label: "MEDIC",
    name: "medic",
    description: "This is salespractice used for productivity",
    defaultFieldUIData: {
      name: null,
      isVisible: false,
      columnOrder: null,
    },
    query: {
      type: "SELECT",
      fields: [
        {
          name: "Id",
          columnOrder: 1,
          isVisible: false,
          isGroupable: false,
        },
        {
          name: "StageName",
          columnOrder: 2,
          isVisible: true,
          isGroupable: false,
        },
        {
          name: "Name",
          columnOrder: 3,
          isVisible: true,
          isGroupable: false,
        },
      ],
      object: "Opportunity",
      filter: {
        type: "AND",
        expression: [],
      },
      limit: 20,
    },
    updatedAt: "2023-04-06T11:45:59.025Z",
  },
  {
    _id: "64354441681aa404ac48bbce",
    label: "Testing",
    sfObject: "Opportunity",
    description: "testing fields",
    tenant: "00DDn000006AGagMAG",
    visibility: "private",
    view: "tab",
    query: {
      type: "SELECT",
      fields: [
        {
          name: "IsDeleted",
          columnOrder: 1,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
        {
          name: "Description",
          columnOrder: 2,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
        {
          name: "AccountId",
          columnOrder: 3,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
      ],
      object: "Opportunity",
      filter: {
        type: "AND",
        expression: [],
      },
      limit: 20,
    },
    isDefault: true,
    user: "005Dn000003HOOPIA4",
    isActive: true,
    createdAt: "2023-04-11T11:28:01.184Z",
    updatedAt: "2023-04-11T11:28:01.184Z",
  },
  {
    _id: "64354472681aa404ac48bbd8",
    label: "testing1",
    sfObject: "Opportunity",
    description: "testing 1",
    tenant: "00DDn000006AGagMAG",
    visibility: "private",
    view: "tab",
    query: {
      type: "SELECT",
      fields: [
        {
          name: "Amount",
          columnOrder: 1,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
        {
          name: "IsPrivate",
          columnOrder: 2,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
        {
          name: "Name",
          columnOrder: 3,
          isVisible: true,
          width: 300,
          isGroupable: false,
        },
      ],
      object: "Opportunity",
      filter: {
        type: "AND",
        expression: [],
      },
      limit: 20,
    },
    isDefault: true,
    user: "005Dn000003HOOPIA4",
    isActive: true,
    createdAt: "2023-04-11T11:28:50.754Z",
    updatedAt: "2023-04-11T11:28:50.754Z",
  },
  {
    _id: "6436c217c64893a7fc86958d",
    label: "Medic 2",
    sfObject: "Opportunity",
    description: "test",
    tenant: "00DDn000006AGagMAG",
    visibility: "private",
    view: "tab",
    query: {
      type: "SELECT",
      fields: [
        {
          name: "Name",
          columnOrder: 1,
          isVisible: true,
          isGroupable: false,
        },
        {
          name: "Amount",
          columnOrder: 2,
          isVisible: true,
          isGroupable: false,
        },
        {
          name: "StageName",
          columnOrder: 3,
          isVisible: true,
          isGroupable: false,
        },
      ],
      object: "Opportunity",
      filter: {
        type: "AND",
        expression: [],
      },
      limit: 20,
    },
    isDefault: true,
    user: "005Dn000003HOOPIA4",
    isActive: true,
    createdAt: "2023-04-12T14:37:11.707Z",
    updatedAt: "2023-04-12T14:38:06.977Z",
  },
];
