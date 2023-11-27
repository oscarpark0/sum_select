document.addEventListener('mouseup', function() {
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get('showTooltip', function(data) {
            if (chrome.runtime.lastError) {
                console.log('An error occurred: ' + chrome.runtime.lastError.message);
            } else if (data.showTooltip !== false) { // default to true if not set
                var selection = getSelectionText();
                if (selection.text && selection.range) {
                    var wordCount = countWords(selection.text);
                    var charCount = selection.text.length;
                    createTooltip(wordCount, charCount, selection.range);
                }
            }
        });
    }
});

document.addEventListener('mousedown', function() {
    var existingTooltip = document.getElementById('wordCountTooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
});

function getSelectionText() {
    var text = "";
    var range;
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            text = selection.toString();
            range = selection.getRangeAt(0);
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
        range = document.selection.createRange();
    }
    return {text: text, range: range};
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function createTooltip(wordCount, charCount, range) {
    // Remove existing tooltip if any
    var existingTooltip = document.getElementById('wordCountTooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create tooltip element
    var tooltip = document.createElement('div');
    tooltip.id = 'wordCountTooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.backgroundColor = '#f9f9f9'; // subtle background color
    tooltip.style.padding = '2px'; // add some padding
    tooltip.style.border = '4px solid #707070'; // add a border
    tooltip.style.borderRadius = '4px'; // round the corners
    tooltip.style.fontFamily = 'Helvitica, Arial, sans-serif'; // change the font
    tooltip.style.fontSize = '14px'; // change the font size
    tooltip.innerHTML = 'Words: ' + wordCount + '<br>Chars: ' + charCount;

    // Set a high z-index
    tooltip.style.zIndex = '9999';

    // Get position of the last word
    var rect = range.getBoundingClientRect();
    tooltip.style.left = rect.right + 'px';
    tooltip.style.top = rect.top + 'px';

    // Append tooltip to the body
    document.body.appendChild(tooltip);
}