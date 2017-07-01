require.register("templates/editor/level/thangs-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button id=\"thangs-container-toggle\" class=\"btn\"><span class=\"icon-list\"></span></button><button id=\"thangs-palette-toggle\" class=\"btn\"><span class=\"icon-plus\"></span></button><div id=\"all-thangs\" class=\"thangs-container hide\"><h3 data-i18n=\"editor.level_tab_thangs_title\">Current Thangs</h3><div id=\"thangs-treema\" data-i18n=\"[title]editor.config_thang\" title=\"Double click to configure a thang\"></div></div><div class=\"world-container\"><div id=\"canvas-wrapper\"><button data-toggle=\"coco-modal\" data-target=\"editor/level/modals/GenerateTerrainModal\" data-i18n=\"editor.generate_terrain\" class=\"generate-terrain-button btn btn-info btn-lg\">Generate Terrain</button><ul id=\"contextmenu\" class=\"dropdown-menu\"><li id=\"delete\"><a data-i18n=\"editor.delete\">Delete</a></li><li id=\"duplicate\"><a data-i18n=\"editor.duplicate\">Duplicate</a></li><li class=\"divider\"></li><li id=\"rotation-menu-item\" class=\"dropdown-header\"><span data-i18n=\"editor.rotate\" class=\"spr\">Rotate</span><button data-rotation=\"-0.5\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-up\"></span></button><button data-rotation=\"1\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-left\"></span></button><button data-rotation=\"0\" class=\"btn btn-xs spr\"><span class=\"glyphicon glyphicon-arrow-right\"></span></button><button data-rotation=\"0.5\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-arrow-down\"></span></button></li></ul><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas><div id=\"canvas-left-gradient\" class=\"gradient\"></div><div id=\"canvas-top-gradient\" class=\"gradient\"></div></div></div><div id=\"add-thangs-view\"></div><div id=\"level-thang-edit-view\" class=\"secret\"></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=/javascripts/app/templates/editor/level/thangs-tab-view.js.map