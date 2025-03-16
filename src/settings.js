import fs from "fs";
import {DEFAULT_SETTINGS, SETTINGS_FILE, SETTINGS_TEXT} from "./constants.js";

const loadSettings = () => {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(SETTINGS_TEXT.settingsError, error);
  }
  return DEFAULT_SETTINGS;
};

const saveSettings = (settings) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error(SETTINGS_TEXT.saveError, error);
  }
};

const SETTINGS = loadSettings();

export { SETTINGS, saveSettings };