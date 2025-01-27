// background.js (Manifest V2-friendly)
chrome.runtime.onInstalled.addListener((details) => {
  // 'install', 'update', or 'chrome_update', etc.
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'options.html' });
  }
});

// For MV2, use chrome.browserAction
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'options.html' });
});
