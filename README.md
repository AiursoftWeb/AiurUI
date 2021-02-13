# AiurUI

[![Build status](https://dev.azure.com/aiursoft/Star/_apis/build/status/AiurUI%20Build)](https://dev.azure.com/aiursoft/Star/_build/latest?definitionId=2)
[![Website](https://img.shields.io/website?url=https%3A%2F%ui.aiursoft.com%2F)](https://ui.aiursoft.com)

The place for shared static resources of Aiursoft web apps

## How to run

Install [nodejs and npm](https://nodejs.org) first.

```bash
npm install
npm start
```

### Install on a server

Execute the following command on the server(A brand new Ubuntu 16.04+):

```bash
$ curl -sL https://github.com/AiursoftWeb/AiurUI/raw/master/install.sh | sudo bash -s ui.example.com
```

Execute the following command on the server to upgrade an existing installation.

```bash
$ curl -sL https://github.com/AiursoftWeb/AiurUI/raw/master/upgrade.sh | sudo bash
```

## Components

### AiurCore

AiurCore is for all Aiursoft apps. This contains some basic tools for Aiursoft front-end programs.

* jQuery
* Popper
* Bootstrap
* Font-awesome
* Dropify
* jquery.validate.js
* jquery.validate.unobtrusive.js
* Clipboard
* jquery-disable-with
* AiurCore

### AiurMarket

AiurMarket is for Aiursoft home pages. This will create beautiful landing page.

* AiurMarket

### AiurProduct

AiurProduct is for Aiursoft download pages.

* Primer
* AiurProduct

### AiurDashboard

AiurDashboard is for Aiursoft dashboard pages.

* SB-Admin
* Datatable
* primer-markdown

## What is the relationship with other Aiursoft apps

All Aiursoft web applications with view shall put all those static files, like stylesheets or js files on our CDN server.

Users can get those files directly from our CDN server.

## How to contribute

There are many ways to contribute to the project: logging bugs, submitting pull requests, reporting issues, and creating suggestions.

Even if you have push rights on the repository, you should create a personal fork and create feature branches there when you need them. This keeps the main repository clean and your personal workflow cruft out of sight.

We're also interested in your feedback for the future of this project. You can submit a suggestion or feature request through the issue tracker. To make this process more effective, we're asking that these include more information to help define them more clearly.
