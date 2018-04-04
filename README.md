##### NOT CURRENTLY WORKING – PLEASE CONTACT ME IF YOU REQUIRE THIS PROGRAM.

## Default Area Code

#### Automatically adds a default area code to phone numbers in Google Contacts. This is particularly useful if contacts are being added from several sources to ensure consistency.

### How it works...
1. Numbers which already have your local area code (or none at all) will be displayed in your local form.
2. Numbers which have an International area code (which is not yours) will keep this.

### Requirements...
- `npm` command (Can be installed with [Node.js](https://nodejs.org/en/))

### How to use...
1. Open `package.json` in a text editor and set `default_code` (`GB` by default).
2. Run `npm install` to install required dependencies.
3. Start authentication server with `npm run authorise`.
4. Go to `http://localhost:3000` in a browser to authorise.
5. Now run `npm start` to update contacts' area code *(no need to re-authorise each time)*

### Questions...
Feel free to [contact me](https://zakcutner.uk) or alternatively [open an issue](https://github.com/zakcutner/default-area-code/issues).  
[Pull requests](https://github.com/zakcutner/default-area-code/pulls) are also welcome. :blush:
