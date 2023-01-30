(() => {
  const pin = process.env.HWVERSION === 2 ? D3 : D30;

  var id;
  Bangle.on('charging', (charging) => {
    if (charging) {
      if (!id) {
        var max = 0;
        var count = 0;
        id = setInterval(() => {
          var battlvl = analogRead(pin);
          if (max < battlvl) {
            max = battlvl;
            count = 0;
          } else {
            count++;
            if (10 <= count) {  // 10 * 30s == 5 min  // TODO ? customizable
              // TODO ? customizable
              Bangle.buzz(500);
              setTimeout(() => Bangle.buzz(500), 1000);
            }
          }
        }, 30*1000);
      }
    } else {
      if (id) {
        clearInterval(id);
        id = undefined;
      }
    }
  });
})();