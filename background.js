const tldLocales = {
  'highlightText': 'Highlight text'
}

const highlightColors = [
  { id: 'highlightYellow', title: 'Yellow', colorcode: '#FFDC74' },
  { id: 'highlightRed', title: 'Red', colorcode: '#FBAC87' },
  { id: 'highlightPink', title: 'Pink', colorcode: '#F3A6C8' },
  { id: 'highlightPurple', title: 'Purple', colorcode: '#AEB5FF' },
  { id: 'highlightCyan', title: 'Cyan', colorcode: '#81E3E1' },
  { id: 'highlightBlue', title: 'Blue', colorcode: '#95C8F3' },
  { id: 'highlightGreen', title: 'Green', colorcode: '#B3E561' },
];
  
chrome.runtime.onInstalled.addListener(async () => {
  for (let [tld, locale] of Object.entries(tldLocales)) {
    chrome.contextMenus.create({
      id: tld,
      title: locale,
      type: 'normal',
      contexts: ['selection'],
    });

    for (let color of highlightColors) {
      chrome.contextMenus.create({
        id: color.id,
        parentId: tld,
        title: color.title,
        type: 'normal',
        contexts: ['selection'],
      });
    }
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("CLICKED");
  console.log(info);
  console.log(tab);
  var colour = "yellow";
  if (highlightColors.find(c => c.id === info.menuItemId)) {
    highlightColors.forEach(color =>{
      console.log(color.id,info.menuItemId,info.menuItemId.toString());
      if(color.id==info.menuItemId.toString()){
        console.log("truee");
        colour = color.colorcode;
        console.log(colour);
      }
    })
    chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
        chrome.scripting.executeScript(
          {
            target: {tabId: tab.id},
            function: highlightTextredirect,
            args: [colour]
        })
      })
  }
});
  
function highlightTextredirect(colour) {
  console.log("clicked");
  console.log(colour);
  highlightText(colour);
}



chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});

// Implementing Keyboard Shortcuts
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle_highlight') {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle_highlight"});
    });
  } else if (command === 'next_highlight') {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "next_highlight"});
    });
  } else if (command === 'previous_highlight') {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "previous_highlight"});
    });
  } else if (command === 'clear_highlights') {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "clear_highlights"});
    });
  }
});




// chrome.webNavigation.onCompleted.addListener(
//   function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       // Send a message to the content script in the active tab
//       console.log(tabs[0]);
//       chrome.tabs.sendMessage(tabs[0].id, { message: "myMessage" });
//     });
//   },
//   { url: [{ schemes: ["http", "https"] }] }
// );
  