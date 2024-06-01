console.log("Staring contents.js");

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message.action);
//   if (message.action === "highlightText") {
//     highlightText(message.color);
//   }
// });




document.addEventListener('click', function (event) {
  const highlightedText = event.target;
  // Check if the element has the class 'highlight'
  // Create an option button if it doesn't exist already
  if (!document.querySelector('.hover-option-button') && highlightedText.classList.contains('highlight')) {
    console.log("Clicked on span");
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add('main');
    let button1 = document.createElement('img');
    let button2 = document.createElement('img');
    let button3 = document.createElement('img');
    button1.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-EBDtcPGGt4v6NLCKjMtbXTo1Q9dH2daC6A&s';
    button2.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCV4-uJdU1jbdPehq8FrubStFsGVDG9M0FZg&s';
    button3.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NwmH4k2nx9NtfSVweYSAQ_10hw1GggdEwg&s';
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    button1.classList.add('hover-option-button-hover');
    button2.classList.add('hover-option-button-hover');
    button3.classList.add('hover-option-button-hover');


    // Position the button near the highlighted text
    div.style.position = 'absolute';
    div.style.top = `${event.pageY + 5}px`; // Adjust position slightly below the cursor
    div.style.left = `${event.pageX + 5}px`; // Adjust position slightly to the right of the cursor

    // Remove the button when mouse leaves
    document.addEventListener('click', function () {
      if (div) {
        div.remove();
      }
    }, { once: true });



    // Button to change color of highlight 
    button1.addEventListener('click',()=>{
      console.log("Colour change called");
      let div2 = document.createElement('div');
      console.log(div2);
      div2.classList.add('main2');
      let buttons1 = document.createElement('div');
      let buttons2 = document.createElement('div');
      let buttons3 = document.createElement('div');
      let buttons4 = document.createElement('div');
      let buttons5 = document.createElement('div');
      let buttons6 = document.createElement('div');
      let buttons7 = document.createElement('div');
      div2.appendChild(buttons1);
      div2.appendChild(buttons2);
      div2.appendChild(buttons3);
      div2.appendChild(buttons4);
      div2.appendChild(buttons5);
      div2.appendChild(buttons6);
      div2.appendChild(buttons7);
      buttons1.style.backgroundColor = '#FFDC74';
      buttons2.style.backgroundColor = '#FBAC87';
      buttons3.style.backgroundColor = '#F3A6C8';
      buttons4.style.backgroundColor = '#AEB5FF';
      buttons5.style.backgroundColor = '#81E3E1';
      buttons6.style.backgroundColor = '#95C8F3';
      buttons7.style.backgroundColor = '#B3E561';
      buttons1.classList.add('hover-option-button');
      buttons2.classList.add('hover-option-button');
      buttons3.classList.add('hover-option-button');
      buttons4.classList.add('hover-option-button');
      buttons5.classList.add('hover-option-button');
      buttons6.classList.add('hover-option-button');
      buttons7.classList.add('hover-option-button');
      
      div2.style.position = 'absolute';
      div2.style.top = `${event.pageY + 25}px`; // Adjust position slightly below the cursor
      div2.style.left = `${event.pageX + 5}px`;

      document.body.appendChild(div2);
      console.log(document.getElementsByClassName('main2')[0]);
      div2.focus();
      console.log(div2);
      div.remove();

      document.addEventListener('click', function (e) {
        if (div2 && !div.contains(e.target)) {
          div2.remove();
      }
      });



      var highlights3 = JSON.parse(localStorage.getItem('highlights')) || [];
      highlights3.forEach((h,i) => {
      if(h.url==window.location.href && h.text==highlightedText.innerHTML){
        const slides = document.getElementsByClassName('highlight');
        for (let i = 0; i < slides.length; i++) {
          var d = slides.item(i);
          if(d.innerHTML==h.text) break;
        }
        const bts = document.getElementsByClassName('hover-option-button');
        for(let j=0; j< bts.length ; j++){
          if(bts[j].style.backgroundColor==d.style.backgroundColor){
            bts[j].style.border = "2px solid white";
            break;
          }
        }
        console.log(i);
        console.log(d);
        buttons1.addEventListener('click',()=>{
          d.style.backgroundColor=buttons1.style.backgroundColor;
          highlights3[i].colour = buttons1.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons2.addEventListener('click',()=>{
          d.style.backgroundColor=buttons2.style.backgroundColor;
          highlights3[i].colour = buttons2.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons3.addEventListener('click',()=>{
          d.style.backgroundColor=buttons3.style.backgroundColor;
          highlights3[i].colour = buttons3.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons4.addEventListener('click',()=>{
          d.style.backgroundColor=buttons4.style.backgroundColor;
          highlights3[i].colour = buttons4.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons5.addEventListener('click',()=>{
          d.style.backgroundColor=buttons5.style.backgroundColor;
          highlights3[i].colour = buttons5.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons6.addEventListener('click',()=>{
          d.style.backgroundColor=buttons6.style.backgroundColor;
          highlights3[i].colour = buttons6.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        buttons7.addEventListener('click',()=>{
          d.style.backgroundColor=buttons7.style.backgroundColor;
          highlights3[i].colour = buttons7.style.backgroundColor;
          console.log(highlights3[i].colour);
          localStorage.setItem('highlights', JSON.stringify(highlights3));
        });
        return;
      }
      });
    });



    // Add click event to the button to create a textarea
    button2.addEventListener('click', function () {
      console.log("comment panel open");
      // Remove the div
      div.remove();
      // Create a textarea
      const highlights2 = JSON.parse(localStorage.getItem('highlights')) || [];
      highlights2.forEach((h,i) => {
      if(h.url==window.location.href && h.text==highlightedText.innerHTML && h.textarea==0){
        console.log(highlights2[i]);
        highlights2[i].textarea=1;
        localStorage.setItem('highlights', JSON.stringify(highlights2));
        let textarea = document.createElement('textarea');
        textarea.classList.add('hover-textarea');
      
        // Position the textarea near the highlighted text
        textarea.style.position = 'absolute';
        textarea.style.top = `${event.pageY+25}px`;
        textarea.style.left = `${event.pageX+5}px`;
        textarea.style.backgroundColor = h.colour;
        textarea.value = highlights2[i].textareaText;
      
        // Append the textarea to the body
        document.body.appendChild(textarea);
        textarea.focus();
      
        // Event listener to log the text content on blur
        textarea.addEventListener('blur', function () {
          console.log(textarea.value); // Log the entered text
          highlights2[i].textareaText=textarea.value;
          textarea.remove();
          highlights2[i].textarea=0;
          localStorage.setItem('highlights', JSON.stringify(highlights2));
        });
      };
    });
      return;
    });


    // Button to delete highlight
    button3.addEventListener('click',()=>{
      div.remove();
      console.log("Delete called"); 
      result = confirm("Do you really want to delete such a beautiful highlighted text???");
      var highlights2 = JSON.parse(localStorage.getItem('highlights')) || [];
      highlights2.forEach((h,i) => {
      if(h.url==window.location.href && h.text==highlightedText.innerHTML && result){
        const slides = document.getElementsByClassName('highlight');
        for (let i = 0; i < slides.length; i++) {
          var d = slides.item(i);
          console.log(d);
          if(d.innerHTML==h.text) d.style.backgroundColor = 'transparent';
          // else{
          //   var s = window.getSelection();
          //   const range = document.createRange();
          //   range.selectNodeContents(d);
          //   s.removeAllRanges();
          //   s.addRange(range);
          //   highlightText(d.style.backgroundColor);
          // }
        }
        console.log(i);
        highlights2.splice(i,1);
        localStorage.setItem('highlights', JSON.stringify(highlights2));
        return;
      }
      });
    });
  }
});


function highlightText(colour) {
  const url = window.location.href;
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  var len = selection.toString().length;
  const range = selection.getRangeAt(0);
  var parentElement = range.commonAncestorContainer;
  if (parentElement.nodeType === Node.TEXT_NODE) {
    parentElement = parentElement.parentNode;
  }
  function calculateOffsets(range, parentElement) {
    var htmlContent = parentElement.innerHTML.toString();
    var startContainerHTML = '';
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      startContainerHTML = range.startContainer.nodeValue;
    } else {
      startContainerHTML = range.startContainer.outerHTML || range.startContainer.innerHTML;
    }
    startContainerHTML = startContainerHTML.toString();
    while(startContainerHTML[startContainerHTML.length-1]==" " || startContainerHTML[startContainerHTML.length-1]==String.fromCharCode(160)){
      startContainerHTML = startContainerHTML.substring(0,startContainerHTML.length-1);
    }
    while(startContainerHTML[0]==" " || startContainerHTML[0]==String.fromCharCode(160)){
      startContainerHTML = startContainerHTML.substring(1,startContainerHTML.length-1);
    }


    // Serialize the content of the range end container
    var endContainerHTML = '';
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      endContainerHTML = range.endContainer.nodeValue;
    } else {
      endContainerHTML = range.endContainer.outerHTML || range.endContainer.innerHTML;
    }
    endContainerHTML = endContainerHTML.toString();
    while(endContainerHTML[endContainerHTML.length-1]==" " || endContainerHTML[endContainerHTML.length-1]==String.fromCharCode(160)){
      endContainerHTML = endContainerHTML.substring(0,endContainerHTML.length-1);
    }
    while(endContainerHTML[0]==" " || endContainerHTML[0]==String.fromCharCode(160)){
      endContainerHTML = endContainerHTML.substring(1,endContainerHTML.length-1);
    }
    
    // Calculate the start offset
    var startOffset = range.startOffset;
    var temp = htmlContent;
    var check=0;
    console.log(htmlContent.indexOf(startContainerHTML));
    for(let i=0;i<htmlContent.length;i++){
      if(htmlContent[i]=='<') check=1;
      else if(htmlContent[i]=='>') check=0;
      if(i==htmlContent.indexOf(startContainerHTML) && check==1){
        startOffset+=htmlContent.indexOf(startContainerHTML)+startContainerHTML.length;
        htmlContent=htmlContent.substring(htmlContent.indexOf(startContainerHTML)+startContainerHTML.length,htmlContent.length);
        i=0;
      }
      else if(i==htmlContent.indexOf(startContainerHTML) && check==0){
        startOffset+=i;
        break;
      }
    }
  console.log("Start Offset: " + startOffset);
    htmlContent=temp;
    // for(let i=0;i<startOffset;i++){
    var array = [...htmlContent.matchAll('<span class="highlight"[^>]+>')];
    console.log(array.length);
    for(let j=0;j<array.length;j++){
      console.log(j);
      console.log(array[j]);
      startOffset-=array[j].toString().length;
      startOffset-=7;
    }
    // }
    var endOffset = startOffset+len;



    console.log(htmlContent);
    console.log(range.startOffset);
    console.log(startContainerHTML);
    console.log(htmlContent.indexOf(startContainerHTML));

    // Return the end offset
    return {
        startOffset: startOffset,
        endOffset: endOffset
    };
}

  // Calculate the start offset relative to the parent element
  var offsets = calculateOffsets(range, parentElement);

  // Log the start and end offsets
  console.log("Start Offset: " + offsets.startOffset);
  console.log("End Offset: " + offsets.endOffset);

  const startContainerXPath = getXPath(range.startContainer);
  const endContainerXPath = getXPath(range.endContainer);
  const highlight = {
    startContainerXPath: startContainerXPath,
    startOffset: offsets.startOffset,
    endContainerXPath: endContainerXPath,
    endOffset: offsets.endOffset
  };
  console.log("Range is "+ range);
  const span = document.createElement('span');
  span.style.backgroundColor = colour;
  span.className = 'highlight';
  const fragment = range.cloneContents();
  span.appendChild(fragment);
  range.deleteContents();
  range.insertNode(span);
  var text = span.innerHTML;
  saveHighlight(colour,url,text,range,highlight);
}


// document.getElementsByClassName('mw-page-title-main')[0].addEventListener('mouseover', () => {
//     console.log("stttt");
//     const selectedText = window.getSelection().toString();
//     if (selectedText) {
//       highlightText();
//     }
// });



function saveHighlight(colour,url,text,range,highlight) {
const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
highlights.push({
    colour : colour,
    url: url,
    text: text,
    startOffset: highlight.startOffset,
    endOffset: highlight.endOffset,
    parentXPath: getXPath(range.commonAncestorContainer),
    textarea : 0,
    textareaText : "Ram Ram ji",
    innerText : range.toString(),
    id: new Date().toString(),
    Date: "Sat Jun 1 2024"
});
localStorage.setItem('highlights', JSON.stringify(highlights));
}


function getXPath(element) {
const paths = [];
for (; element && element.nodeType == 1; element = element.parentNode) {
    let index = 0;
    for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
    if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue;
    if (sibling.nodeName == element.nodeName) ++index;
    }
    const tagName = element.nodeName.toLowerCase();
    const pathIndex = (index ? `[${index + 1}]` : '');
    paths.splice(0, 0, tagName + pathIndex);
}
return paths.length ? '/' + paths.join('/') : null;
}



// Event listener for double-click to highlight
// document.addEventListener('dblclick', highlightText);

  
// Load existing highlights
// document.addEventListener('load', () => {
  const highlights = JSON.parse(localStorage.getItem('highlights')) || [];
  highlights.forEach(h => {
    if(h.url==window.location.href) restoreHighlight(h);
  });
// });

// Function to restore highlights
function restoreHighlight({colour, url, text, startOffset, endOffset, parentXPath,textarea,textareaText,innerText,id,Date}) {
  const parent = document.evaluate(parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!parent) return;
  if(startOffset<0) startOffset=0;
    var inner = parent.innerHTML;
    var array1 = [...inner.matchAll('<span class="highlight"[^>]+>')];
    for(let j=0;j<array1.length;j++){
      console.log(j);
      console.log(array1[j]);
      startOffset+=array1[j].toString().length+7;
    }
    // console.log(parent);
    // var inner = parent.innerHTML;
    // console.log(inner);
    // var textarr = text.split(" ");
    // textarr.forEach((word)=>{
    //   var index = inner.indexOf(word);
    //   console.log(index);
    //   if (index >= 0) { 
    //   inner = inner.substring(0, index) +"<span style='background-color: yellow;'>"+word+"</span>"+inner.substring(index + word.length);
    //   parent.innerHTML = inner;
    //   }
    // })

    console.log("Restoringggg");

    console.log(inner);
    console.log(text[0]+text[1]);
    var temp = startOffset;
    if(text[0]=='<' || text[1]=='<'){
      console.log("ENTER");
      console.log(inner[startOffset]);
      while((inner[startOffset]!='<' && inner[startOffset]!='>') && startOffset>0){
        console.log(inner[startOffset]);
        startOffset--;
      }
    }
    console.log(inner[startOffset]+ "                "+ startOffset);
    var x = temp-startOffset;
    if(inner[startOffset]=='>' && (text[0]=='<' || text[1]=='<') && temp>startOffset){
      while(inner[startOffset]!='<' && startOffset>0){
        startOffset--;
      }
      x=temp-startOffset-x;
      console.log("x is:  "+x);
      startOffset = temp;
      let tag2 = text.match("<[a-zA-Z]");
      console.log(inner.substring(0, startOffset));
      console.log(text);
      console.log(tag2);
      let tag = tag2.toString();
      tag= tag.substring(1,tag.length);
      inner = inner.substring(0, startOffset) +"</"+tag+">"+"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span> "+inner.substring(text.length+startOffset-x-1,inner.length);
    }
    else{
      if(inner[startOffset-1]==text[0]) startOffset--;
      issue=0;
      for(let i=text.length+startOffset;i<inner.length-1;i++){
        if(inner[i]=='<' && inner[i+1]!='/') break;
        else if(inner[i]=='<' && inner[i+1]=='/'){
          issue=1;
          var tag2 = inner.substring(i,i+10).match("<[^<]+>").toString();
          console.log(tag2);
          var array = [...text.matchAll('<'+tag2.substring(2,tag2.length-1)+'[^>]+>')];
          console.log(array[array.length-1]);
        }
      }
      console.log(startOffset);
      console.log(inner.substring(0, startOffset));
      console.log(text);
      console.log(inner.substring(text.length+startOffset,inner.length));
      if(issue) inner = inner.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+array[array.length-1]+inner.substring(text.length+startOffset-tag2.length,inner.length);
      else inner = inner.substring(0, startOffset) +"<span class='highlight' style='background-color:"+colour+"'>"+text+"</span>"+inner.substring(text.length+startOffset,inner.length);
    }
    parent.innerHTML = inner;




    



    



  // const range = document.createRange();
  // range.setStart(parent.firstChild, startOffset);
  // range.setEnd(parent.firstChild, endOffset);
  //   console.log(range);
  // const span = document.createElement('span');
  // span.style.backgroundColor = 'yellow';
  // range.surroundContents(span);
  // const fragment = range.cloneContents();
  // span.appendChild(fragment);
  // range.deleteContents();
  // range.insertNode(span);
}





// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

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
    console.log(domInfo);
    response(domInfo);
  }
});