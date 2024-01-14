
function addGitButton() {
    // Grab all action div's
    const editActions = document.querySelectorAll("div.actions");
    // If there were some action divs
    if (editActions.length > 0) {
        // Loop through the action divs
        editActions.forEach(function (singleAction) {
            // Create button if the button hasn't been added yet
            if (!singleAction.childNodes[0].className.includes('alloy_git_button')) {
                const storyIdInput = singleAction.querySelector("input.text_value");
                const storyId = storyIdInput.value.substr(1);
                const storyContainer = singleAction.closest(`.story_${storyId}`);
                const storyType = getStoryType(storyContainer);
                const name = storyContainer.querySelector('textarea[data-aid="name"]').value;
                const button = generateGitButton(storyType, storyId, name);
                const firstNode = singleAction.childNodes[0];
                // Insert the button before the first node
                singleAction.insertBefore(button, firstNode);
            }
        });
    }
}

function getStoryType(node) {
    if (!node) return undefined;
    switch (true) {
        case node.classList.contains('feature'):
            return 'feature';
        case node.classList.contains('bug'):
            return 'bug';
        case node.classList.contains('chore'):
            return 'chore';
        default:
            return undefined
    }
}

function generateBranchname(storyType, storyId, storyName) {
    const type = storyType ? `${storyType}/` : '';
    const slug = slugify(storyName);
    return `${type}${storyId}-${slug}`;
}

function generateGitButton(storyType, storyId, storyName) {
    const button = document.createElement("button");
    button.classList.add("alloy_git_button");
    button.type = "button";
    button.className = "autosaves clipboard_button hoverable capped alloy_git_button";
    button.title = "Copy Git branch command to your clipboard";
    button.setAttribute("data-clipboard-text", generateBranchname(storyType, storyId, storyName));
    button.style.backgroundImage = `url(${chrome.runtime.getURL("logo.svg")})`;
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center";
    button.style.backgroundSize = "14px 14px";
    return button
}

function slugify(text) {
    const slug = text
        .toLowerCase()
        .replace(/&/g, 'and') // replace & with 'and'
        .replace(/ /g, '-') // replace spaces with -
        .replace(/[^\w-]+/g, '') // remove non-word characters
        .replace(/-{2,}/g, '-') // remove multiple hyphens
    shortenedSlug = slug.length > 50 ? slug.substr(0, 50) : slug;
    return shortenedSlug[shortenedSlug.length - 1] === '-' ? shortenedSlug.substr(0, shortenedSlug.length - 1) : shortenedSlug;
}

function shrinkCloseButtons() {
    const close = document.querySelectorAll(".persistence.use_click_to_copy .close");
    close.forEach(function (thisCloseButton) {
        thisCloseButton.style.width = "82px";
    });
}

function drawButtons() {
    shrinkCloseButtons();
    addGitButton();
};

setInterval(drawButtons, 500);