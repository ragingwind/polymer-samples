(function() {

  function showDebugMenu() {
    var debugMenu = document.createElement('div');
    var baseUrl = 'https://github.com/ragingwind/polymer-samples/blob/master/demo/';
    var redirectUrl = baseUrl + location.href.split('/').pop();

    debugMenu.innerHTML = [
      '<hr>',
      '<div>',
      '<sub><a target="blank" href="' + redirectUrl + '">Go to source at github</a></sub>',
      '</div>'
    ].join('\n');
    document.body.appendChild(debugMenu);
  }

  this.showSource = function() {
    console.log(location.href);
    console.log(document.body.innerHTML);
  };

  document.addEventListener('WebComponentsReady', function() {
    showDebugMenu();
  })

}.call(this));
