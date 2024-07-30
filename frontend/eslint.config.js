import globals from "globals";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "module"}},
  {languageOptions: { sourceType: "module", globals: globals.browser, sourceType: "module" }},
];