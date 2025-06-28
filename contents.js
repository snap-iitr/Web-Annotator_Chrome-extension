console.log("Staring contents JS");

// Global popup state
const activePopups = {
  main: null,
  colorPicker: null,
  commentBox: null
};

function closeAllPopups() {
  Object.values(activePopups).forEach(popup => {
    if (popup) popup.remove();
  });
  activePopups.main = activePopups.colorPicker = activePopups.commentBox = null;
}

// Load existing highlights
const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
highlights.forEach(h => {
  if(h.url==window.location.href) restoreHighlight(h);
});

// Function to restore highlights
function restoreHighlight({ colour, startOffset, endOffset, parentXPath, highlightId }) {
  const parent = document.evaluate(parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!parent || startOffset >= endOffset) return;

  const normalize = str => str.replace(/\u00A0/g, ' '); // Convert &nbsp; to normal space
  let currentOffset = 0;

  // Include all visible text nodes (even inside highlight spans)
  const walker = document.createTreeWalker(
    parent,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const style = node.parentElement && window.getComputedStyle(node.parentElement);
        const isVisible = !style || (style.display !== 'none' && style.visibility !== 'hidden');
        return isVisible && normalize(node.nodeValue).trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    }
  );

  const rangesToHighlight = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const nodeText = normalize(node.nodeValue);
    const nodeLength = nodeText.length;

    const nodeStart = currentOffset;
    const nodeEnd = currentOffset + nodeLength;

    if (nodeEnd <= startOffset) {
      currentOffset += nodeLength;
      continue;
    }

    if (nodeStart >= endOffset) break;

    const rangeStart = Math.max(startOffset, nodeStart) - nodeStart;
    const rangeEnd = Math.min(endOffset, nodeEnd) - nodeStart;

    rangesToHighlight.push({ node, rangeStart, rangeEnd });
    currentOffset += nodeLength;
  }

  // Perform highlighting now (from end to start to avoid breaking nodes)
  for (let i = rangesToHighlight.length - 1; i >= 0; i--) {
    const { node, rangeStart, rangeEnd } = rangesToHighlight[i];
    const range = document.createRange();
    range.setStart(node, rangeStart);
    range.setEnd(node, rangeEnd);

    const highlight = document.createElement("span");
    highlight.className = "highlight-text-by-sourav";
    highlight.style.backgroundColor = colour;
    highlight.setAttribute("data-highlight-id", highlightId);

    highlight.appendChild(range.extractContents());
    range.insertNode(highlight);
  }
}

document.addEventListener('click', function (event) {
  document.querySelectorAll('.highlight-text-by-sourav.active').forEach(span => {
    span.classList.remove('active');
  });
  const highlightedText = event.target;
  if (highlightedText.classList.contains('hover-textarea-sourav')) return;

  closeAllPopups();
  if (!highlightedText.classList.contains('highlight-text-by-sourav')) return;

  const highlightId = highlightedText.getAttribute('data-highlight-id');
  if (!highlightId) return;
  // Activate all spans of the same group
  const groupSpans = document.querySelectorAll(`.highlight-text-by-sourav[data-highlight-id="${highlightId}"]`);
  groupSpans.forEach(span => span.classList.add('active'));

  const rect = groupSpans[0].getBoundingClientRect();
  const pageX = rect.left + window.pageXOffset;
  const pageY = rect.top + window.pageYOffset;

  // === MAIN ACTION POPUP ===
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('main-sourav');
  mainDiv.style.position = 'absolute';
  mainDiv.style.top = `${pageY + 25}px`;
  mainDiv.style.left = `${pageX + 25}px`;
  activePopups.main = mainDiv;

  const [button1, button2, button3] = ['img', 'img', 'img'].map(tag => document.createElement(tag));
  button1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-EBDtcPGGt4v6NLCKjMtbXTo1Q9dH2daC6A&s';
  button2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCV4-uJdU1jbdPehq8FrubStFsGVDG9M0FZg&s';
  button3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NwmH4k2nx9NtfSVweYSAQ_10hw1GggdEwg&s';

  [button1, button2, button3].forEach(btn => {
    btn.classList.add('hover-option-button-hover');
    mainDiv.appendChild(btn);
  });

  document.body.appendChild(mainDiv);

  // === BUTTON 1: Color Picker ===
  button1.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllPopups();

    const colorPalette = ['#FFDC74', '#FBAC87', '#F3A6C8', '#AEB5FF', '#81E3E1', '#95C8F3', '#B3E561'];
    const paletteDiv = document.createElement('div');
    paletteDiv.classList.add('main2-sourav');
    paletteDiv.style.position = 'absolute';
    paletteDiv.style.top = `${pageY + 25}px`;
    paletteDiv.style.left = `${pageX + 25}px`;
    activePopups.colorPicker = paletteDiv;

    colorPalette.forEach(color => {
      const btn = document.createElement('div');
      btn.classList.add('hover-option-button');
      btn.style.backgroundColor = color;
      btn.addEventListener('click', () => {
        groupSpans.forEach(span => span.style.backgroundColor = color);
        const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
        highlights.forEach(h => {
          if (h.highlightId === highlightId) h.colour = color;
        });
        localStorage.setItem('highlights', JSON.stringify(highlights));
        closeAllPopups();
      });
      paletteDiv.appendChild(btn);
    });

    document.body.appendChild(paletteDiv);
  });

  // === BUTTON 2: Comment ===
  button2.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllPopups();
    const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
    const target = highlights.find(h => h.highlightId === highlightId);
    if (!target || target.textarea) return;

    target.textarea = 1;
    localStorage.setItem('highlights', JSON.stringify(highlights));

    const textarea = document.createElement('textarea');
    textarea.classList.add('hover-textarea-sourav');
    textarea.style.position = 'absolute';
    textarea.style.top = `${pageY + 25}px`;
    textarea.style.left = `${pageX + 25}px`;
    textarea.style.backgroundColor = target.colour;
    textarea.value = target.textareaText || "";
    activePopups.commentBox = textarea;

    textarea.addEventListener('blur', () => {
      target.textareaText = textarea.value;
      target.textarea = 0;
      localStorage.setItem('highlights', JSON.stringify(highlights));
      textarea.remove();
      activePopups.commentBox = null;
    });

    document.body.appendChild(textarea);
    textarea.focus();
  });

  // === BUTTON 3: Delete Highlight ===
  button3.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!confirm("Do you really want to delete this highlight?")) return;
    deleteHighlight();  // assumes this function deletes all .active spans
    closeAllPopups();
  });
});

function calculateOffsetsFromSelection(selection, parentElement) {
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const normalize = str => str.replace(/\u00A0/g, ' '); // Replace non-breaking spaces
  let startOffset = 0, endOffset = 0;
  let currentOffset = 0;

  const walker = document.createTreeWalker(
    parentElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        const style = parent ? window.getComputedStyle(parent) : null;
        const isVisible = !style || (style.display !== "none" && style.visibility !== "hidden");
        return isVisible && normalize(node.nodeValue).trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    }
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const textContent = normalize(node.nodeValue);

    if (node === range.startContainer) {
      startOffset = currentOffset + range.startOffset;
    }

    if (node === range.endContainer) {
      endOffset = currentOffset + range.endOffset;
      break; // stop early after end is found
    }

    currentOffset += textContent.length;
  }

  return {
    startOffset: startOffset,
    endOffset: endOffset
  };
}

function highlightText(colour) {
  const url = window.location.href;
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const parentElement = (range.commonAncestorContainer.nodeType === Node.TEXT_NODE)
    ? range.commonAncestorContainer.parentNode
    : range.commonAncestorContainer;

  const offsets = calculateOffsetsFromSelection(selection, parentElement);
  const visibleText = selection.toString();

  // Save highlight data to localStorage
  id = new Date().toString();
  saveHighlight(colour, url, visibleText, range, parentElement, {
    startOffset: offsets.startOffset,
    endOffset: offsets.endOffset,
    highlightId: id
  });

  // Remove actual selection and restore it with correct highlighting
  selection.removeAllRanges();
  restoreHighlight({
    colour,
    startOffset: offsets.startOffset,
    endOffset: offsets.endOffset,
    parentXPath: getXPath(parentElement),
    highlightId: id
  });
}

function saveHighlight(colour, url, text, range, parentElement, highlight) {
  const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
  highlights.push({
    colour: colour,
    url: url,
    text: text,
    startOffset: highlight.startOffset,
    endOffset: highlight.endOffset,
    parentXPath: getXPath(parentElement),
    textarea: 0,
    textareaText: "Welcome Back!",
    innerText: range.toString(),
    highlightId: highlight.highlightId
  });
  localStorage.setItem('highlights', JSON.stringify(highlights));
}

function getXPath(element) {
  const paths = [];
  for (; element && element.nodeName.toLowerCase() != 'html'; element = element.parentNode) {
      let index = 0;
      for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue;
        if (sibling.nodeName == element.nodeName) ++index;
      }
      const tagName = element.nodeName.toLowerCase();
      const pathIndex = (index ? `[${index + 1}]` : '');
      paths.splice(0, 0, tagName + pathIndex);
  }
  return paths.length ? 'html/' + paths.join('/') : null;
}

// Implementing Keyborad Shortcuts by listening messsage from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggle_highlight") {
    highlightText("#FFDC74");
  } else if (request.action === "next_highlight") {
    goToNextHighlight();
  } else if (request.action === "previous_highlight") {
    goToPreviousHighlight();
  } else if (request.action === "clear_highlights") {
    deleteHighlight();
  }
});

function goToNextHighlight() {
  closeAllPopups();
  // Get all spans that are visible highlights
  const allHighlightSpans = Array.from(document.querySelectorAll('.highlight-text-by-sourav'))
    .filter(span => span.style.backgroundColor !== 'transparent');

  if (allHighlightSpans.length === 0) return;

  // Group spans by their highlightId
  const highlightMap = new Map();
  allHighlightSpans.forEach(span => {
    const id = span.getAttribute('data-highlight-id');
    if (!highlightMap.has(id)) {
      highlightMap.set(id, []);
    }
    highlightMap.get(id).push(span);
  });

  const highlightGroups = Array.from(highlightMap.values());

  // Find the current active highlight group
  let activeGroupIndex = highlightGroups.findIndex(group =>
    group.some(span => span.classList.contains('active'))
  );

  // Clear previous active state
  allHighlightSpans.forEach(span => span.classList.remove('active'));

  // Determine next group index
  const nextGroupIndex = (activeGroupIndex + 1) % highlightGroups.length;
  const nextGroup = highlightGroups[nextGroupIndex];

  // Set all spans in next group to active
  nextGroup.forEach(span => span.classList.add('active'));

  // Scroll to the first span in the group
  const firstSpan = nextGroup[0];
  firstSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });

  firstSpan.click();
}

function goToPreviousHighlight() {
  closeAllPopups();
  // Get all visible highlight spans
  const allHighlightSpans = Array.from(document.querySelectorAll('.highlight-text-by-sourav'))
    .filter(span => span.style.backgroundColor !== 'transparent');

  if (allHighlightSpans.length === 0) return;

  // Group spans by their shared highlight ID
  const highlightMap = new Map();
  allHighlightSpans.forEach(span => {
    const id = span.getAttribute('data-highlight-id');
    if (!highlightMap.has(id)) {
      highlightMap.set(id, []);
    }
    highlightMap.get(id).push(span);
  });

  const highlightGroups = Array.from(highlightMap.values());

  // Find the current active group index
  let activeGroupIndex = highlightGroups.findIndex(group =>
    group.some(span => span.classList.contains('active'))
  );

  // Clear current active state
  allHighlightSpans.forEach(span => span.classList.remove('active'));

  // Determine the previous group index
  const prevGroupIndex = activeGroupIndex > 0
    ? activeGroupIndex - 1
    : highlightGroups.length - 1; // wrap around

  const prevGroup = highlightGroups[prevGroupIndex];

  // Mark all spans in the group as active
  prevGroup.forEach(span => span.classList.add('active'));

  // Scroll to the first span in the previous group
  const firstSpan = prevGroup[0];
  firstSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });

  firstSpan.click();
}

async function deleteHighlight() {
  closeAllPopups();
  const allHighlights = document.querySelectorAll('.highlight-text-by-sourav');

  // Find the first active span (can be from a group)
  const activeHighlight = Array.from(allHighlights).find(el => el.classList.contains('active'));
  if (!activeHighlight) return;

  const highlightId = activeHighlight.getAttribute('data-highlight-id');
  if (!highlightId) return;

  // Find all spans with same data-highlight-id
  const groupSpans = document.querySelectorAll(`.highlight-text-by-sourav[data-highlight-id="${highlightId}"]`);

  groupSpans.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span); // move content out
    }
    parent.removeChild(span); // remove empty span
  });

  console.log(`Deleted highlight group: ${highlightId}`);

  // Optionally: clean up from localStorage
  let highlights = JSON.parse(localStorage.getItem('highlights')) || [];
  highlights = highlights.filter(h => h.highlightId !== highlightId);
  localStorage.setItem('highlights', JSON.stringify(highlights));
}

// Inform the background page that 
// this tab should have a page-action.
// chrome.runtime.sendMessage({
//   from: 'content',
//   subject: 'showPageAction',
// });

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

    var domInfo = [];
    const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
    highlights.forEach(h => {
      if(h.url==window.location.href) domInfo.push(h);
    });

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
  }
});