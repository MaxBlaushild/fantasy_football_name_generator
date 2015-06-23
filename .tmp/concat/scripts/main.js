var fantasyDB = new Firebase('https://bestfantasy-football.firebaseio.com/');

var fantasyFootball = (function(){

  var _selectPopulator = function(snapshot, wordage){
    var html;
    console.log(snapshot.val());
    Object.keys(snapshot.val()[wordage]).forEach(function(category){
      html += "<option value='" + category + "'>" + category + "</option>";
    });
    $('#' + wordage).append(html);
  };

  var _categoriesFromDB = function(){
    fantasyDB.once('value', function(snapshot){
      _selectPopulator(snapshot, "actions");
      _selectPopulator(snapshot, "objects");
      _selectPopulator(snapshot, "subjects");
      _selectPopulator(snapshot, "adjectives");
    });
  };

  var getWord = function(wordage, snapshot){
    var array = snapshot.val()[wordage][$('#' + wordage).val()].split(',');
    return array[Math.floor(Math.random() * array.length)];
  };

  var makeTitle = function(snapshot){
    var title = '';
    title += getWord("actions", snapshot) + ' ';
    title += getWord("objects", snapshot) + ' ';
    title += getWord("subjects", snapshot) + ' ';
    title += getWord("adjectives", snapshot);
    $('#team-name-hero').text(title);
  };

  var init = function(){
    _categoriesFromDB();
    $('#submit').on('click', function(){
      fantasyDB.once('value', function(snapshot){
        makeTitle(snapshot);
      });
    });
  };

  return {
    init: init,
    makeTitle: makeTitle
  };

})();

$(document).ready(function(){
  fantasyFootball.init();
});
