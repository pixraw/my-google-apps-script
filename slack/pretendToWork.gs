var SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
var SLACK_VERIFY_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_VERIFY_TOKEN');
function doPost(e) {
  var param = e.parameter;
  // Verify slack post
  if (SLACK_VERIFY_TOKEN !== param.token) {
    throw new Error("invalid token.");
  }
  var text = param.text;
  var username = "@" + param.user_name;
  var slackApp = SlackApp.create(SLACK_ACCESS_TOKEN);
  var channelId = e.parameter.channel_id;
  var message = "";
  if (text.match(/良さそう|よさそう|よさげ/)) {
    message = username + "\n:muscle:";
  }
  if (text.match(/承知|かしこ/)) {
    message = username + "\n:sparkles:"
  }
  if (text.match(/すみません|ごめん|申し訳|pull|お願い/)) {
    message = username + "\n:ok_hand:"
  }
  if (text.match(/ありがとう|有難う/)) {
    message = username + "\nこちらこそ有難う御座います:sparkles:";
  }
  if (text.match(/\?|？/)) {
    message = username + "\n調べてみるので、少々お時間頂きます:pray:\n\n>" + text;
  }
  var options = {
    as_user: true,
    link_names: 1
  };
  if (message) {
    slackApp.postMessage(channelId, message, options);
  }
}