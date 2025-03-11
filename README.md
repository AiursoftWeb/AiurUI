# AiurUI

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitlab.aiursoft.cn/aiursoft/aiurui/-/blob/master/LICENSE)
[![Pipeline stat](https://gitlab.aiursoft.cn/aiursoft/aiurui/badges/master/pipeline.svg)](https://gitlab.aiursoft.cn/aiursoft/aiurui/-/pipelines)
[![ManHours](https://manhours.aiursoft.cn/r/gitlab.aiursoft.cn/aiursoft/aiurui.svg)](https://gitlab.aiursoft.cn/aiursoft/aiurui/-/commits/master?ref_type=heads)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fui.aiursoft.cn)](https://ui.aiursoft.cn)
[![Docker](https://img.shields.io/docker/pulls/aiursoft/aiurui.svg)](https://hub.docker.com/r/aiursoft/aiurui)

The place for shared static resources of Aiursoft web apps

## How to run

Install [nodejs and npm](https://nodejs.org) first.

```bash
npm install
npm start
```

## Run in Docker

First, install Docker [here](https://docs.docker.com/get-docker/).

Then run the following commands in a Linux shell:

```bash
image=aiursoft/aiurui
appName=aiurui
sudo docker pull $image
sudo docker run -d --name $appName --restart unless-stopped -p 5000:5000 $image
```

That will start a web server at `http://localhost:5000` and you can test the app.

The docker image has the following context:

| Properties  | Value                                  |
|-------------|----------------------------------------|
| Image       | aiursoft/aiurui                        |
| Ports       | 5000                                   |
| Binary path | /app                                   |

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
