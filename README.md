## Introduction

A mobile application to assist women and their loved ones deal with the mentality during pregnancy, and actively engage in the journey of pregnancy.

Built with [React Native](https://github.com/facebook/react-native), [Mobx](https://github.com/mobxjs/mobx), [Firebase](https://firebase.google.com/) via [react-native-firebase](https://github.com/invertase/react-native-firebase), [Expo](https://docs.expo.io/versions/latest/)

## Preview

<img alt="Login Screen" width="250" src="https://i.imgur.com/Uzyu5yg.png" align="left">
<img alt="Register Screen" width="250" src="https://i.imgur.com/jlQAdNy.png" align="left">
<img alt="Daily Question Screen" width="250" src="https://i.imgur.com/G8wWhxX.png" align="left">
<img alt="Home/Journey Screen" width="250" src="https://i.imgur.com/bRswzHH.png" align="left">
<img alt="User Question Screen" width="250" src="https://i.imgur.com/HNZrvvP.png" align="left">
<img alt="Session Screen" width="250" src="https://i.imgur.com/pROCHmX.png" align="left">

<br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br>

## Get Started

### Prerequisites

* XCode

### Installation / Running dev

* Install javascript dependencies: `npm install`
* Install CocoaPods: `cd ios && pod install`
* Start development server: `cd .. && npm run start` or `npm run start`
* Display running app (2 options):
    * On simulator: go to Xcode and run build
    * On device: use Expo Client on your physical device / connect device via Xcode

## Status

### General

* Only support / setup some core dependencies (Firebase,...) for IOS at the moment
* WIP
* Firebase services (Storage, Realtime Database, Auth) via [react-native-firebase](https://github.com/invertase/react-native-firebase)
* Make use of [Expo API](https://docs.expo.io/versions/latest/) (Sound, Video, FileSystem,...)

### Features (up-to-date)

* Authentication (login, logout). Register yet to be implemented.
* Daily question to keep track of pregnancy status (skippable)
* User groups
* Questions and answers. Admin interface for answering users' questions
* Profile page and according settings
* Data visualization based on data from daily questions' answers
* Test data in Firebase database
* Organize and manage project-specific assets. Storage setup for project's static data (media, text, ...)
* Sessions / Informative lecture for each week of pregnancy:
    * Some text about general information for the week
    * Audio available to play along the text
    * Exercise section is yet to be implemented. Only text at the moment
    * Recording audio and upload for diary and session reflection

### Other features in the future (plans) / Current features further improvement

* Chat / Messaging
* Social network approach
* Questions and Answers
* Videos playing
* Personal postings (diary notes, recordings, ...)

### Further development

* Tests and CI/CD pipeline
* Code linting, hooks, ... other configuration
* Build and upload to store