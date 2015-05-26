// Main js file.

// global app information
var global = null;

var selectedDistro = null;

// load apps.json, with a deferred object.
function getapps(d1, distro) {

    addDistro(distro);

    var json = null;
    var file = "distro/" + distro + ".json";

    console.log("Getting file " + file);

    $.ajax({

        "url": file,
        "dataType": "json",
        "success": function (data) {
            json = data;
        }

    }).done(function() {
        d1.resolve(json);
    });
}

// set up package manager here.
function addDistro(distro) {

    var option = "";

    $("#apps").empty();

    if ($("input[name='yes']").is(':checked')) {

        switch(distro) {
            case "ubuntu":
            case "debian":
            case "fedora":
                option += " -y";
                break;

            case "arch":
                option += " --noconfirm";
                break;

            case "global":
                break;

            default:
                console.log("Distro: " + distro + " not supported, please implement if possible.");
                break;
        }
    }

    switch(distro) {
        case "ubuntu":
        case "debian":
            $("#apps").append("sudo apt-get install" + option);
            break;

        case "fedora":
            $("#apps").append("sudo yum install" + option);
            break;

        case "arch":
            $("#apps").append("sudo pacman -S" + option);
            break;

        case "global":
            break;

        default:
            console.log("Distro: " + distro + " not supported, please implement.");
            break;
    }
}

// generates the category list, apps referes to a json
function distroSelect(distro) {

    selectedDistro = distro;

    var d = $.Deferred();
    getapps(d, distro);

    $.when(d).done(function(apps) {

        console.log("done getting distro: " + distro + ", generating apps");

        // remove all elements in app-choice before generating
        $("#app-choice").empty();

        var types = [];

        // generate the categories
        for (var i = 0; i < global.length; i++) {

            var categoryGlobal = global[i]; 
            var categoryDistro = apps[i];
            types.push($.extend(true, categoryGlobal, categoryDistro));
        }

        //console.log(types); 

        // 0. selects 1st array
        $.each(types, function (array, category) {
            // 1. selects category
            $.each(category, function (categoryName, application) {
                //console.log(categoryName);
                html = "<div class=\"category col-xs-12 col-sm-3 col-lg-2\"><h4>" + categoryName + "</h4>";
                // 2. selects app
                $.each(application, function (appName, applicationDetails) {
                    //console.log("2: " + appName + "=" + subObject);
                    var appIcon = null;
                    var appProg = null;
                    // 3. selects app values
                    $.each(applicationDetails, function (name, value) {
                        //console.log("3: " + name + "=" + value);

                        switch(name) {
                            case "icon":
                                appIcon = value;
                                break;
                            case "program":
                                appProg = value;
                                break;
                        }
                    });

                    html += "<label><input type=\"checkbox\" name=\"appProg\" value=\"" + appProg + "\"> ";
                    html += "<img src=\"img/" + appIcon + "\" alt=\"\" onerror='this.style.display = \"none\"'>";
                    html += "<span>" + appName + "</span></label><br>";
                });

                html += "</div>";
                $("#app-choice").append(html);
            });
        });
    });
}

function appendAppList(appList) {
    addDistro(selectedDistro);

    for (app in appList) {
        //console.log(app);
        $("#apps").append(" " + appList[app]);
    }
}

function updateAppArea() {

    var appList = [];

    $("input[name='appProg']").each(function() {

        if ($(this).is(":checked")) {
            //console.log(this.value);
            appList.push(this.value);
        }
    });

    //console.log(appList);
    appendAppList(appList);
}

$(document).ready(function() {

    // select ubuntu radio in case it's cached, may change later
    $("#ubuntu-select").prop("checked", true); 

    // generate the global first
    var d = $.Deferred();
    getapps(d, "global");

    $.when(d).done(function(globalapps) {
        
        console.log("done getting global");
        global = globalapps;
        distroSelect("ubuntu");
    });

});

// generates the application picker
$("#distro-choice input").click(function() {
    distroSelect(this.value);
});

// adds the app to the textarea
$("body").on("click", ".category input", function() {
    updateAppArea();
});

$("body").on("click", "input[name='yes']", function() {
    updateAppArea();
})

// highlights the textarea
$("#apps").click(function() {
    this.select();
})