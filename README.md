# Kleerweer (web-app)

Zegt elke ochtend wat je aantrekt, en wanneer een laagje uit of aan kan.

## Wat erin zit
- `index.html`: de hele app (opmaak, tekeningen en logica in één bestand)
- `manifest.webmanifest` en `icons/`: zodat je hem op je beginscherm kunt zetten
- `sw.js`: laat de app ook zonder verbinding openen, met het laatst opgehaalde weer

## Op je iPhone zetten
Open de link in Safari, tik op Delen en kies "Zet op beginscherm".

## Goed om te weten
- Weerdata komt van Open-Meteo. Gratis voor niet-commercieel gebruik; ga je geld verdienen, dan heb je een betaald abonnement nodig.
- Er is geen tracking. Je plaats en poppetje worden alleen op je eigen telefoon bewaard.
- De outfit-check zit er bewust nog niet in.
- Nieuwe versie uploaden? Verhoog dan `kleerweer-v1` in `sw.js` naar `v2`, anders zien mensen de oude versie.
