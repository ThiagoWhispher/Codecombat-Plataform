require.register("templates/core/contact", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"contact.contact_us\">Contact CodeCombat...</h3></div><div class=\"modal-body\"><p><span data-i18n=\"contact.welcome\">Good to hear from you! Use this form to send us email. </span><span data-i18n=\"contact.forum_prefix\" class=\"spl\">For anything public, please try </span><a href=\"http://discourse.codecombat.com/\" data-i18n=\"contact.forum_page\">our forum</a><span data-i18n=\"contact.forum_suffix\"> instead.</span><span data-i18n=\"contact.faq_prefix\" class=\"spl spr\">There's also a</span><a data-i18n=\"contact.faq\" href=\"http://discourse.codecombat.com/t/faq-check-before-posting/1027\">FAQ</a>.</p>");
if ( me.isPremium())
{
buf.push("<p data-i18n=\"contact.subscriber_support\">Since you're a CodeCombat subscriber, your email will get our priority support.</p>");
}
else
{
buf.push("<p><span data-i18n=\"contact.subscribe_prefix\" class=\"spr\">If you need help figuring out a level, please</span><a data-toggle=\"coco-modal\" data-target=\"core/SubscribeModal\" data-i18n=\"contact.subscribe\">buy a CodeCombat subscription</a><span data-i18n=\"contact.subscribe_suffix\" class=\"spl\">and we'll be happy to help you with your code.</span></p>");
}
buf.push("<div class=\"form\"><div class=\"form-group\"><label for=\"contact-email\" data-i18n=\"general.email\" class=\"control-label\">Email      </label><input" + (jade.attrs({ 'id':('contact-email'), 'name':("email"), 'type':("email"), 'value':("" + (me.get('anonymous') ? '' : me.get('email')) + ""), 'data-i18n':("[placeholder]contact.where_reply"), 'placeholder':("Where should we reply?"), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"data-i18n":true,"placeholder":true})) + "/></div><div class=\"form-group\"><label for=\"contact-message\" data-i18n=\"general.message\" class=\"control-label\">Message      </label><textarea id=\"contact-message\" name=\"message\" rows=\"8\" class=\"form-control\"></textarea></div></div><div id=\"contact-screenshot\" class=\"secret\"><a target=\"_blank\" data-i18n=\"contact.screenshot_included\">Screenshot included.</a><br/><img width=\"100\" class=\"pull-left\"/></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><span data-i18n=\"common.sending\" class=\"sending-indicator pull-left secret\">Sending...</span><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</a><button id=\"contact-submit-button\" data-i18n=\"contact.send\" class=\"btn btn-primary\">Send Feedback</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/contact.js.map