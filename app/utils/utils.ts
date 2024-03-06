export const convertSectoHms = (seconds: number) => {
  seconds = Number(seconds);

  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);

  var hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) : "00";
  var mDisplay = m > 0 ? (m < 10 ? `0${h}` : m) : "00";
  var sDisplay = s > 0 ? (s < 10 ? `0${h}` : s) : "00";
  return `${hDisplay} :${mDisplay} :${sDisplay}`;
};

export const converSecToMin = (seconds: number) => {
  seconds = Number(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);
  var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
  return mDisplay;
};

export const numSum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);
