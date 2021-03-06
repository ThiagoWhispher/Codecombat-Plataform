require.register("templates/editor/article/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,me = locals_.me,page = locals_.page;buf.push("<table class=\"table\"><tr><th colspan=\"3\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.version\">Version</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.getOwner() == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var document = $$obj[$index];

var data = document.attributes;
buf.push("<tr" + (jade.attrs({ "class": [(document.getOwner() == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(data.name), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(data.description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = data.version.minor) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/article/table.js.map