console.log("Content script running");
function deleteCommentAndLogo() {
    try {
        document.getElementsByClassName('_30BbATRhFv3V83DHNDjJAO')[0].innerHTML = "";

    }
    catch (err) {

    }

    try {
        document.getElementsByClassName('_2l7c_Oz0UVsamALvPrlznq')[0].innerHTML = "";
    }
    catch (err) {

    }
}

function blockReddit() {
    // 1) Build the local URL for blocked.html
    //    chrome.runtime.getURL("blocked.html") returns something like:
    //    moz-extension://<extension-id>/blocked.html in Firefox
    const blockedUrl = chrome.runtime.getURL("blocked.html");

    // 2) Redirect the current tab to that page
    window.location.href = blockedUrl;
}

chrome.storage.local.get(['userData'], function (result) {
    console.log("Result from local storage:", result);
    whiteList = [];
    blackList = [];
    if (result.userData != undefined) {
        whiteList = result.userData.whiteList;
        blackList = result.userData.blackList;
    }


    pathName = window.location.pathname;

    // check if not a comment section, and not a whitelisted subreddit
    if (pathName != null) {
        if (pathName.includes("comments")) {
            // check the blacklist to see
            blackList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase())) {
                    //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
                    blockReddit();
                }
            });
        }
        else {
            console.log("2");
            // check each member of the whitelist, if the website isn't there, block it
            willBlock = true;
            whiteList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase())) {
                    willBlock = false;
                }
            });

            // I need to do testing to see if this works, because it could very well not work
            if (willBlock) {
                //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
                blockReddit();
            }
        }
    }
    else {
        //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
        blockReddit();
    }

    setInterval(deleteCommentAndLogo, 500);
});
