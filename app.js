require("dotenv").config();

const { parsePhoneNumberFromString } = require("libphonenumber-js");
const { google } = require("googleapis");

process.on("unhandledRejection", (message, _) => {
  console.error(message);
});

const OAuth2 = google.auth.OAuth2;
const client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

client.setCredentials({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN
});

const people = google.people({
  version: "v1",
  auth: client
}).people;

const connections = people.connections.list({
  resourceName: "people/me",
  personFields: "names,phoneNumbers"
});

connections.then(connections => {
  for (connection of connections.data.connections) {
    if (!("phoneNumbers" in connection)) {
      continue;
    }

    for (phoneNumber of connection.phoneNumbers) {
      try {
        const number = parsePhoneNumberFromString(phoneNumber.value, "GB");
        phoneNumber.value =
          number.country == process.env.DEFAULT_CODE
            ? number.formatNational()
            : number.formatInternational();
      } catch (e) {
        console.error(
          `Cannot update contact "${connection.names[0].displayName}" with number "${phoneNumber.value}": ${e.message}`
        );
      }
    }

    people.updateContact({
      resourceName: connection.resourceName,
      updatePersonFields: "phoneNumbers",
      resource: connection
    });
  }
});
