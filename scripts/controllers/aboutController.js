"use strict";

angular.module('upl-site').
    controller('AboutController', ['$scope', function ($scope) {
        $(".para h2").on("mouseenter", function(e) {
            $(e.target).find("span").css("display", "inline");
        });
        $(".para h2").on("mouseleave", function(e) {
            $(e.target).find("span").css("display", "none");
        });
        $(".para").on("click", function(e) {
            var p = $(e.target).parent();
            var para = p.find(".para-hidden");
            var expand = p.find(".para-expand");
            if (para.css("display") === "none") {
                para.css("display", "block");
                expand.css("display", "none");
            } else {
                para.css("display", "none");
                expand.css("display", "inline");
            }
        });
    }]);
