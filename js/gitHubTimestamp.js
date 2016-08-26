var baseURL = 'https://api.github.com/';

var getGitHubTimestamp = function (project) {
  var requestURL = buildRequestURL(project);

  return new Promise(function(resolve, reject) {
    var onSuccess = function(data) {
      resolve(data.commit.commit.committer.date);
    };

    var onFailure = reject;

    $.get(requestURL).then(onSuccess, onFailure);
  });
};

var buildRequestURL = function(project) {
  var parse = parseOwnerAndRepoFromLink(project.link);

  return baseURL.concat('repos/', parse.owner, '/', parse.repo, '/branches/master');
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