require.register("templates/play/level/level_loading", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;buf.push("<div class=\"left-wing\"></div><div class=\"right-wing\"></div><div id=\"loading-details\" class=\"loading-container\"><div class=\"level-loading-goals secret\"><div data-i18n=\"play_level.goals\" class=\"goals-title\">Goals</div><ul class=\"list-unstyled\"></ul></div><div class=\"errors\"></div><div class=\"intro-doc hidden\"><div class=\"nano\"><div class=\"nano-content\"><div class=\"intro-doc-content\"></div></div></div></div><div class=\"progress-or-start-container\"><button data-i18n=\"play_level.loading_start\" class=\"start-level-button btn btn-lg btn-success btn-illustrated header-font needsclick\">Start Level</button><div class=\"load-progress\"><div class=\"progress\"><div class=\"progress-background\"></div><div class=\"progress-bar-container\"><div class=\"progress-bar progress-bar-success\"></div></div><div class=\"rim\"></div></div></div><div class=\"could-not-load\"><span data-i18n=\"loading_error.could_not_load\">Error loading from server</span></div><div class=\"subscription-required\"><span data-i18n=\"subscribe.subscription_required_to_play\">You'll need a subscription to play this level.</span><button data-i18n=\"subscribe.subscribe\" class=\"start-subscription-button btn btn-lg btn-warning\">Subscribe</button></div><div class=\"course-membership-required\"><span data-i18n=\"courses.course_membership_required_to_play\">You'll need to join a course to play this level.</span><a data-i18n=\"courses.go_to_courses\" href=\"/students\" class=\"btn btn-lg btn-warning\">Go To Courses</a></div></div><div id=\"tip-wrapper\" class=\"picoctf-hide\"><strong data-i18n=\"play_level.tip_toggle_play\" class=\"tip\">Toggle play/paused with Ctrl+P.</strong><strong data-i18n=\"play_level.tip_scrub_shortcut\" class=\"tip\">Ctrl+[ and Ctrl+] rewind and fast-forward.</strong><strong data-i18n=\"play_level.tip_guide_exists\" class=\"tip\">Click the guide, inside game menu (at the top of the page), for useful info.</strong><strong data-i18n=\"play_level.tip_open_source\" class=\"tip\">CodeCombat is 100% open source!</strong><strong data-i18n=\"play_level.tip_tell_friends\" class=\"tip\">Enjoying CodeCombat? Tell your friends about us!</strong><strong data-i18n=\"play_level.tip_beta_launch\" class=\"tip\">CodeCombat launched its beta in October, 2013.</strong><strong data-i18n=\"play_level.tip_think_solution\" class=\"tip\">Think of the solution, not the problem.</strong><strong data-i18n=\"play_level.tip_theory_practice\" class=\"tip\">In theory there is no difference between theory and practice; in practice there is. - Yogi Berra</strong><strong data-i18n=\"play_level.tip_error_free\" class=\"tip\">There are two ways to write error-free programs; only the third one works. - Alan Perlis</strong><strong data-i18n=\"play_level.tip_debugging_program\" class=\"tip\">If debugging is the process of removing bugs, then programming must be the process of putting them in. - Edsger W. Dijkstra</strong><strong data-i18n=\"play_level.tip_forums\" class=\"tip\">Head over to the forums and tell us what you think!</strong><strong data-i18n=\"play_level.tip_impossible\" class=\"tip\">It always seems impossible until it's done. - Nelson Mandela</strong><strong data-i18n=\"play_level.tip_move_forward\" class=\"tip\">Whatever you do, keep moving forward. - Martin Luther King Jr.</strong><strong data-i18n=\"play_level.tip_google\" class=\"tip\">Have a problem you can't solve? Google it!</strong><strong data-i18n=\"play_level.tip_solve_then_write\" class=\"tip\">First, solve the problem. Then, write the code. — John Johnson</strong><strong data-i18n=\"play_level.tip_mistakes_proof_of_trying\" class=\"tip\">Mistakes in your code are just proof that you are trying.</strong><strong data-i18n=\"play_level.tip_baby_coders\" class=\"tip rare\">In the future, even babies will be Archmages.</strong><strong data-i18n=\"play_level.tip_hardware_problem\" class=\"tip rare\">Q: How many programmers does it take to change a light bulb?  A: None, it's a hardware problem.</strong><strong data-i18n=\"play_level.tip_morale_improves\" class=\"tip rare\">Loading will continue until morale improves.</strong><strong data-i18n=\"play_level.tip_all_species\" class=\"tip rare\">We believe in equal opportunities to learn programming for all species.</strong><strong data-i18n=\"play_level.tip_reticulating\" class=\"tip rare\">Reticulating spines.</strong><strong data-i18n=\"play_level.tip_great_responsibility\" class=\"tip rare\">With great coding skill comes great debug responsibility.</strong><strong data-i18n=\"play_level.tip_munchkin\" class=\"tip rare\">If you don't eat your vegetables, a munchkin will come after you while you're asleep.</strong><strong data-i18n=\"play_level.tip_binary\" class=\"tip rare\">There are only 10 types of people in the world: those who understand binary, and those who don't.</strong><strong data-i18n=\"play_level.tip_commitment_yoda\" class=\"tip rare\">A programmer must have the deepest commitment, the most serious mind. ~ Yoda</strong><strong data-i18n=\"play_level.tip_no_try\" class=\"tip rare\">Do. Or do not. There is no try. - Yoda</strong><strong data-i18n=\"play_level.tip_patience\" class=\"tip rare\">Patience you must have, young Padawan. - Yoda</strong><strong data-i18n=\"play_level.tip_documented_bug\" class=\"tip rare\">A documented bug is not a bug; it is a feature.</strong><strong data-i18n=\"play_level.tip_talk_is_cheap\" class=\"tip rare\">Talk is cheap. Show me the code. - Linus Torvalds</strong><strong data-i18n=\"play_level.tip_first_language\" class=\"tip rare\">The most disastrous thing that you can ever learn is your first programming language. - Alan Kay</strong><strong data-i18n=\"play_level.tip_hofstadters_law\" class=\"tip rare\">Hofstadter's Law: It always takes longer than you expect, even when you take into account Hofstadter's Law.</strong><strong data-i18n=\"play_level.tip_premature_optimization\" class=\"tip rare\">Premature optimization is the root of all evil - Donald Knuth</strong><strong data-i18n=\"play_level.tip_brute_force\" class=\"tip rare\">When in doubt, use brute force. - Ken Thompson</strong><strong data-i18n=\"play_level.tip_extrapolation\" class=\"tip rare\">There are only two kinds of people: those that can extrapolate from incomplete data...</strong><strong data-i18n=\"play_level.tip_superpower\" class=\"tip rare\">Coding is the closest thing we have to a superpower</strong><strong data-i18n=\"play_level.tip_source_code\" class=\"tip rare\">I want to change the world but they would not give me the source code.</strong><strong data-i18n=\"play_level.tip_javascript_java\" class=\"tip rare\">Java is to JavaScript what Car is to Carpet. - Chris Heilmann</strong><strong class=\"tip rare\"><span data-i18n=\"play_level.tip_harry\" class=\"spr\">Yer a Wizard,</span><span>" + (jade.escape(null == (jade.interp = me.get('name', true)) ? "" : jade.interp)) + "</span></strong><strong data-i18n=\"play_level.tip_control_destiny\" class=\"tip rare\">In real open source, you have the right to control your own destiny. - Linus Torvalds</strong><strong data-i18n=\"play_level.tip_no_code\" class=\"tip rare\">No code is faster than no code.</strong><strong data-i18n=\"play_level.tip_code_never_lies\" class=\"tip rare\">Code never lies, comments sometimes do. — Ron Jeffries</strong><strong data-i18n=\"play_level.tip_reusable_software\" class=\"tip rare\">Before software can be reusable it first has to be usable.</strong><strong data-i18n=\"play_level.tip_optimization_operator\" class=\"tip rare\">Every language has an optimization operator. In most languages that operator is ‘//’</strong><strong data-i18n=\"play_level.tip_lines_of_code\" class=\"tip rare\">Measuring programming progress by lines of code is like measuring aircraft building progress by weight. — Bill Gates</strong><strong data-i18n=\"play_level.tip_adding_evil\" class=\"tip rare\">Adding a pinch of evil.</strong><strong data-i18n=\"play_level.tip_adding_orgres\" class=\"tip rare\">Rounding up ogres.</strong><strong data-i18n=\"play_level.tip_sharpening_swords\" class=\"tip rare\">Sharpening the swords.</strong><strong data-i18n=\"play_level.tip_hate_computers\" class=\"tip rare\">That's the thing about people who think they hate computers. What they really hate is lousy programmers. - Larry Niven</strong><strong class=\"tip rare\"><a href=\"https://github.com/codecombat/codecombat/wiki\" data-i18n=\"play_level.tip_open_source_contribute\">You can help CodeCombat improve!</a></strong><strong data-i18n=\"play_level.tip_recurse\" class=\"tip rare\">To iterate is human, to recurse divine. - L. Peter Deutsch</strong><strong data-i18n=\"play_level.tip_free_your_mind\" class=\"tip rare\">You have to let it all go, Neo. Fear, doubt, and disbelief. Free your mind. - Morpheus</strong><strong data-i18n=\"play_level.tip_strong_opponents\" class=\"tip rare\">Even the strongest of opponents always has a weakness. - Itachi Uchiha</strong><strong data-i18n=\"play_level.tip_paper_and_pen\" class=\"tip rare\">Before you start coding, you can always plan with a sheet of paper and a pen.</strong><strong data-i18n=\"play_level.tip_compiler_ignores_comments\" class=\"tip rare\">Sometimes I think that the compiler ignores my comments.</strong><strong data-i18n=\"play_level.tip_understand_recursion\" class=\"tip rare\">The only way to understand recursion is to understand recursion.</strong><strong data-i18n=\"play_level.tip_open_source_and_polymorphism\" class=\"tip rare\">Open Source projects are like totally polymorphic heterogeneous structures: All types are welcome.</strong><strong data-i18n=\"play_level.tip_ratatouille\" class=\"tip rare\">You must not let anyone define your limits because of where you come from. Your only limit is your soul. - Gusteau, Ratatouille</strong><strong data-i18n=\"play_level.tip_nemo\" class=\"tip rare\">When life gets you down, want to know what you've gotta do? Just keep swimming, just keep swimming. - Dory, Finding Nemo</strong><strong data-i18n=\"play_level.tip_internet_weather\" class=\"tip rare\">Just move to the internet, it's great here. We get to live inside where the weather is always awesome. - John Green</strong><strong data-i18n=\"play_level.tip_nerds\" class=\"tip rare\">Nerds are allowed to love stuff, like jump-up-and-down-in-the-chair-can't-control-yourself love it. - John Green</strong><strong data-i18n=\"play_level.tip_self_taught\" class=\"tip rare\">I taught myself 90% of what I've learned. And that's normal! - Hank Green</strong><strong data-i18n=\"play_level.tip_luna_lovegood\" class=\"tip rare\">Don't worry, you're just as sane as I am. - Luna Lovegood</strong><strong data-i18n=\"play_level.tip_good_idea\" class=\"tip rare\">The best way to have a good idea is to have a lot of ideas. - Linus Pauling</strong><strong data-i18n=\"play_level.tip_programming_not_about_computers\" class=\"tip rare\">Computer Science is no more about computers than astronomy is about telescopes. - Edsger Dijkstra</strong><strong data-i18n=\"play_level.tip_mulan\" class=\"tip rare\">Believe you can, then you will. - Mulan</strong></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/level_loading.js.map