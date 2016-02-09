/* Emoji directive for better use-friendliness
 * original: <i class='em em-dog'></i> (ewwww...)
 * examples:
 * <emoji name='em-bug'></emoji>
 * <emoji name='bear'></emoji> (doesn't need `em-` prefix)
 * NOTE: this does not replace the <emoji> element, but rather embeds the <i>
 * element within the <emoji> element
 */
angular.module('upl-site')
.directive('emoji', [function() {
  return {
    // only <emoji> tag supported
    restrict: 'E',
    template: function(_elem, attrs) {
      var emojiName = attrs.name;

      // don't do anything if it's empty
      if (!emojiName) {
        return '';
      } else if (!emojiName.startsWith('em-')) {
        emojiName = 'em-' + emojiName;
      }

      return '<i class="em ' + emojiName + '"></i>';
    }
  };
}]);
