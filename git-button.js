
function addGitButton() {
    // Grab any action div's
    var editActions = document.querySelectorAll("div.actions");
    // If there were some action divs
    if (editActions.length > 0) {
        // Loop through the action divs
        editActions.forEach(function (singleAction) {
            if (!singleAction.childNodes[0].className.includes('alloy_git_button')) {
                var storyIdInput = singleAction.querySelector("input.text_value");
                var storyId = storyIdInput.value.substr(1);
                const storyContainer = singleAction.closest(`.story_${storyId}`);
                const name = storyContainer.querySelector('textarea[data-aid="name"]').value;
                var button = document.createElement("button");
                button.style.backgroundImage = `url(//assets.pivotaltracker.com/next/assets/next/e9e6998e-git-branch.svg)`;
                button.style.backgroundSize = "14px 14px";
                button.style.backgroundPosition = "center";
                button.style.backgroundRepeat = "no-repeat";
                button.classList.add("alloy_git_button");
                button.type = "button";
                button.className = "autosaves clipboard_button hoverable capped alloy_git_button";
                button.title = "Copy Git branch command to your clipboard";
                button.setAttribute("data-clipboard-text", `${storyId}-${slugify(name)}`);
                var firstNode = singleAction.childNodes[0];
                singleAction.insertBefore(button, firstNode);
            }
        });
    }
}

function slugify(text) {
    const slug = text
        .toLowerCase()
        .replace(/\s-\s/g, '-')
        .replace(/&/g, 'and')
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    shortenedSlug = slug.length > 50 ? slug.substr(0, 50) : slug;
    return shortenedSlug[shortenedSlug.length - 1] === '-' ? shortenedSlug.substr(0, shortenedSlug.length - 1) : shortenedSlug;
}

function shrinkCloseButtons() {
    var close = document.querySelectorAll(".persistence.use_click_to_copy .close");
    close.forEach(function (thisCloseButton) {
        thisCloseButton.style.width = "82px";
    });
}

function drawButtons() {
    shrinkCloseButtons();
    addGitButton();
};

setInterval(drawButtons, 500);