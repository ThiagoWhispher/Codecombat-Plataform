require.register("templates/community-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><h1 data-i18n=\"community.main_title\"></h1><p data-i18n=\"community.introduction\"></p><div><div class=\"community-columns\"><a href=\"/editor/level\"><img src=\"/images/pages/community/level.png\"/></a><h2><a href=\"/editor/level\" data-i18n=\"editor.level_title\"></a></h2><p><span data-i18n=\"community.level_editor_prefix\" class=\"spr\"></span><a href=\"/editor/level\" data-i18n=\"editor.level_title\"></a><span data-i18n=\"community.level_editor_suffix\" class=\"spl\"></span></p></div><div class=\"community-columns\"><a href=\"/editor/thang\"><img src=\"/images/pages/community/thang.png\"/></a><h2><a href=\"/editor/thang\" data-i18n=\"editor.thang_title\"></a></h2><p><span data-i18n=\"community.thang_editor_prefix\" class=\"spr\"></span><a href=\"/editor/thang\" data-i18n=\"editor.thang_title\"></a><span data-i18n=\"community.thang_editor_suffix\" class=\"spl\"></span></p></div><div class=\"community-columns\"><a href=\"/editor/article\"><img src=\"/images/pages/community/article.png\"/></a><h2><a href=\"/editor/article\" data-i18n=\"editor.article_title\"></a></h2><p><span data-i18n=\"community.article_editor_prefix\" class=\"spr\"></span><a href=\"/editor/article\" data-i18n=\"editor.article_title\"></a><span data-i18n=\"community.article_editor_suffix\" class=\"spl\"></span></p></div></div><div class=\"clearfix\"></div><div><div class=\"half-width\"><h2 data-i18n=\"community.find_us\" class=\"lower-titles\"></h2><div class=\"logo-row\"><a href=\"https://github.com/ThiagoWhispher/Codecombat-Project\"><img src=\"/images/pages/community/logo_github.png\" data-i18n=\"[data-content]community.social_github\" data-content=\"Check out all our code on GitHub\"/></a><a href=\"http://discourse.codecombat.com\"><img src=\"/images/pages/community/logo_discourse.png\" data-i18n=\"[data-content]community.social_discource\" data-content=\"Join the discussion on our Discourse forum\"/></a><a href=\"https://coco-slack-invite.herokuapp.com/\"><img src=\"/images/pages/community/logo_slack.png\" data-i18n=\"[data-content]community.social_slack\" data-content=\"Chat with us in the public CodeCombat Slack channel\"/></a></div></div></div><div class=\"clearfix\"></div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("views/CommunityView", function(exports, require, module) {
var CommunityView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/community-view');

module.exports = CommunityView = (function(superClass) {
  extend(CommunityView, superClass);

  function CommunityView() {
    return CommunityView.__super__.constructor.apply(this, arguments);
  }

  CommunityView.prototype.id = 'community-view';

  CommunityView.prototype.template = template;

  CommunityView.prototype.afterRender = function() {
    CommunityView.__super__.afterRender.call(this);
    this.$el.find('.contribute-classes a').each(function() {
      var characterClass, explanation, summary, title, titleDescription;
      characterClass = $(this).attr('href').split('/')[2];
      title = $.i18n.t("classes." + characterClass + "_title");
      titleDescription = $.i18n.t("classes." + characterClass + "_title_description");
      summary = $.i18n.t("classes." + characterClass + "_summary");
      explanation = "<h4>" + title + " " + titleDescription + "</h4>" + summary;
      return $(this).find('img').popover({
        placement: 'top',
        trigger: 'hover',
        container: 'body',
        content: explanation,
        html: true
      });
    });
    return this.$el.find('.logo-row img').each(function() {
      return $(this).popover({
        placement: 'top',
        trigger: 'hover',
        container: 'body'
      });
    });
  };

  CommunityView.prototype.logoutRedirectURL = false;

  return CommunityView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/CommunityView.js.map