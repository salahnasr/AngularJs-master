<?php
session_start();
require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "envato"; //Twitter Username
$notweets = 30;
/*$consumerkey = "12345"; //Consumer Key
$consumersecret = "123456789";//Consumer Secret
$accesstoken = "123456789"; //Access Token
$accesstokensecret = "12345"; //Access Token Secret*/

$consumerkey = "4NGoRGmC6TExRSwWHszvA"; //Consumer Key
$consumersecret = "DeK2YL015mzmlVzqhmypbuFkDV0LpqMLOcr6sK14";//Consumer Secret
$accesstoken = "725398927-mWbuCKAWMctlTcYfSdVfbpgHT3JDyo95s82gV9VT"; //Access Token
$accesstokensecret = "euMeZF1SPWSeeTKUDXoSfBNgw4LiJRPHo8AxmvLqcImmQ"; //Access Token Secret

 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
  
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>