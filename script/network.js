


function initNetwork(name) {

    var scaledroneScript = document.createElement('script');
    scaledroneScript.setAttribute('src','https://cdn.scaledrone.com/scaledrone.min.js');
    scaledroneScript.onload = function() {
        
        var clientId = 'Ywr2H8MvOBZDXjFS';
        
        drone = new ScaleDrone(clientId, {
            data: {
                name: name,
                color: getRandomColor(),
            },
        });
        
        drone.on('open', error => {
            
            if (error) {
                return console.error(error);
            }
            console.log('Successfully connected to Scaledrone');

            const room = drone.subscribe('observable-room');
            room.on('open', error => {
                if (error) {
                    return console.error(error);
                }
                console.log('Successfully joined ScaleDrone room');
            });

            room.on('members', m => {
                // members = m;
                // updateMembersDOM();
            });

            room.on('member_join', member => {
                // members.push(member);
                // updateMembersDOM();
            });

            room.on('member_leave', ({id}) => {
                // const index = members.findIndex(member => member.id === id);
                // members.splice(index, 1);
                // updateMembersDOM();
            });

            room.on('data', (text, member) => {
                if (member) {
                    //addMessageToListDOM(text, member);
                    console.log("Message", { text: text, member: member });
                } else {
                    // Message is from server
                }
            });
        });
        
        drone.on('close', event => {
            console.log('Connection was closed', event);
        });

        drone.on('error', error => {
            console.error(error);
        });
    }
    document.body.appendChild(scaledroneScript);
}


