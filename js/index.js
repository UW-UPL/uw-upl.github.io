$(document).ready(function() {
    function pickName() {
        var names = [
          'Undergraduate Projects Lab',
          'Undergraduate Pickle Lab',
          'Undergraduate Penguin Lab',
        ];

        var index = Math.floor(Math.random() * names.length);
        return names[index];
    }

    $('.upl-title').click(function() {
        $('.upl-title').text(pickName());
    });
})
