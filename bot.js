console.log('Hello, the bot just woke up!');

var
	twt = require('twit'),
	config = require("./config");

var Twitter = new twt(config.auth);
var wd = require("word-definition");

var mentions = function() {

	var stream = Twitter.stream('user');
	stream.on('tweet', function(data) {

		let username = data.user.screen_name;
		let msg = data.text;

		// 단어를 찾는가?
		let word = new RegExp(/([\w]+) 뜻/i);
		let found = word.exec(msg);
		if ( found ) {
			console.log(found[1]);
			// console.log("S(H)e wants me to find word definition of ",word);
			language = "en";
			wd.getDef(found[1], language, null, function(def) {
				// console.log(def.word + ": " + def.definition + " @" + username);
				Twitter.post('statuses/update', {
					status: def.word + ": " + def.definition + " @" + username
				});
				console.log("Replied word definition!")
			});
		}

	});
}

mentions();
setInterval(mentions, 5000);