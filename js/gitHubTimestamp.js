var baseURL = 'https://api.github.com/';

var getGitHubTimestampPromise = function (project) {
  var requestURL = buildRequestURL(project);

  if (!requestURL) {
    return Promise.resolve({
      timestamp: 0,
      error: '400: unable to build valid GitHub request URL'
    });
  } else {
    return new Promise(function (resolve) {
      var onSuccess = function (data) {
        var dateStr = data.commit.commit.committer.date;
        var timestamp = new Date(dateStr);
        resolve({
          timestamp: timestamp,
          error: null
        });
      };

      // if there's an error, use zero as a sentinel value
      var onFailure = function (error) {
        resolve({
          timestamp: 0,
          error: error.status.toString() + ': ' + error.statusText
        });
      };

      $.get(requestURL).then(onSuccess, onFailure);
    });
  }
};

var buildRequestURL = function (project) {
  var parse = parseOwnerAndRepoFromLink(project.link);

  if (!parse) {
    return null;
  } else {
    return baseURL.concat('repos/', parse.owner, '/', parse.repo, '/branches/master');
  }
};

var parseOwnerAndRepoFromLink = function (link) {
  // I'm not saying this regex is 100% robust,
  // but it should cover most cases, feel free to update
  var regex = /github\.com\/([\w-]+)\/([\w-]+)/;

  var matches = link.match(regex);

  if (!matches) {
    return null;
  } else {
    return {
      owner: matches[1],
      repo: matches[2]
    };
  }
};
