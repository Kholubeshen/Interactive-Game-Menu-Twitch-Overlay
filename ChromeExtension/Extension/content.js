/* Connects to the socket server */
// const socket = io.connect('xhr://localhost:3000', {
//     upgrade:false,
//     transports:["websocket"]
// });

let effectsList;
let redemptions;

window.onload = setTimeout( () => {
    // console.log("socket", socket)

    //Get parent element to the redemptions and assigns it to the redemptions variable
    //The class name must match exacly.
    let hasClassName = document.getElementsByClassName("tw-flex tw-flex-column tw-full-height");
    redemptions;
    for(let i = 0; i < hasClassName.length; i++){
        if(hasClassName[i].className == "tw-flex tw-flex-column tw-full-height"){
            redemptions = hasClassName[i];
        }
    }

    //Checks for changes in the redemptions dom element to see when a redemption has been added or removed
    const redObserver = new MutationObserver((mutationList, observer) => observerCallback(mutationList, observer));

    config = {
        attributes: true,
        attributeFilter:["class"],
        childlist: true,
        subtree: true,
    }
    console.log(redemptions);
    redObserver.observe(redemptions, config);
    
    //Receives the effectsList from the server
    // socket.on("getEffects", (data) => {
    //     effectsList = data.list;
    // });

    const redContainerObserver = new MutationObserver((mutations) => redContainerObserver)

}, 1500);

function observerCallback(mutationList, observer){
    //Iterate through list of redemptions
    for(let mutation of mutationList){
        //Check that mutation is redemption
        if(mutation.target.className == "tw-transition tw-transition--enter-done tw-transition__scale-over tw-transition__scale-over--enter-done"){
            console.log(mutationList);
            let redemptionTitle = mutation.target.children[0].children[1].children[0].children[0].children[0].children[0].textContent;
            console.log(redemptionTitle);
            getEffectsList(redemptionTitle);
                //Request Effects List
                // let effectsList = getEffectsList()
                // console.log("EffectsListRes", effectsList);
                // if (effectsList != null) {
                //     effectsList.every((effect) => {
                //         if (effect == redemptionTitle) {
                //             console.log("Effect Matches");
                //             // socket.emit('redemption', redemptionTitle);
                //         }
                //     })
                // } else {
                //     console.log("List Request Denied or Error");
                //     //Reject redemption
                //     //...
                // }
                //Reject if effect is disabled
                //If enabled, send message to server to trigger effect
                //on success response, accept redemption
        }
    }
}

//Requests list of effects from server.
function getEffectsList(redemptionTitle){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/events", true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // return xhr.responseText
                let effectsList = JSON.parse(xhr.responseText);
                if (effectsList != null) {
                    effectsList.forEach((effect) => {
                        if (effect == redemptionTitle) {
                            console.log("Effect Matches");
                            let xhr1 = new XMLHttpRequest();
                            xhr1.open("POST", "http://localhost:3000/events/redeem", true);
                            
                            //Send the proper header information along with the request
                            xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                            xhr1.onreadystatechange = function() { // Call a function when the state changes.
                                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                    // Request finished. Do processing here.
                                }
                            }
                            xhr1.send(`redemption=${redemptionTitle}`);
                            return;
                        }
                    })
                    console.log("No Match");
                    return
                } else {
                    console.log("List Request Denied");
                    //Reject redemption
                    //...
                }
            } else {
                console.error(xhr.statusText);
                return null;
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null); 

}