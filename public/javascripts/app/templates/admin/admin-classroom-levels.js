require.register("templates/admin/admin-classroom-levels", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,levelCounts = locals_.levelCounts,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><h3>Classroom Levels</h3>");
if ( !me.isAdmin())
{
buf.push("<div>You must be logged in as an admin to view this page.</div>");
}
else
{
buf.push("<p>");
var levelsTotal = 0;
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Levels</th><th>Course</th></tr>");
// iterate view.courses.models
;(function(){
  var $$obj = view.courses.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

if ( course.get('releasePhase') !== 'released')
{
continue;
}
var campaign = view.campaigns.get(course.get('campaignID'));
if ( !campaign)
{
continue;
}
var levels = campaign.getLevels().models;
levelsTotal += levels.length;
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = levels.length) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

if ( course.get('releasePhase') !== 'released')
{
continue;
}
var campaign = view.campaigns.get(course.get('campaignID'));
if ( !campaign)
{
continue;
}
var levels = campaign.getLevels().models;
levelsTotal += levels.length;
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = levels.length) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = levelsTotal) ? "" : jade.interp)) + "</td><td>All</td></tr></table></p>");
// iterate view.courses.models
;(function(){
  var $$obj = view.courses.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

if ( course.get('releasePhase') !== 'released')
{
continue;
}
var campaign = view.campaigns.get(course.get('campaignID'));
if ( !campaign)
{
continue;
}
var levels = campaign.getLevels().models;
levelCounts = levels.length;
buf.push("<strong>" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "</strong><div class=\"small\">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</div><div class=\"small\">Levels last updated " + (jade.escape((jade.interp = campaign.get('levelsUpdated')) == null ? '' : jade.interp)) + "</div><table class=\"table table-striped table-condensed\"><tr><th>" + (jade.escape(null == (jade.interp = levels.length) ? "" : jade.interp)) + "</th><th>Slug</th><th>Type</th><th>Practice</th><th>Practice Threshold (m)</th><th>Shareable</th><th>Primer</th></tr>");
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var levelIndex = 0, $$l = $$obj.length; levelIndex < $$l; levelIndex++) {
      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<tr><td><a" + (jade.attrs({ 'href':('/play/level/' + level.get('slug')) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = level.get('slug')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('type')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practice')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practiceThresholdMinutes')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('shareable')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('primerLanguage')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var levelIndex in $$obj) {
      $$l++;      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<tr><td><a" + (jade.attrs({ 'href':('/play/level/' + level.get('slug')) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = level.get('slug')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('type')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practice')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practiceThresholdMinutes')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('shareable')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('primerLanguage')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

if ( course.get('releasePhase') !== 'released')
{
continue;
}
var campaign = view.campaigns.get(course.get('campaignID'));
if ( !campaign)
{
continue;
}
var levels = campaign.getLevels().models;
levelCounts = levels.length;
buf.push("<strong>" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "</strong><div class=\"small\">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</div><div class=\"small\">Levels last updated " + (jade.escape((jade.interp = campaign.get('levelsUpdated')) == null ? '' : jade.interp)) + "</div><table class=\"table table-striped table-condensed\"><tr><th>" + (jade.escape(null == (jade.interp = levels.length) ? "" : jade.interp)) + "</th><th>Slug</th><th>Type</th><th>Practice</th><th>Practice Threshold (m)</th><th>Shareable</th><th>Primer</th></tr>");
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var levelIndex = 0, $$l = $$obj.length; levelIndex < $$l; levelIndex++) {
      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<tr><td><a" + (jade.attrs({ 'href':('/play/level/' + level.get('slug')) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = level.get('slug')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('type')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practice')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practiceThresholdMinutes')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('shareable')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('primerLanguage')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var levelIndex in $$obj) {
      $$l++;      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<tr><td><a" + (jade.attrs({ 'href':('/play/level/' + level.get('slug')) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = level.get('slug')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('type')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practice')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('practiceThresholdMinutes')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('shareable')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = level.get('primerLanguage')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
    }

  }
}).call(this);

}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/admin/admin-classroom-levels.js.map