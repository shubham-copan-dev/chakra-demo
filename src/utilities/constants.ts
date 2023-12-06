export const defaultGridView = {
  "_id": "63cf14a705e7ffa4f72e5fd1",
  "isActive": true,
  "columnDetails": [
      {
          "name": "Name",
          "isVisible": true,
          "columnOrder": 1
      },
      {
          "name": "Type",
          "isVisible": true,
          "columnOrder": "2"
      }
  ],
  "user": "005Dn000003HOOPIA4",
  "isDefault": true,
  "view": "grid",
  "visibility": "private",
  "tenant": "00DDn000006AGagMAG",
  "name": "My Accounts",
  "description": "A list of my accounts",
  "filter": null,
  "label": "My Accounts",
  "defaultFieldUIData": {
      "name": null,
      "isVisible": false,
      "columnOrder": null
  },
  "sfObject": "Account",
  "query": {
      "type": "SELECT",
      "fields": [
          {
              "name": "Id",
              "columnOrder": null,
              "isVisible": true,
              "width": 300,
              "isGroupable": false
          },
          {
              "name": "Name",
              "columnOrder": 1,
              "isVisible": true,
              "width": 300,
              "isGroupable": false
          }
      ],
      "object": "Account",
      "limit": "20"
  },
  "updatedAt": "2023-11-24T12:04:54.073Z"
}