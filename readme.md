Linite
======

This web-application will be started on CodeDay, Spring 2015.

This is meant to be similar to the free version of [Ninite](https://ninite.com/), except to create just a simple script to run.
As if current package managers aren't easy enough, this will stream line the process even more (specifically for those distro-hoppers ;) ).

I will be working on this when my partners don't need me to work on stuff for them. This project shouldn't take too long, which is why it will be a side project on CodeDay itself.
(In case you're wondering, they are making a wallpaper generator. I will be creating an (optional) interface for them, while they create the backend.)

# NOTE 
This readme (the init commit) was written BEFORE CodeDay, and parts of it (plan, script layout, etc) might be removed after all of this is implemented.

## Plan

I will probably use bootstrap as a quick layout setup, and change it as I need to.

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

## Possible script layout

* A global application list, where the application is the same across all distributions. 
* A distribution application list, where the application name is different across distributions.
For example:
```javascript
{
    "global": {
        "browsers": {
            "name":"Web Browser",
            "chromium": {
                "name":"Chromium",
                "package":"chromium-browser",
                "icon":"chromium.jpg",
            },
        },
        "programming": {
            "name":"Programming Tools",
            "pyton3-dev": {
                "name":"Python 3 Development",
                "icon":"python.jpg",
            },
        },
    },
    "debian":{
        "browsers": {},
        "programming": {
            "python3-dev": {
                "package":"python3-dev",
            },
    },
    "fedora":{
        "browsers": {},
        "programming": {
            "python3-dev": {
                "package":"python3-devel",
            },
        },
    },
}
```

Choosing "Debian" from the interface list will generate the list from the "global" and "debian" arrays.
For example:
```javascript
$("#distro-choice").click(function() {
    // hopefully this loop will work like I'm thinking
    for category in json.global {
        types[] = $.extend(true, category, json.this.value[i]); // this is assuming that the categories will be in the same order
        i++;
    }
    for type in types[] {
        // do thing here to generate the list
        // similar to ninite: categories are bolded, apps underneath category, maybe after every 2 categories, make a new column
    }
});
```

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
