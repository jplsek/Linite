Linite
======

You can view it here: [http://jplsek.github.io/Linite/](http://jplsek.github.io/Linite/)

This is meant to be similar to the free version of [Ninite](https://ninite.com/), except to create just a simple script to run.
As if current package managers aren't easy enough, this will stream line the process even more (specifically for those distro-hoppers ;) ).

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

## Note to developers

* When using this without a web server:
	* Due to a security feature in chromium / google chrome, this doesn't work.
	* Firefox gives a warning saying the json has a "syntax error", when it seems correct.


Stucture:
```javascript
[{  // start of array of categories
    "Graphics": { // category name and start of apps array
        "krita": { // apps "id"
            "icon":"krita.jpg", // icon
            "name":"Krita",	    // friendly name
            "program":"krita"   // package name
        }
    }
}]

## Possible future features

* PPA support
* Generate sources.list's
* AUR support
* The fedora third party one
* Detect distribution to auto select initial options (the default would be Ubuntu because of larger market share / targeted audience)

## Other

* Contribute/Pull if you want.
* This web application was started in CodeDay Boston, Spring 2015.
* This uses the MIT License (MIT).