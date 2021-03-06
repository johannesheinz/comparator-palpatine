# Comparator Palpatine

[![CI](https://github.com/johannesheinz/comparator-palpatine/actions/workflows/ci.yml/badge.svg)](https://github.com/johannesheinz/comparator-palpatine/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/johannesheinz/comparator-palpatine)](https://github.com/johannesheinz/comparator-palpatine/blob/main/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/johannesheinz/comparator-palpatine)](https://github.com/johannesheinz/comparator-palpatine/blob/main/package.json)

[![Start Comparison](./launch.png)](https://johannesheinz.github.io/comparator-palpatine)

![Imperator Palpatine](https://qph.fs.quoracdn.net/main-qimg-c2142df94f85fe4a51e4853e36e6f26b-lq "Imperator Palpatine")

This is an Angular web app that extracts all GitHub URLs from a given blob of text and displays all relevant info in a sortable table.

---

## Shortcuts

1. Visit the web app, the input is automatically focussed
2. Paste your URLs wiht `[Ctrl] + [V]` (or whatever your OS specifies)
3. Press the `[Enter]` / `[Return]` key to to preceed with the information extraction
4. Or press `[Esc]` to reset the input form

## Quality of live features

* Duplicate repositories are removed
* The inital order of the input is kept in the table
* The columns are configured to offer the most helpful sort direction on the first click
* You can highlight interesting rows by clicking anywhere (except the first column). This hightlight is kept even when you change sorting. It can be removed by clicking again
* The first column takes you to the GitHub page

## Caveats

Due to API limitations, ...

* requests are currently limited to 99 repositories
* the `contributors` column is not really the contributors but an approximation
* The initial sort of the table is lost once it is sorted in any way
* The only way back from the table to the input is the navigation at the top right

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

## My custom scripts

Using a Makefile

```bash
# Local watching development server on port 4444
make serve

# Test using Chromium
make test
```
