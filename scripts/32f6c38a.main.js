var fantasyDB=new Firebase("https://bestfantasy-football.firebaseio.com/"),fantasyFootball=function(){var a=function(a,b){var c;console.log(a.val()),Object.keys(a.val()[b]).forEach(function(a){c+="<option value='"+a+"'>"+a+"</option>"}),$("#"+b).append(c)},b=function(){fantasyDB.once("value",function(b){a(b,"actions"),a(b,"objects"),a(b,"subjects"),a(b,"adjectives")})},c=function(a,b){var c=b.val()[a][$("#"+a).val()].split(",");return c[Math.floor(Math.random()*c.length)]},d=function(a){var b="";b+=c("actions",a)+" ",b+=c("objects",a)+" ",b+=c("subjects",a)+" ",b+=c("adjectives",a),$("#team-name-hero").text(b)},e=function(){b(),$("#submit").on("click",function(){fantasyDB.once("value",function(a){d(a)})})};return{init:e,makeTitle:d}}();$(document).ready(function(){fantasyFootball.init()});