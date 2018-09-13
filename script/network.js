


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
                
                emitEvent("agents", {
                    head: '',
                    body: m.map(member => member.clientData.name)
                });
            });

            room.on('member_join', member => {
                
                emitEvent("agent-join", member.clientData.name);
            });

            room.on('member_leave', member => {

                emitEvent("agent-leave", member.clientData.name);
            });

            room.on('data', (text, member) => {

                let msg = false;
                try { msg = parser.parse(text); } catch(e) {}
                emitEvent("inbox", {
                    head: {
                        head: 'message',
                        body: member ? member.clientData.name : ''
                    },
                    body: msg || [text]
                });
            });
        });
        
        drone.on('close', event => {
            emitEvent("connection-closed", '');
            console.log('Connection was closed', event);
        });

        drone.on('error', error => {
            emitEvent("network-error", error.message);
            console.error(error);
        });
    }
    document.body.appendChild(scaledroneScript);
}


