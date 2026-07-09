# OverkappingVandaag.nl

Responsieve, statische landingspagina voor OverkappingVandaag.nl.

## Lokaal bekijken

Open `index.html` direct in een browser of start vanuit deze map een eenvoudige
lokale webserver:

```sh
python3 -m http.server 4173
```

De pagina is daarna bereikbaar via `http://localhost:4173`.

## Formulier activeren

Maak een formulier aan bij Formspree en vervang in `index.html`:

```text
https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID
```

door de toegewezen Formspree-URL. Zolang de placeholder aanwezig is, verstuurt
de website geen persoonsgegevens en verschijnt er een duidelijke melding.
