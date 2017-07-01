require.register("templates/editor/level/modal/save-branch-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Save Branch</h3></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-2\"><div id=\"branches-list-group\" class=\"list-group\"><a" + (jade.attrs({ "class": [('list-group-item'),((view.selectedBranch ? '' : 'active'))] }, {"class":true})) + "><i>New Branch</i><input id=\"new-branch-name-input\" placeholder=\"Name\" class=\"form-control\"/></a>");
// iterate view.branches.models
;(function(){
  var $$obj = view.branches.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var branch = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((view.selectedBranch == branch ? 'active': ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var branch = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-branch-cid':(branch.cid), "class": [('list-group-item'),((view.selectedBranch == branch ? 'active': ''))] }, {"class":true,"data-branch-cid":true})) + "><span class=\"delete-branch-btn glyphicon glyphicon-remove pull-right\"></span>" + (jade.escape(null == (jade.interp = branch.get('name')) ? "" : jade.interp)) + "<div class=\"small\"><i>" + (jade.escape(null == (jade.interp = branch.get('updatedByName')) ? "" : jade.interp)) + "</i><br/><span>" + (jade.escape(null == (jade.interp = moment(branch.get('updated')).format('lll')) ? "" : jade.interp)) + "</span></div></a>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"col-sm-5\"><h2>Changes from Prod</h2>");
// iterate view.componentsWithChanges.models
;(function(){
  var $$obj = view.componentsWithChanges.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-component-id':(component.id), 'checked':(true), "class": [('component-checkbox')] }, {"type":true,"data-component-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-component-id':(component.id), 'checked':(true), "class": [('component-checkbox')] }, {"type":true,"data-component-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  }
}).call(this);

// iterate view.systemsWithChanges.models
;(function(){
  var $$obj = view.systemsWithChanges.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-system-id':(system.id), 'checked':(true), "class": [('system-checkbox')] }, {"type":true,"data-system-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<h4 class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'data-system-id':(system.id), 'checked':(true), "class": [('system-checkbox')] }, {"type":true,"data-system-id":true,"checked":true})) + "/>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</label></h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"selected-branch-col\" class=\"col-sm-5\">");
if ( view.selectedBranch)
{
buf.push("<h2>Changes from Branch</h2>");
// iterate view.selectedBranch.components.models
;(function(){
  var $$obj = view.selectedBranch.components.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<h4>Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<h4>Component: " + (jade.escape((jade.interp = component.get('system')) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-component-id':(component.id), "class": [('component-changes-stub')] }, {"data-component-id":true})) + "></div>");
    }

  }
}).call(this);

// iterate view.selectedBranch.systems.models
;(function(){
  var $$obj = view.selectedBranch.systems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<h4>System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<h4>System: " + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</h4><div" + (jade.attrs({ 'data-system-id':(system.id), "class": [('system-changes-stub')] }, {"data-system-id":true})) + "></div>");
    }

  }
}).call(this);

}
else
{
buf.push("<h2>New Branch</h2>");
}
buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"stash-branch-btn\" class=\"btn btn-primary\">Stash Branch</button><button id=\"save-branch-btn\" class=\"btn btn-primary\">Save Branch</button></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/save-branch-modal.js.map