(function() {

  function showDebugMenu() {
    var debugMenu = document.createElement('div');
    debugMenu.innerHTML = [
      '<hr>',
      '<div>',
      '<sub><a href="#" onclick="showSource()">Show source to console</a></sub>',
      '</div>'
    ].join('\n');
    document.body.appendChild(debugMenu);
  }

  this.showSource = function() {
    console.log(document.body.innerHTML);
  };

  document.addEventListener('WebComponentsReady', function() {
    showDebugMenu();
  })

}.call(this));
