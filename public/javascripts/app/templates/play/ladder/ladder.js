require.register("templates/play/ladder/ladder", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,i18n = locals_.i18n,_ = locals_._,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
var base = "/images/pages/play/ladder/prize_";
buf.push("<div id=\"ladder-top\">");
if ( view.leagueType === 'course' && view.course)
{
buf.push("<div id=\"course-header\"><div id=\"course-details-link\"><a" + (jade.attrs({ 'href':("/students/" + (view.course.id) + "/" + (view.league.id) + "") }, {"href":true})) + "><span class=\"glyphicon glyphicon-arrow-left\"></span><span class=\"spl\">Levels</span></a></div><div class=\"text-center\"><span id=\"course-name\"><span>" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'name')) ? "" : jade.interp)) + "</span><span class=\"spl\">- Arena</span></span></div></div>");
}
buf.push("<div id=\"level-column\">");
if ( view.levelDescription)
{
buf.push("<div>" + (null == (jade.interp = view.levelDescription) ? "" : jade.interp) + "</div>");
}
if ( view.leagueType === 'clan')
{
buf.push("<h1 class=\"league-header\"><a" + (jade.attrs({ 'href':("/clans/" + (view.league.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = view.league.get('name')) ? "" : jade.interp)) + "</a><span data-i18n=\"ladder.league\" class=\"spl\">League</span></h1>");
}
buf.push("</div>");
if ( view.level.get('name') == 'Greed')
{
buf.push("<div class=\"tournament-blurb\"><h2><span data-i18n=\"ladder.tournament_ended\">Tournament ended</span> " + (jade.escape((jade.interp = view.tournamentTimeLeft) == null ? '' : jade.interp)) + "</h2><p><span data-i18n=\"ladder.tournament_blurb\">Write code, collect gold, build armies, crush foes, win prizes, and upgrade your career in our $40,000 Greed tournament! Check out the details</span> <a href=\"http://blog.codecombat.com/a-31-trillion-390-billion-statement-programming-war-between-545-wizards\" data-i18n=\"ladder.tournament_blurb_blog\">on our blog</a>.</p><p><strong>Tournament ended! </strong><a href=\"#winners\">Behold the winners</a>. Thanks for playing! You can <strong>still play</strong> Greed and all of our other <a href=\"/play/ladder\">multiplayer arenas</a>.</p><p>Want to commiserate? Head over to <a href=\"http://discourse.codecombat.com/\">the forum</a> and discuss your strategies, your triumphs, and your turmoils.</p><div class=\"sponsor-logos\"><a href=\"https://heapanalytics.com/\"><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/></a><a href=\"https://www.firebase.com/\"><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/></a><a href=\"https://onemonthrails.com/\"><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/></a><a href=\"http://www.jetbrains.com/webstorm/\"><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/></a><a href=\"http://shop.oreilly.com/category/ebooks.do\"><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/></a><a href=\"http://aws.amazon.com/\"><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/></a></div></div>");
}
if ( view.level.get('name') == 'Criss-Cross')
{
buf.push("<div class=\"tournament-blurb\"><h2><span data-i18n=\"ladder.tournament_ended\">Tournament ended</span> " + (jade.escape((jade.interp = view.tournamentTimeLeft) == null ? '' : jade.interp)) + "</h2><p><span data-i18n=\"ladder.tournament_blurb_criss_cross\">Win bids, construct paths, outwit opponents, grab gems, and upgrade your career in our Criss-Cross tournament! Check out the details</span> <a href=\"http://blog.codecombat.com/a-good-new-fashioned-programming-throwdown\" data-i18n=\"ladder.tournament_blurb_blog\">on our blog</a>.</p><p><strong>Tournament ended! </strong><a href=\"#winners\">Behold the winners</a>. Thanks for playing! You can <strong>still play</strong> Criss-Cross and all of our other <a href=\"/play/ladder\">multiplayer arenas</a>.</p><p>Want to commiserate? Head over to <a href=\"http://discourse.codecombat.com/\">the forum</a> and discuss your strategies, your triumphs, and your turmoils.</p></div>");
}
if ( view.level.get('name') == 'Zero Sum' && !view.league)
{
buf.push("<div class=\"tournament-blurb\"><h2><span data-i18n=\"ladder.tournament_ended\">Tournament ended</span> " + (jade.escape((jade.interp = view.tournamentTimeLeft) == null ? '' : jade.interp)) + "<!--span(data-i18n=\"ladder.tournament_started\") , started--><!--|  #{view.tournamentTimeElapsed}--></h2><p><span data-i18n=\"ladder.tournament_blurb_zero_sum\">Unleash your coding creativity in both gold gathering and battle tactics in this alpine mirror match between red sorcerer and blue sorcerer. The tournament began on Friday, March 27 and will run until Monday, April 6 at 5PM PDT. Compete for fun and glory! Check out the details</span> <a href=\"http://blog.codecombat.com/kings-of-zero-sum-strategies-from-the-ai-wars\" data-i18n=\"ladder.tournament_blurb_blog\">on our blog</a>.</p><p><strong>Tournament ended! </strong><a href=\"#winners\">Behold the winners</a>. Thanks for playing! You can <strong>still play</strong> Zero Sum as long as you like.</p><p>Want to commiserate? Head over to <a href=\"http://discourse.codecombat.com/\">the forum</a> and discuss your strategies, your triumphs, and your turmoils.</p></div>");
}
if ( view.level.get('name') == 'Ace of Coders')
{
buf.push("<div class=\"tournament-blurb\"><h2><!--span(data-i18n=\"ladder.tournament_ends\") Tournament ends--><span data-i18n=\"ladder.tournament_ended\">Tournament ended</span> " + (jade.escape((jade.interp = view.tournamentTimeLeft) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.tournament_started\">, started</span> " + (jade.escape((jade.interp = view.tournamentTimeElapsed) == null ? '' : jade.interp)) + "</h2><p><span data-i18n=\"ladder.tournament_blurb_ace_of_coders\">Battle it out in the frozen glacier in this domination-style mirror match! The tournament began on Wednesday, September 16 and will run until Wednesday, October 14 at 5PM PDT. Check out the details</span> <a href=\"http://blog.codecombat.com/the-true-ace-of-coders\" data-i18n=\"ladder.tournament_blurb_blog\">on our blog</a>.</p><p><strong>Tournament ended! </strong><a href=\"#winners\">Behold the winners</a>. Thanks for playing! You can <strong>still play</strong> Ace of Coders as long as you like.</p><p>Want to commiserate? Head over to <a href=\"http://discourse.codecombat.com/\">the forum</a> and discuss your strategies, your triumphs, and your turmoils.</p></div>");
}
buf.push("<div id=\"columns\" class=\"row\"><div class=\"column col-md-2\"></div>");
if ( view.teams)
{
// iterate view.teams
;(function(){
  var $$obj = view.teams;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var team = $$obj[$index];

buf.push("<div class=\"column col-md-4\"><a" + (jade.attrs({ 'data-team':(team.id), "class": [("play-button btn btn-illustrated btn-block btn-lg " + (team.id == 'ogres' ? 'btn-primary' : 'btn-danger'))] }, {"class":true,"data-team":true})) + "><span data-i18n=\"play.play_as\">Play As</span> <span>" + (jade.escape(null == (jade.interp = team.displayName) ? "" : jade.interp)) + "</span></a></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var team = $$obj[$index];

buf.push("<div class=\"column col-md-4\"><a" + (jade.attrs({ 'data-team':(team.id), "class": [("play-button btn btn-illustrated btn-block btn-lg " + (team.id == 'ogres' ? 'btn-primary' : 'btn-danger'))] }, {"class":true,"data-team":true})) + "><span data-i18n=\"play.play_as\">Play As</span> <span>" + (jade.escape(null == (jade.interp = team.displayName) ? "" : jade.interp)) + "</span></a></div>");
    }

  }
}).call(this);

}
buf.push("<div class=\"column col-md-2\"></div></div>");
if ( view.leagueType !== 'course')
{
buf.push("<div class=\"spectate-button-container\"><a" + (jade.attrs({ 'href':("/play/spectate/" + (view.level.get('slug')) + "" + (view.league ? "?league=" + view.league.id : "")), "class": [('spectate-button'),('btn'),('btn-illustrated'),('btn-info'),('center')] }, {"href":true})) + "><span data-i18n=\"play.spectate\">Spectate</span></a></div>");
}
buf.push("</div><ul class=\"nav nav-pills\"><li class=\"active\"><a href=\"#ladder\" data-toggle=\"tab\" data-i18n=\"general.ladder\">Ladder</a></li>");
if ( !me.get('anonymous'))
{
buf.push("<li><a href=\"#my-matches\" data-toggle=\"tab\" data-i18n=\"ladder.my_matches\">My Matches</a></li>");
if ( view.leagueType !== 'course')
{
buf.push("<li><a href=\"#simulate\" data-toggle=\"tab\" data-i18n=\"ladder.simulate\">Simulate</a></li>");
}
}
if ( view.level.get('name') == 'Greed')
{
buf.push("<li><a href=\"#prizes\" data-toggle=\"tab\" data-i18n=\"ladder_prizes.prizes\">Prizes</a></li>");
}
if ( view.level.get('name') == 'Greed')
{
buf.push("<li><a href=\"#rules\" data-toggle=\"tab\" data-i18n=\"ladder.rules\">Rules</a></li>");
}
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum' || view.level.get('name') == 'Ace of Coders')
{
buf.push("<li><a href=\"#winners\" data-toggle=\"tab\" data-i18n=\"ladder.winners\">Winners</a></li>");
}
buf.push("</ul><div class=\"tab-content\"><div id=\"ladder\" class=\"tab-pane active well\"><div id=\"ladder-tab-view\"></div></div><div id=\"my-matches\" class=\"tab-pane well\"><div id=\"my-matches-tab-view\"></div></div><div id=\"simulate\" class=\"tab-pane well\"><div id=\"simulate-tab-view\"></div></div>");
if ( view.level.get('name') == 'Greed')
{
buf.push("<div id=\"prizes\" class=\"tab-pane well\"><h1 data-i18n=\"ladder_prizes.title\">Tournament Prizes</h1><p><span data-i18n=\"ladder_prizes.blurb_1\">These prizes will be awarded according to</span> <a href=\"#rules\" data-i18n=\"ladder_prizes.blurb_2\">the tournament rules</a> <span data-i18n=\"ladder_prizes.blurb_3\">to the top human and ogre players.</span> <strong data-i18n=\"ladder_prizes.blurb_4\">Two teams means double the prizes!</strong> <span data-i18n=\"ladder_prizes.blurb_5\">(There will be two first place winners, two second-place winners, etc.)</span></p><table id=\"prize_table\" class=\"table\"><thead><tr><td data-i18n=\"ladder_prizes.rank\">Rank</td><td data-i18n=\"ladder_prizes.prizes\">Prizes</td><td data-i18n=\"ladder_prizes.total_value\">Total Value</td></tr></thead><tbody><tr> <td>1st</td><td> <ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash1.png") }, {"src":true})) + "/><span>$512 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "custom_wizard.png") }, {"src":true})) + "/><span data-i18n=\"ladder_prizes.custom_wizard\">Custom CodeCombat Wizard</span></li><li><img" + (jade.attrs({ 'src':(base + "custom_avatar.png") }, {"src":true})) + "/><span data-i18n=\"ladder_prizes.custom_avatar\">Custom CodeCombat avatar</span></li><li><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/><span><a href=\"https://heapanalytics.com/\">Heap Analytics</a> <span data-i18n=\"ladder_prizes.heap\">for six months of \"Startup\" access</span> - $354</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_coupon\">coupon: choose either Rails or HTML</span> - $99</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$2054</td></tr><tr> <td>2nd</td><td> <ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash2.png") }, {"src":true})) + "/><span>$256 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "custom_avatar.png") }, {"src":true})) + "/><span data-i18n=\"ladder_prizes.custom_avatar\">Custom CodeCombat avatar</span></li><li><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/><span><a href=\"https://heapanalytics.com/\">Heap Analytics</a> <span data-i18n=\"ladder_prizes.heap\">for six months of \"Startup\" access</span> - $354</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$1229</td></tr><tr> <td>3rd</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash2.png") }, {"src":true})) + "/><span>$128 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "custom_avatar.png") }, {"src":true})) + "/><span data-i18n=\"ladder_prizes.custom_avatar\">Custom CodeCombat avatar</span></li><li><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/><span><a href=\"https://heapanalytics.com/\">Heap Analytics</a> <span data-i18n=\"ladder_prizes.heap\">for six months of \"Startup\" access</span> - $354</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$1101</td></tr><tr> <td>4th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$64 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/><span><a href=\"https://heapanalytics.com/\">Heap Analytics</a> <span data-i18n=\"ladder_prizes.heap\">for six months of \"Startup\" access</span> - $354</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$887</td></tr><tr> <td>5th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$32 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "heap.png") }, {"src":true})) + "/><span><a href=\"https://heapanalytics.com/\">Heap Analytics</a> <span data-i18n=\"ladder_prizes.heap\">for six months of \"Startup\" access</span> - $354</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$855</td></tr><tr> <td>6th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$16 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$485</td></tr><tr> <td>7th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$8 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$477</td></tr><tr> <td>8th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$4 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$473</td></tr><tr> <td>9th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$2 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$471</td></tr><tr> <td>10th</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "cash3.png") }, {"src":true})) + "/><span>$1 </span><span data-i18n=\"ladder_prizes.in_cash\">in cash</span></li><li><img" + (jade.attrs({ 'src':(base + "firebase.png") }, {"src":true})) + "/><span><a href=\"https://www.firebase.com/\">Firebase</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $300</span></li><li><img" + (jade.attrs({ 'src':(base + "one_month.png") }, {"src":true})) + "/><span><a href=\"https://onemonthrails.com/\">One Month Rails</a> <span data-i18n=\"ladder_prizes.one_month_discount\">discount, 30% off: choose either Rails or HTML</span> - $30</span></li><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$470</td></tr><tr> <td>11 - 40</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "webstorm.png") }, {"src":true})) + "/><span><a href=\"http://www.jetbrains.com/webstorm/\">Webstorm</a> <span data-i18n=\"ladder_prizes.license\">license</span> - $49</span></li><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$139</td></tr><tr> <td>41 - 100</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "oreilly.png") }, {"src":true})) + "/><span><a href=\"http://shop.oreilly.com/category/ebooks.do\">O'Reilly</a> <span data-i18n=\"ladder_prizes.oreilly\">ebook of your choice</span> - $40</span></li><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$90</td></tr><tr> <td>101+</td><td><ul class=\"list-unstyled\"><li><img" + (jade.attrs({ 'src':(base + "aws.png") }, {"src":true})) + "/><span><a href=\"http://aws.amazon.com/\">Amazon Web Services</a> <span data-i18n=\"ladder_prizes.credits\">credits</span> - $50</span></li></ul></td><td>$50</td></tr></tbody></table></div>");
}
if ( view.level.get('name') == 'Greed')
{
buf.push("<div id=\"rules\" class=\"tab-pane well\"><h1 data-i18n=\"ladder.tournament_rules\">Tournament Rules</h1><h2>General</h2><p>You don't have to buy anything to participate in the tournament, and trying to pay us won't increase your odds of winning. Although we don't anticipate the rules changing, they are subject to change.</p><h2>Dates and Times</h2><p>The tournament starts on Tuesday, May 20 at 8:30AM and ends on Tuesday, June 10 at 5:00PM PDT. After the tournament finishes, we will check the games manually to prevent duplicate entries and cheating. We will email all the winners within two weeks of the end date.</p><h2>Eligilibity</h2><p>The tournament is open to anyone over the age of 13. Players are allowed to form teams to compete, but we will only be rewarding submissions, so if a team of 10 wins, they will need to split the prize.</p><p>The tournament is NOT open to people who live in countries or states that prohibit participating or receiving a prize in a challenge (these include, but are not limited to Brazil, Quebec, Italy, Cuba, Sudan, Iran, North Korea, and Syria). To clarify, people from the aforementioned places are welcome to play the Greed level, but cannot receive prizes. Organizations involved in putting the tournament together (namely CodeCombat and all of our employees) are excluded from participating/winning prizes.</p><h2>Submission Requirements</h2><p> \nTo be eligible to win prizes, players must submit their code to the Greed ladder for ranking AND defeat our default AI. Every player that submits their code to the ladder and beats our default AI will receive $50 in AWS credits as described on the <a href=\"#prizes\" data-i18n=\"ladder_prizes.tournament_prizes\">Tournament Prizes</a> page.</p><p>There are some restrictions regarding who can use the AWS credits. Please see the additional rules of use on <a href=\"https://aws.amazon.com/awscredits\">Amazon's AWS credits page.</a></p><h2>Submission Rights</h2><p>We reserve the right to use your submission and site identity (including username, avatar, and any information you mark as public) to promote the tournament. This is in keeping with our overall site terms of service.</p><h2>Judging Criteria</h2><p>We will calculate final rankings by running the top games from the public leaderboard from both teams against each other and sorting solutions by wins and losses. The number of games from each side to be used in the final ranking is yet to be determined, but is probably around 150. The final ranking will be performed with a snapshot of solutions taken the end of the contest. The final ranking methedology is subject to change. We will not be evaluating code in any manual way for common traits like adequate documentation, cleanliness, etc. We reserve the right to disqualify any player for any reason. The public leaderboards are a good proxy for your final rank, but are not guaranteed to be accurate. To repeat, <strong>the leaderboards are only a preliminary proxy for your final rank</strong>.</p><p>Your rank will change as players submit more solutions and more matches are played according to <a href=\"https://github.com/codecombat/bayesian-battle\">our open-source ranking library, Bayesian Battle</a>, but our final ranking will use an exhaustive pairwise matching round amongst the top players as described above.</p><h2>Prizes</h2><p> \nPrizes will be awarded to everyone that achieves a rank covered on the <a href=\"#prizes\" data-i18n=\"ladder.prizes\">Tournament Prizes</a> page.</p><p>Please remember that the player ranks listed on the prize page refer to ranks WITHIN a leaderboard. So if you are the #2 Ogre player, you will win the #2 prize. Similarly, if you are the #3 Human player, you will receive the #3 prize. If you have submissions on both leaderboards, we will only count your highest submission for the purposes of distributing prizes. As a result, your final ranking may be higher than your preliminary ranking due to removing duplicate submissions above you.</p><h2>Verifying Potential Winners</h2><p>We may ask players to identify themselves so that we can detect duplicate entries. This may be done in the form of a Facebook, Google+, or LinkedIn profile, but we may need more information. All players eligible for prizes agree that refusing to provide us with identifying information may lead to ineligibility for prizes. </p><p>On a related note, if we have reason to believe that a player has intentionally submitted duplicate entries for the purpose of receiving more prizes or manipulating the leaderboards in any way, we will remove that player and all submissions we believe to be associated with them. We want this to be fair for everyone.</p><h2>Prize Distribution</h2><p>Different sponsors require different ways of claiming their prizes, and we will work with winners to ensure they are able to redeem their prizes in a timely fashion. For cash prizes, we will deliver the money via PayPal. We will not ship checks, money orders, or cash through the mail. We will assume reasonable international money transfer costs to deliver cash prizes through Paypal.</p><p>Winners are responsible for any taxes associated with claiming their prizes. CodeCombat is not responsible for filing paperwork on behalf of winners for tax claims. </p><h2>Contact</h2><p>If you have any questions or would like to get in touch with us for any other reason, we can be reached at team@codecombat.com. You can also post to our public <a href=\"http://discourse.codecombat.com/\">Discourse forum</a>.</p></div>");
}
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<div id=\"winners\" class=\"tab-pane well\"><h1 data-i18n=\"ladder.winners\">Winners</h1><table class=\"table table-hover table-condensed\"><thead><tr><th data-i18n=\"ladder_prizes.rank\">Rank</th>");
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<th></th>");
}
buf.push("<th>Human</th>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<th>Human wins/losses/ties</th>");
}
else
{
buf.push("<th>Human score</th>");
}
if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<th></th>");
}
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<th></th>");
}
buf.push("<th>Ogre</th>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<th>Ogre wins/losses/ties</th>");
}
else
{
buf.push("<th>Ogre score</th>");
}
buf.push("<th data-i18n=\"play.spectate\">Spectate</th></tr></thead><tbody>");
// iterate view.winners.humans
;(function(){
  var $$obj = view.winners.humans;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var human = $$obj[index];

var ogre = view.winners.ogres[index]
buf.push("<tr> <td>" + (jade.escape(null == (jade.interp = human.rank) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + human.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(human.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = human.name) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td><span class=\"win\">" + (jade.escape(null == (jade.interp = human.wins) ? "" : jade.interp)) + "</span> - <span class=\"loss\">" + (jade.escape(null == (jade.interp = human.losses) ? "" : jade.interp)) + "</span> - ");
if ( view.level.get('name') == 'Greed')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 377 - human.wins - human.losses) ? "" : jade.interp)) + "</span>");
}
else if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 108 - human.wins - human.losses) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
}
else
{
buf.push("<td><span>" + (jade.escape(null == (jade.interp = Math.round(100 * human.score)) ? "" : jade.interp)) + "</span></td>");
}
if ( ogre)
{
if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<td>" + (jade.escape(null == (jade.interp = ogre.rank) ? "" : jade.interp)) + "</td>");
}
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + ogre.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(ogre.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = ogre.name) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td><span class=\"win\">" + (jade.escape(null == (jade.interp = ogre.wins) ? "" : jade.interp)) + "</span> - <span class=\"loss\">" + (jade.escape(null == (jade.interp = ogre.losses) ? "" : jade.interp)) + "</span> - ");
if ( view.level.get('name') == 'Greed')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 407 - ogre.wins - ogre.losses) ? "" : jade.interp)) + "</span>");
}
else if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = Math.max(0, 163 - ogre.wins - ogre.losses)) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
}
else
{
buf.push("<td><span>" + (jade.escape(null == (jade.interp = Math.round(100 * ogre.score)) ? "" : jade.interp)) + "</span></td>");
}
buf.push("<td><a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=" + human.sessionID + "&session-two=" + ogre.sessionID), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a></td>");
}
else
{
buf.push("<td></td><td></td><td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var human = $$obj[index];

var ogre = view.winners.ogres[index]
buf.push("<tr> <td>" + (jade.escape(null == (jade.interp = human.rank) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + human.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(human.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = human.name) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td><span class=\"win\">" + (jade.escape(null == (jade.interp = human.wins) ? "" : jade.interp)) + "</span> - <span class=\"loss\">" + (jade.escape(null == (jade.interp = human.losses) ? "" : jade.interp)) + "</span> - ");
if ( view.level.get('name') == 'Greed')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 377 - human.wins - human.losses) ? "" : jade.interp)) + "</span>");
}
else if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 108 - human.wins - human.losses) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
}
else
{
buf.push("<td><span>" + (jade.escape(null == (jade.interp = Math.round(100 * human.score)) ? "" : jade.interp)) + "</span></td>");
}
if ( ogre)
{
if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<td>" + (jade.escape(null == (jade.interp = ogre.rank) ? "" : jade.interp)) + "</td>");
}
if ( view.level.get('name') == 'Criss-Cross' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + ogre.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(ogre.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = ogre.name) ? "" : jade.interp)) + "</td>");
if ( view.level.get('name') == 'Greed' || view.level.get('name') == 'Zero Sum')
{
buf.push("<td><span class=\"win\">" + (jade.escape(null == (jade.interp = ogre.wins) ? "" : jade.interp)) + "</span> - <span class=\"loss\">" + (jade.escape(null == (jade.interp = ogre.losses) ? "" : jade.interp)) + "</span> - ");
if ( view.level.get('name') == 'Greed')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = 407 - ogre.wins - ogre.losses) ? "" : jade.interp)) + "</span>");
}
else if ( view.level.get('name') == 'Zero Sum')
{
buf.push("<span class=\"tie\">" + (jade.escape(null == (jade.interp = Math.max(0, 163 - ogre.wins - ogre.losses)) ? "" : jade.interp)) + "</span>");
}
buf.push("</td>");
}
else
{
buf.push("<td><span>" + (jade.escape(null == (jade.interp = Math.round(100 * ogre.score)) ? "" : jade.interp)) + "</span></td>");
}
buf.push("<td><a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=" + human.sessionID + "&session-two=" + ogre.sessionID), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a></td>");
}
else
{
buf.push("<td></td><td></td><td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div>");
}
if ( view.level.get('name') == 'Ace of Coders')
{
buf.push("<div id=\"winners\" class=\"tab-pane well\"><h1 data-i18n=\"ladder.winners\">Winners</h1><table class=\"table table-hover table-condensed\"><thead><tr><th data-i18n=\"ladder_prizes.rank\">Rank</th><th></th><th data-i18n=\"general.player\">Player</th><th>Wins</th><th>Losses</th><th data-i18n=\"play.spectate\">Spectate</th></tr></thead><tbody>");
// iterate view.winners.humans
;(function(){
  var $$obj = view.winners.humans;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

buf.push("<tr> <td>" + (jade.escape(null == (jade.interp = player.rank) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + player.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(player.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td><td>" + (jade.escape(null == (jade.interp = player.name) ? "" : jade.interp)) + "</td><td><span class=\"win\">" + (jade.escape(null == (jade.interp = player.wins) ? "" : jade.interp)) + "</span></td><td><span class=\"loss\">" + (jade.escape(null == (jade.interp = player.losses) ? "" : jade.interp)) + "</span></td><td>");
if ( player.team == "ogres")
{
buf.push("<a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=55df8c9207d920b7e4262f33" + "&session-two=" + player.sessionID), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=" + player.sessionID + "&session-two=55e1d23686c019bc47b640fe"), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a>");
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

buf.push("<tr> <td>" + (jade.escape(null == (jade.interp = player.rank) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + player.codeLanguage + "_icon.png)"), 'title':(_.string.capitalize(player.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td><td>" + (jade.escape(null == (jade.interp = player.name) ? "" : jade.interp)) + "</td><td><span class=\"win\">" + (jade.escape(null == (jade.interp = player.wins) ? "" : jade.interp)) + "</span></td><td><span class=\"loss\">" + (jade.escape(null == (jade.interp = player.losses) ? "" : jade.interp)) + "</span></td><td>");
if ( player.team == "ogres")
{
buf.push("<a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=55df8c9207d920b7e4262f33" + "&session-two=" + player.sessionID), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':("/play/spectate/" + view.level.get('slug') + "?session-one=" + player.sessionID + "&session-two=55e1d23686c019bc47b640fe"), 'data-i18n':("ladder.watch_battle") }, {"href":true,"data-i18n":true})) + ">Watch the battle</a>");
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div>");
}
buf.push("</div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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
//# sourceMappingURL=/javascripts/app/templates/play/ladder/ladder.js.map