Linite
======

You can view it here: [http://jplsek.github.io/Linite/](https://jplsek.github.io/Linite/)

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
    "Graphics": {  // category name and start of apps array
        "Krita": { // app friendly name
            "program":"krita",  // package name
            "icon":"krita.jpg", // icon (optional)
            "description":"Digital painting and illustration.", // description (optional)
            "url":"https://krita.org/" // url of their website (optional) (not used yet)
        }
    }
}
```

## Todo
* Add descriptions for apps
* Add urls for apps
* Other distros (gentoo?)
* More apps
* Remember selected items between distro selection switching

## Possible future features

* PPA support
* Generate sources.list's
* AUR support

## Other

* Contribute/Pull if you want.
* This web application was started in CodeDay Boston, Spring 2015.
* This uses the MIT License (MIT).
