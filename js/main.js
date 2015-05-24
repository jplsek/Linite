// Main js file.

// All info
var apps = null;

// Generated info
var distro = null;
var appList = [];

// load apps.json, with a deferred object.
// seems to not work properly in chrom*
// loading the file in firefox gives "not well-formed", for valid json.
function getapps(d1) {

    var json = null;

    $.ajax({

        'url': "js/apps.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }

    }).done(function() {
        apps = json;
        d1.resolve(json);
    });
}

// run this after the apps.json is loaded
function main() {
    console.log(apps);
}

function addDistro() {
    $("#apps").empty();
    if (distro == "debian")
        $("#apps").append("sudo apt-get install ");
    if (distro == "fedora")
        $("#apps").append("sudo yum install ");
}

function appendAppList() {
    console.log("test");
    addDistro();
    for (app in appList) {
        console.log(app);
        $("#apps").append(appList[app] + " ");
    }
}

$(document).ready(function() {
    var d1 = $.Deferred();
    getapps(d1);

    $.when(d1).done(function() {
        main();
    });
});

// assuming apps is generated
// generates the application picker
$("#distro-choice input").click(function() {

    // remove all elements in app-choice before generating
    $("#app-choice").empty();

    distro = this.value

    console.log("Distro: " + distro);

    addDistro();

    var types = [];

    console.log("Categories: " + apps.global.length);

    // generate the categories
    for (var i = 0; i < apps.global.length; i++) {

        var typeG = apps.global[i]; 
        var typeD = apps[distro][i];
        types.push($.extend(true, typeG, typeD));
        //console.log(obj[distro]);
    }

    //var test = apps.global[0].browsers[0].name;
    //console.log(test);

    console.log(types); 

    // need to optimize this...
    // 0. selects 1st array
    $.each(types, function (array, category) {
        // 1. selects category
        $.each(category, function (categoryName, subObject) {
            console.log(categoryName);
            html = "<div class=\"category\"><h4>" + categoryName + "</h4>";
            // 2. selects 1st array item
            $.each(subObject, function (array, subObject) {
                //console.log("2: " + subI + "=" + subObject);
                // 3. selects app
                $.each(subObject, function (uniqueName, subObject) {
                    //console.log("3: " + subI + "=" + subObject);
                    var appName = null;
                    var appIcon = null;
                    var appProg = null;
                    // 4. selects app values
                    $.each(subObject, function (name, value) {
                        console.log("4: " + name + "=" + value);

                        switch(name) {
                            case "name":
                                appName = value;
                                break;
                            case "icon":
                                appImg = value;
                                break;
                            case "program":
                                appProg = value;
                                break;
                        }
                    });

                    html += "<label><input type=\"checkbox\" name=\"appProg\" value=\"" + appProg + "\"> ";
                    html += "<img src=\"img/" + appImg + "\" alt=\"\">";
                    html += "<span>" + appName + "</span></label>";
                });
            });

            html += "</div>";
            $("#app-choice").append(html);
        });
    });
});

$("body").on("click", ".category input", function(){

    appList = [];

    $("input[name='appProg']").each(function() {

        if ($(this).is(":checked")) {
            console.log(this.value);
            appList.push(this.value);
        }
    });

    console.log(appList);
    appendAppList();
});
