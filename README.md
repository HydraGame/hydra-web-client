# Hydra web client

## Architecture

```mermaid
graph TD;
    GameServer-->Redis;
    Redis<--WebsocketServer;
    WebsocketServer<-->WebClient;
```

## Installation instructions

Start a websocket server on port 8081.
This is required to send data to the web client to render the planets.
