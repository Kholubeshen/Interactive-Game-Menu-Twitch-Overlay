function roll(channel , tags, client){
    result = rollD20();
    switch(result){
        default:
            client.say(channel, `${tags.username} rolled a ${result} and accidentally stabbed themselves in the eye. ` +
            `Respawning in 10 seconds.`);

            client.timeout(channel, tags.username, 1).then(function(data){
                console.log("data" + data[2]);
            }).catch(function(err){

            });
            break;
    }
}

function rollD20() {
    const sides = 20;
    return Math.floor(Math.random() * sides) + 1;
}
module.exports = roll;