require.register("templates/core/create-account-modal/choose-account-type-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"modal-body-content\"><h4 class=\"choose-type-title\"><span data-i18n=\"signup.choose_type\"></span></h4><div class=\"path-cards\"><div class=\"path-card navy\"><div class=\"card-title\"><span data-i18n=\"courses.teacher\"></span></div><div class=\"card-content\"><h6 class=\"card-description\"><span data-i18n=\"signup.teacher_type_1\"></span></h6><ul class=\"small m-t-1\"><li><span data-i18n=\"signup.teacher_type_2\"></span></li><li><span data-i18n=\"signup.teacher_type_3\"></span></li><li><span data-i18n=\"signup.teacher_type_4\"></span></li></ul></div><div class=\"card-footer\"><button class=\"btn btn-lg btn-navy teacher-path-button\"><div class=\"text-h6\"><span data-i18n=\"signup.signup_as_teacher\"></span></div></button></div></div><div class=\"path-card forest\"><div class=\"card-title\"><span data-i18n=\"courses.student\"></span></div><div class=\"card-content\"><h6 class=\"card-description\"><span data-i18n=\"signup.student_type_1\"></span></h6><ul class=\"small m-t-1\"><li><span data-i18n=\"signup.student_type_2\"></span></li><li><span data-i18n=\"signup.student_type_3\"></span></li><li><span data-i18n=\"signup.student_type_4\"></span></li></ul></div><div class=\"card-footer\"><i class=\"small\"><span data-i18n=\"signup.student_type_5\"></span></i><button class=\"btn btn-lg btn-forest student-path-button\"><div class=\"text-h6\"><span data-i18n=\"signup.signup_as_student\"></span></div></button></div></div></div><div class=\"individual-section\"><div class=\"individual-title\"><span data-i18n=\"signup.individuals_or_parents\"></span></div><p class=\"individual-description small\"><span data-i18n=\"signup.individual_type\"></span></p><button class=\"btn btn-lg btn-navy individual-path-button\"><div class=\"text-h6\"><span data-i18n=\"signup.signup_as_individual\"></span></div></button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/choose-account-type-view.js.map