Linite
======

This web-application will be started on CodeDay, Spring 2015.

This is meant to be similar to the free version of [Ninite](https://ninite.com/), except to create just a simple script to run.
As if current package managers aren't easy enough, this will stream line the process even more (specifically for those distro-hoppers ;) ).

I will be working on this when my partners don't need me to work on stuff for them. This project shouldn't take too long, which is why it will be a side project on CodeDay itself.
(In case you're wondering, they are making a wallpaper generator. I will be creating an (optional) interface for them, while they create the backend.)

## Plan

1. Options to choose distribution.
    * This is used to set the package manager. (yum, apt-get, pacman, etc)
    * Could also allow the user to choose a different package manager, such as aptitude, but keep apt-get default
2. Options to choose application.
    * This will contain the predetermined apps. (firefox, chromium, vlc, libreoffice, etc)
    * Later: There can be a "top voted" application section that will have the highest rated user apps to show, not incuding the ones already shown.
3. (in real time) Generate script.
    * Script will be highlighted to allow copying with ctrl+c. (No Flash will be used for an easy "copy" button.)
    * There will be an option to save the script.
    * Could also put a "yes" check box to add, for example "-y" to apt-get.

## Possible future features

* PPA support
* Generate sources.list's
* AUR support
* The fedora third party one
* Detect distribution to auto select initial options (the default would be Ubuntu because of larger market share / targeted audience)

## Other

* Ninite for Linux did exist in the past. They currently don't want to support it for obvious reasons. (aka package management in Linux is easy enough, and their business model if pretty much a package manager for Windows.)
* Someone else has probably done this same exact thing.
* If you're on Windows, and want a "package manager" that isn't Ninite, check out chocolatey, it's free.
* Contribute if you want.
