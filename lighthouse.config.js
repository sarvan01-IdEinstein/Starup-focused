module.exports = {
  "extends": "lighthouse:default",
  "settings": {
    "onlyAudits": [
      "first-contentful-paint",
      "largest-contentful-paint",
      "first-meaningful-paint",
      "speed-index",
      "interactive",
      "cumulative-layout-shift",
      "total-blocking-time"
    ],
    "output": [
      "json",
      "html"
    ],
    "outputPath": "./audit-results/lighthouse/"
  }
};