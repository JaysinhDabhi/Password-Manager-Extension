document.addEventListener("DOMContentLoaded", function () {
    // Your code here
    document.getElementById("generate").addEventListener("click", function () {
      var password = generatePassword();
      document.getElementById("password").value = password;
    });
  
    document.getElementById("save").addEventListener("click", function () {
      var password = document.getElementById("password").value;
      var website = document.getElementById("website").value;
      chrome.runtime.sendMessage({ message: "save_password", password: password, website: website });
      displayPasswords();
    });

    
  
    document.getElementById("view").addEventListener("click", function () {
      var websiteName = document.getElementById("websiteName").value;
      if (websiteName.trim() !== "") {
        chrome.storage.local.get("passwords", function (data) {
          var passwords = data.passwords || {};
          var password = passwords[websiteName];
          if (password) {
            alert("Password for " + websiteName + ": " + password);
          } else {
            alert("No password found for " + websiteName);
          }
        });
      }
    });


    
  
    displayPasswords();
  
    function displayPasswords() {
        chrome.storage.local.get("passwords", function (data) {
          var passwords = data.passwords || {};
          var savedPasswordsList = document.getElementById("savedPasswords");
          savedPasswordsList.innerHTML = "";
          Object.keys(passwords).forEach(function (website) {
            var listItem = document.createElement("li");
            listItem.textContent = website + ": " + passwords[website];
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
              deletePassword(website);
            });
            listItem.appendChild(deleteButton);
            savedPasswordsList.appendChild(listItem);
          });
        });
      }
  
    function deletePassword(website) {
      chrome.storage.local.get("passwords", function (data) {
        var passwords = data.passwords || {};
        delete passwords[website];
        chrome.storage.local.set({ "passwords": passwords });
        displayPasswords();
      });
    }
  
  });
  
  function generatePassword() {
    var length = 12; // Change the length of the generated password if needed
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~"; // Define the character set for the password
    var password = "";
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  