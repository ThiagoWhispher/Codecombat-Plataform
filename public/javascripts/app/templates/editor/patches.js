require.register("templates/editor/patches", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),patches = locals_.patches,moment = locals_.moment;buf.push("<div data-toggle=\"buttons\" class=\"btn-group status-buttons\"><label class=\"btn btn-default pending\"><input type=\"radio\" name=\"status\" value=\"pending\"/><span data-i18n=\"general.pending\">Pending</span></label><label class=\"btn btn-default accepted\"><input type=\"radio\" name=\"status\" value=\"accepted\"/><span data-i18n=\"general.accepted\">Accepted</span></label><label class=\"btn btn-default rejected\"><input type=\"radio\" name=\"status\" value=\"rejected\"/><span data-i18n=\"general.rejected\">Rejected</span></label><label class=\"btn btn-default withdrawn\"><input type=\"radio\" name=\"status\" value=\"withdrawn\"/><span data-i18n=\"general.withdrawn\">Withdrawn</span></label></div>");
if ( patches.loading)
{
buf.push("<p data-i18n=\"common.loading\">Loading...</p>");
}
else
{
buf.push("<table class=\"table table-condensed table-bordered\"><tr><th data-i18n=\"general.submitter\">Submitter</th><th data-i18n=\"general.submitted\">Submitted</th><th data-i18n=\"general.commit_msg\">Commit Message</th></tr>");
// iterate patches
;(function(){
  var $$obj = patches;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var patch = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('patch-row')] }, {"data-patch-id":true})) + "><td>" + (jade.escape(null == (jade.interp = patch.userName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(patch.get('created')).format('llll')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var patch = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('patch-row')] }, {"data-patch-id":true})) + "><td>" + (jade.escape(null == (jade.interp = patch.userName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(patch.get('created')).format('llll')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/patches.js.map