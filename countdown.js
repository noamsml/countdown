(function() {
  var $ = document.getElementById.bind(document);
  var show = {}
  var denoms = {
    'weeks' : 1000 * 24 * 3600 * 7,
    'days' : 1000 * 24 * 3600,
    'hours': 1000 * 3600,
    'minutes': 1000 * 60,
    'seconds': 1000
  }
  var countdownTo;

  function zeroPaddedInt(n, width) {
    n = '' + Math.floor(n);
    if (n.length >= width) {
      return n;
    }

    return '0'.repeat(width - n.length) + n;
  }

  function onGo() {
    Object.keys(denoms).forEach(function (denom) {
      show[denom] = $(denom + '-option').checked;

      if (!show[denom]) {
        $(denom + '-show').style.display = 'none';
      }
    })

    if (!(show['hours'] && (show['minutes'] || show['seconds']))) {
      $('hours-spacer').style.display = 'none';
    }

    if (!(show['seconds'] && show['minutes'])) {
      $('minutes-spacer').style.display = 'none';
    }

    $('prompt').style.display = 'none';
    $('countdown').style.display = 'block';
    $('title').innerText = $('name').value;

    countdownTo = $('date').valueAsNumber;

    setInterval(everySecond, 1000);
    everySecond();

    return true;
  }

  function everySecond() {
    var seconds = countdownTo - Date.now();
    Object.keys(denoms).forEach(function (denom) {
      if (show[denom]) {
        $(denom + '-display').innerText = "" +
          zeroPaddedInt(seconds / denoms[denom], 2);
        seconds = seconds % denoms[denom];
      }
    })
  }

  function onLoad() {
    $('go').addEventListener('click', onGo);

    console.log('loaded');
  }

  documentOnLoad = onLoad;
})()
