require.register("templates/play/menu/options-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,music = locals_.music,aceConfig = locals_.aceConfig;buf.push("<div id=\"player-avatar-container\" title=\"Click to change your avatar\">");
if ( !me.get('photoURL'))
{
buf.push("<div class=\"editable-icon glyphicon glyphicon-pencil\"></div>");
}
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(230)), 'draggable':("false"), "class": [('profile-photo')] }, {"src":true,"draggable":true})) + "/><div class=\"form-group\"><input" + (jade.attrs({ 'id':('player-name'), 'name':("playerName"), 'type':("text"), 'value':(me.get('name', true)), "class": [('profile-caption')] }, {"name":true,"type":true,"value":true})) + "/></div></div><div class=\"form\"><h3 data-i18n=\"options.general_options\">General Options</h3><div id=\"volume-group\" class=\"form-group slider-group\"><span class=\"glyphicon glyphicon-volume-down\"></span><div id=\"option-volume\" class=\"slider spr spl\"></div><span class=\"glyphicon glyphicon-volume-up\"></span></div><div class=\"form-group checkbox\"><label for=\"option-music\" class=\"control-label\"><input" + (jade.attrs({ 'id':('option-music'), 'name':("option-music"), 'type':("checkbox"), 'checked':(music) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.music_label\">Music</span></label><span data-i18n=\"options.music_description\" class=\"help-block\">Turn background music on/off.</span></div><img src=\"/images/pages/play/modal/hr.png\" draggable=\"false\" class=\"hr\"/><h3 data-i18n=\"options.editor_config_title\">Editor Configuration</h3><div class=\"form-group checkbox\"><label for=\"option-live-completion\"><input" + (jade.attrs({ 'id':('option-live-completion'), 'name':("liveCompletion"), 'type':("checkbox"), 'checked':(aceConfig.liveCompletion) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_livecompletion_label\">Live Autocompletion</span></label><span data-i18n=\"options.editor_config_livecompletion_description\" class=\"help-block\">Displays autocomplete suggestions while typing.</span></div><div class=\"form-group checkbox\"><label for=\"option-invisibles\"><input" + (jade.attrs({ 'id':('option-invisibles'), 'name':("invisibles"), 'type':("checkbox"), 'checked':(aceConfig.invisibles) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_invisibles_label\">Show Invisibles</span></label><span data-i18n=\"options.editor_config_invisibles_description\" class=\"help-block\">Displays invisibles such as spaces or tabs.</span></div><div class=\"form-group checkbox\"><label for=\"option-indent-guides\"><input" + (jade.attrs({ 'id':('option-indent-guides'), 'name':("indentGuides"), 'type':("checkbox"), 'checked':(aceConfig.indentGuides) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_indentguides_label\">Show Indent Guides</span></label><span data-i18n=\"options.editor_config_indentguides_description\" class=\"help-block\">Displays vertical lines to see indentation better.</span></div><div class=\"form-group checkbox\"><label for=\"option-behaviors\"><input" + (jade.attrs({ 'id':('option-behaviors'), 'name':("behaviors"), 'type':("checkbox"), 'checked':(aceConfig.behaviors) }, {"name":true,"type":true,"checked":true})) + "/><span class=\"custom-checkbox\"><div class=\"glyphicon glyphicon-ok\"></div></span><span data-i18n=\"options.editor_config_behaviors_label\">Smart Behaviors</span></label><span data-i18n=\"options.editor_config_behaviors_description\" class=\"help-block\">Autocompletes brackets, braces, and quotes.</span></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/menu/options-view.js.map