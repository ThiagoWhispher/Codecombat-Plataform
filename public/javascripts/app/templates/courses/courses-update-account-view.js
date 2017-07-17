require.register("templates/courses/courses-update-account-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li><li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
};
buf.push("<div class=\"style-flat\"><nav id=\"main-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"navbar-header\"><button data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\"><span data-i18n=\"nav.toggle_nav\" class=\"sr-only\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">");
if ( serverConfig.codeNinjas)
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\" class=\"code-ninjas-powered-by\"/><img src=\"/images/pages/base/code-ninjas-logo-right.png\" class=\"code-ninjas-logo\"/>");
}
else
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\"/>");
}
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
if ( (!me.isStudent() && !me.isTeacher()))
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li>");
}
buf.push("<li><a href=\"play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
buf.push("<li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li></ul>");
if ( me.isAnonymous())
{
buf.push("<ul class=\"nav navbar-nav\"><li><a id=\"create-account-link\" data-i18n=\"login.sign_up\" class=\"signup-button\"></a></li><li><a id=\"login-link\" data-i18n=\"login.log_in\" class=\"login-button\"></a></li></ul>");
}
else
{
buf.push("<ul class=\"nav navbar-nav hidden-md hidden-lg\"><li class=\"disabled\"><a><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = me.displayName()) ? "" : jade.interp)) + "</span></a></li>");
accountLinks_mixin();
buf.push("</ul><ul class=\"nav navbar-nav\"><li class=\"dropdown hidden-xs hidden-sm\"><a href=\"#\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle\"><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span data-i18n=\"nav.my_account\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-dropdown-header text-center\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/></a><h5>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h5></li>");
accountLinks_mixin();
buf.push("</ul></li></ul>");
}
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div id=\"main-content\" class=\"container\"><div class=\"row m-y-3\"><div class=\"col-xs-12\">");
if ( me.isAnonymous())
{
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.update_account_login_title\"></h3><p data-i18n=\"courses.update_account_blurb\"></p><p><button data-i18n=\"login.log_in\" class=\"login-btn btn btn-navy\"></button></p></div>");
}
if ( !me.isAnonymous())
{
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.update_account_title\"></h3><p data-i18n=\"courses.update_account_blurb\"></p></div><div class=\"row\"><div class=\"col-md-6\"><div class=\"text-right\">");
if ( view.accountType)
{
buf.push("<div><strong data-i18n=\"courses.update_account_current_type\"></strong></div>");
}
buf.push("<div><strong data-i18n=\"courses.update_account_account_email\"></strong></div></div></div><div class=\"col-md-6\">");
if ( view.accountType)
{
buf.push("<div>" + (jade.escape((jade.interp = view.accountType) == null ? '' : jade.interp)) + "</div>");
}
buf.push("<div><span class=\"spr\">" + (jade.escape((jade.interp = me.get('email') || me.get('name')) == null ? '' : jade.interp)) + "</span><span class=\"not_you\"><span data-i18n=\"courses.not_you\" class=\"spr\"></span><a data-i18n=\"login.log_out\" href=\"#\" class=\"logout-btn\"></a></span></div></div></div><br/><div class=\"row\"><div class=\"col-md-6\"><div style=\"background-color:white;\" class=\"well\"><div class=\"text-center\"><h4><strong data-i18n=\"courses.update_account_am_teacher\"></strong></h4><p data-i18n=\"courses.update_account_keep_access\"></p></div><div style=\"margin: 0px 20px 0px 20px; font-size: 10pt\"><div data-i18n=\"courses.update_account_teachers_can\"></div><ul><li data-i18n=\"courses.update_account_teachers_can1\"></li><li data-i18n=\"courses.update_account_teachers_can2\"></li><li data-i18n=\"courses.update_account_teachers_can3\"></li><li data-i18n=\"courses.update_account_teachers_can4\"></li></ul><div data-i18n=\"courses.update_account_teachers_warning\" class=\"warning\"></div></div><br/><div class=\"text-center\">");
if ( me.isTeacher())
{
buf.push("<button data-i18n=\"courses.update_account_remain_teacher\" class=\"remain-teacher-btn btn btn-navy\"></button>");
}
else
{
buf.push("<button data-i18n=\"courses.update_account_update_teacher\" class=\"update-teacher-btn btn btn-forest\"></button>");
}
buf.push("</div><br/></div></div><div class=\"col-md-6\"><div style=\"background-color:white;\" class=\"well\"><div class=\"text-center\"><h4><strong data-i18n=\"courses.update_account_am_student\"></strong></h4><p data-i18n=\"courses.update_account_remove_access\"></p></div><div style=\"margin: 0px 20px 0px 20px; font-size: 10pt\"><div data-i18n=\"courses.update_account_students_can\"></div><ul><li data-i18n=\"courses.update_account_students_can1\"></li><li data-i18n=\"courses.update_account_students_can2\"></li><li data-i18n=\"courses.update_account_students_can3\"></li><li data-i18n=\"courses.update_account_students_can4\"></li></ul><div data-i18n=\"courses.update_account_students_warning\" class=\"warning\"></div></div><br/><div class=\"text-center\">");
if ( me.isStudent())
{
buf.push("<button data-i18n=\"courses.update_account_remain_student\" class=\"remain-student-btn btn btn-navy\"></button>");
}
else
{
buf.push("<label><span data-i18n=\"courses.need_a_class_code\"></span><input name=\"classCode\"/></label><button data-i18n=\"courses.update_account_update_student\" class=\"update-student-btn btn btn-forest\"></button>");
}
buf.push("</div><br/></div></div></div><br/><div class=\"small text-center\"><span data-i18n=\"courses.update_account_not_sure\" class=\"spr\"></span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></div>");
}
buf.push("</div></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
if ( !me.isStudent())
{
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.schools\"></strong></li><li><a href=\"/teachers/resources/faq\" data-i18n=\"teacher.educator_faq\"></a></li><li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li><li><a href=\"/teachers/resources\" data-i18n=\"nav.resource_hub\"></a></li><li><a href=\"/teachers/demo\" data-i18n=\"new_home.request_demo\"></a></li></ul></div>");
}
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.get_involved\"></strong></li><li><a href=\"/community\" data-i18n=\"nav.community\"></a></li><li><a href=\"/contribute\" data-i18n=\"nav.contribute\"></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("<li><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li><li><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"nav.open_source\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.support\"></strong></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div></div><div id=\"final-footer\" class=\"small text-center\">Copyright ©2016 CodeCombat. All Rights Reserved.<br class=\"hidden-lg hidden-md\"/><img src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><br class=\"hidden-lg hidden-md\"/>");
if ( !me.isStudent())
{
buf.push("<span data-i18n=\"nav.help_pref\" class=\"spr\"></span>");
var supportEmail = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl' ? 'klantenservice@codecombat.nl' : 'team@codecombat.com';
buf.push("<a" + (jade.attrs({ 'href':("mailto:" + supportEmail) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = supportEmail) ? "" : jade.interp)) + "</a><span data-i18n=\"nav.help_suff\" class=\"spl\"></span>");
}
buf.push("</div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/courses-update-account-view.js.map