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

    var optionAppend = "";
    var optionPrepend = "";

    // show update input in case it was hidden by the fedora option
    $("input[name='update']").parent().show();

    $("#apps").empty();

    if ($("input[name='update']").is(':checked')) {

        switch(distro) {

            case "ubuntu":
            case "debian":
                optionPrepend += "sudo apt-get update && ";
                break;

            case "fedora":
                $("input[name='update']").parent().hide();
                break;

            case "arch":
                optionAppend += "y";
                break;

            case "global":
                break;

            default:
                console.log("Distro: " + distro + " not supported, please implement if possible.");
                break;
        }
    }

    if ($("input[name='yes']").is(':checked')) {

        switch(distro) {
            case "ubuntu":
            case "debian":
            case "fedora":
                optionAppend += " -y";
                break;

            case "arch":
                optionAppend += " --noconfirm";
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
            $("#apps").append(optionPrepend + "sudo apt-get install" + optionAppend);
            break;

        case "fedora":
            $("#apps").append(optionPrepend + "sudo yum install" + optionAppend);
            break;

        case "arch":
            $("#apps").append(optionPrepend + "sudo pacman -S" + optionAppend);
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
            // note: categoryDistro ALSO becomes extended
            types.push($.extend(true, categoryDistro, categoryGlobal));
        }

        //console.log(global); 
        //console.log(types); 

        // 0. selects 1st array
        $.each(types, function (array, category) {
            // 1. selects category
            $.each(category, function (categoryName, application) {
                //console.log(categoryName);
                html = "<div class=\"category col-xs-12 col-sm\"><h4>" + categoryName + "</h4>";
                // 2. selects app
                $.each(application, function (appName, applicationDetails) {
                    //console.log("2: " + appName + "=" + subObject);
                    var appIcon = null;
                    var appProg = null;
                    var appWarn = null;
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

                            case "warning":
                                appWarn = value;
                                break;
                        }
                    });

                    html += "<div class=\"row\"><label class=\"col-xs-12\">";
                    html += "<input type=\"checkbox\" name=\"appProg\" value=\"" + appProg + "\"> ";
                    html += "<img src=\"img/" + appIcon + "\" alt=\"\" onerror='this.style.display = \"none\"'>";
                    html += "<span>" + appName + "</span>";

                    if (appWarn != null) {
                        html += " <span class=\"badge orange-bg\" title=\"" + appWarn + "\">!</span>";
                    }

                    html += "</label></div>";
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
});

$("body").on("click", "input[name='update']", function() {
    updateAppArea();
});

// highlights the textarea
$("#apps").click(function() {
    this.select();
})
