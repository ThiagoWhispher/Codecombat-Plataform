require.register("templates/legal", function(exports, require, module) {
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><h1 data-i18n=\"legal.page_title\">Legal</h1><hr/><p data-i18n=\"legal.opensource_intro\" class=\"lead\">CodeCombat is completely open source.</p><p><span data-i18n=\"legal.opensource_description_prefix\">Check out </span><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"legal.github_url\">our GitHub</a><span>, </span><span data-i18n=\"legal.opensource_description_center\">and help out if you like! CodeCombat is built on \ndozens of open source projects, and we love them. See </span><a href=\"https://github.com/codecombat/codecombat/wiki/Archmage-Home\" data-i18n=\"legal.archmage_wiki_url\">our Archmage wiki</a><span data-i18n=\"legal.opensource_description_suffix\" class=\"spl\">for a list of the software that makes this game possible.</span></p><hr/><div class=\"aside well\"><h3 data-i18n=\"legal.practices_title\">Respectful Best Practices</h3><p data-i18n=\"legal.practices_description\">These are our promises to you, the player, in slightly less legalese.</p><h4><a href=\"/privacy\" data-i18n=\"legal.privacy_title\">Privacy</a></h4><p data-i18n=\"legal.privacy_description\">We will not sell any of your personal information.</p><h4 data-i18n=\"legal.security_title\">Security</h4><p data-i18n=\"legal.security_description\">We strive to keep your personal information safe.\nAs an open source project, our site is freely open \nto anyone to review and improve our security systems.</p><h4 data-i18n=\"legal.email_title\">Email</h4><p><span data-i18n=\"legal.email_description_prefix\" class=\"spr\">We will not inundate you with spam. Through</span><a href=\"/account/settings\" data-i18n=\"legal.email_settings_url\">your email settings</a><span data-i18n=\"legal.email_description_suffix\" class=\"spl\">or through links in the emails we send, \nyou can change your preferences and easily unsubscribe at any time.</span></p>");
if ( !me.isOnPremiumServer())
{
buf.push("<h4 data-i18n=\"legal.cost_title\">Cost</h4><p id=\"cost-description\">Loading...</p>");
}
buf.push("</div><h2 data-i18n=\"legal.copyrights_title\">Copyrights and Licenses</h2><h3 data-i18n=\"legal.contributor_title\">Contributor License Agreement</h3><p><span data-i18n=\"legal.contributor_description_prefix\" class=\"spr\">All contributions, both on the site and on our GitHub repository, are subject to our</span><a href=\"/cla\" data-i18n=\"legal.cla_url\">CLA</a><span>, </span><span data-i18n=\"legal.contributor_description_suffix\">to which you should agree before contributing.</span></p><h3 data-i18n=\"legal.code_title\">Code - MIT</h3><p><span data-i18n=\"legal.code_description_prefix\" class=\"spr\">All code owned by CodeCombat or hosted on codecombat.com, \nboth in the GitHub repository or in the codecombat.com database, \nis licensed under the</span><a href=\"http://opensource.org/licenses/MIT\" data-i18n=\"legal.mit_license_url\">MIT license</a><span>. </span><span data-i18n=\"legal.code_description_suffix\">This includes all code in Systems and Components that are \nmade available by CodeCombat for the purpose of creating levels.</span></p><h3 data-i18n=\"legal.art_title\">Art/Music - Creative Commons </h3><p><span data-i18n=\"legal.art_description_prefix\" class=\"spr\">All common content is available under the</span><a href=\"https://creativecommons.org/licenses/by/4.0/\" data-i18n=\"legal.cc_license_url\">Creative Commons Attribution 4.0 International License</a><span>. </span><span data-i18n=\"legal.art_description_suffix\">Common content is anything made generally available by CodeCombat \nfor the purpose of creating Levels. This includes:</span></p><ul><li data-i18n=\"legal.art_music\">Music</li><li data-i18n=\"legal.art_sound\">Sound</li><li data-i18n=\"legal.art_artwork\">Artwork</li><li data-i18n=\"legal.art_sprites\">Sprites</li><li data-i18n=\"legal.art_other\">Any and all other non-code creative works that \nare made available when creating Levels.</li></ul><p data-i18n=\"legal.art_access\">Currently there is no universal, easy system for fetching these assets.\nIn general, fetch them from the URLs as used by the site,\ncontact us for assistance, or help us in extending the site\nto make these assets more easily accessible.</p><p data-i18n=\"legal.art_paragraph_1\">For attribution, please name and link to codecombat.com near \nwhere the source is used or where appropriate for the medium. For example:</p><ul><li data-i18n=\"legal.use_list_1\">If used in a movie or another game, include codecombat.com in the credits.</li><li data-i18n=\"legal.use_list_2\">If used on a website, include a link near the usage, \nfor example underneath an image, or in a general attributions \npage where you might also mention other Creative Commons works \nand open source software being used on the site. Something that's \nalready clearly referencing CodeCombat, such as a blog post mentioning \nCodeCombat, does not need some separate attribution.</li></ul><p data-i18n=\"legal.art_paragraph_2\">If the content being used is created not by CodeCombat \nbut instead by a user of codecombat.com, \nattribute them instead, and follow attribution directions \nprovided in that resource's description if there are any.</p><h3 data-i18n=\"legal.rights_title\">Rights Reserved</h3><p data-i18n=\"legal.rights_desc\">All rights are reserved for Levels themselves. This includes</p><ul><li data-i18n=\"legal.rights_scripts\">Scripts</li><li data-i18n=\"legal.rights_unit\">Unit configuration</li><li data-i18n=\"general.description\">Description</li><li data-i18n=\"legal.rights_writings\">Writings</li><li data-i18n=\"legal.rights_media\">Media (sounds, music) and any other creative \ncontent made specifically for that Level and \nnot made generally available when creating Levels.</li></ul><p data-i18n=\"legal.rights_clarification\">To clarify, anything that is made available in the Level Editor\nfor the purpose of making levels is under CC, whereas the content\ncreated with the Level Editor or uploaded in the course of creation of\nLevels is not.</p><h3 data-i18n=\"legal.nutshell_title\">In a Nutshell</h3><p data-i18n=\"legal.nutshell_description\">Any resources we provide in the Level Editor are \nfree to use as you like for creating Levels. \nBut we reserve the right to restrict distribution of \nthe Levels themselves (that are created on codecombat.com) \nso that they may be charged for in the future, \nif that's what ends up happening.</p><h3 data-i18n=\"legal.third_party_title\">Third Party Services</h3><p data-i18n=\"legal.third_party_description\">CodeCombat uses the following third party services (among others):</p><ul><a href=\"https://www.browserstack.com/\" data-i18n=\"browserstack_url\">BrowserStack</a><span></span></ul><hr/><p data-i18n=\"legal.canonical\">The English version of this document is the definitive, canonical version.\nIf there are any discrepencies between translations, the English document takes precedence.</p></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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
//# sourceMappingURL=/javascripts/app/templates/legal.js.map