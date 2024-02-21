chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "save_password") {
      chrome.storage.local.get("passwords", function (data) {
        var passwords = data.passwords || {};
        passwords[request.website] = request.password;
        chrome.storage.local.set({ "passwords": passwords });
      });
    }
  });
  