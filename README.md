## Introduction

A mobile application to assist women and their loved ones deal with the mentality during pregnancy, and actively engage in the journey of pregnancy in a memorable way.

Built with [React Native](https://github.com/facebook/react-native), [Mobx](https://github.com/mobxjs/mobx), [Firebase](https://firebase.google.com/) via [react-native-firebase](https://github.com/invertase/react-native-firebase), [Expo](https://docs.expo.io/versions/latest/)

## Get Started

### Prerequisites

* XCode

### Installation / Running dev

* Install javascript dependencies: `npm install`
* Install CocoaPods: `cd ios && pod install`
* Start development server: `cd .. && npm run start` or `npm run start`
* Display running app (2 options):
    * On simulator: go to Xcode and run build
    * On device: use Expo Client on your physical device 

## Status

### General

* Only support / setup some core dependencies (Firebase,...) for IOS at the moment
* WIP
* Firebase services (Storage, Realtime Database, Auth) via [react-native-firebase](https://github.com/invertase/react-native-firebase)
* Make use of [Expo API](https://docs.expo.io/versions/latest/) (Sound, Video, FileSystem,...)

### Features (up-to-date)

* Authentication (login, logout). Register yet to be implemented.
* Daily question to keep track of pregnancy status (skippable)
* Data visualization based on data from daily questions' answers
* Test data in Firebase database
* Organize and manage project-specific assets. Storage setup for project's static data (media, text, ...)
* Sessions / Informative lecture for each week of pregnancy:
    * Some text about general information for the week
    * Audio available to play along the text
    * Exercises / Reflection for user in session is yet to be implemented

### Other features in the future (plans)

* Chat / Messaging
* Social network approach
* Groups to connects users of the same category / progress / issues
* Questions and Answers
* Videos playing
* Personal postings (diary notes, recordings, ...)
