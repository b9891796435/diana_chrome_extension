import { fixStorage } from "./tool/fixStorage"
chrome.runtime.onInstalled.addListener(fixStorage);
