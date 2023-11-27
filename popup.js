// popup.js
document.getElementById('toggleTooltip').addEventListener('change', function() {
    chrome.storage.local.set({showTooltip: this.checked});
});

document.getElementById('toggleNewSite').addEventListener('change', function() {
    chrome.storage.local.set({newSiteDefault: this.checked});
});

// Restore checkbox states when the popup is loaded
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['showTooltip', 'newSiteDefault'], function(data) {
        document.getElementById('toggleTooltip').checked = data.showTooltip !== false;
        document.getElementById('toggleNewSite').checked = data.newSiteDefault !== false;
    });
});