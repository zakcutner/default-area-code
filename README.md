## Default Area Code

#### Automatically adds a default area code to phone numbers in Google Contacts. This is particularly useful if contact numbers are being added from several sources to ensure consistency.

### How it works...
1. Numbers which already have your local area code (or none at all) will be displayed in your local form.
2. Numbers which have an International area code (which is not yours) will keep this.

### Requirements...
- `npm` command (Can be installed with [Node.js](https://nodejs.org/en/))

### How to use...
1. Run `npm install` to install required dependencies.
2. Set `hostname` and `port` in `package.json` (`localhost` and `3000` by default).
3. Start authentication server with `npm run authorise`.
4. Navigate to `http://hostname:port` in a web browser and complete the OAuth sign-in process.
5. Set `default_code` in `package.json` (`GB` by default).
6. Go to `http://localhost:3000` in a browser to authorise.
7. Now run `npm start` to update contacts' area code *(no need to re-authorise each time)*.
8. *(Optional)* Setup a cron job or similar to run periodically (e.g. `*/10 * * * * npm start --silent` will run every 10 minutes).

### Questions...
Feel free to [contact me](https://zakcutner.uk) or alternatively [open an issue](https://github.com/zakcutner/default-area-code/issues).  
[Pull requests](https://github.com/zakcutner/default-area-code/pulls) are also welcome. :blush:
