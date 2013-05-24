// $(document).ready(function()
// {
//     var sound = new Howl
//     ({
//         // urls:     [ 'sounds/error.mp3',  'sounds/error.ogg'  ],
//         urls:     [ 'sounds/shturo.mp3', 'sounds/shturo.ogg' ],
//         // autoplay: true,
//     });
//
//     $('#play').click(function()
//     {
//         sound.play();
//     });
//
//     $('#pause').click(function()
//     {
//         sound.pause();
//     });
// });

$(document).ready(function()
{
    'use strict';
    setup();

    var now = new Date();

    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();

    var update_time = function()
    {
        $('#hours').html(sprintf("%02d", hh));
        $('#minutes').html(sprintf("%02d", mm));
        $('#seconds').html(sprintf("%02d", ss));
        if (ss == 0) { say_time(hh, mm); }

        ss++;
        if (ss > 59)
        {
            ss = 0;
            mm++;
            if (mm > 59)
            {
                mm = 0;
                hours++;
                if (hours > 23) { hours = 0; }
            }
        }
    };

    update_time();
    setInterval(function()
    {
        console.log(hh + ':' + mm + ':' + ss);
        update_time();
    }, 1000);
});

var gv_voice = 'en_google_guy';

function setup()
{
    $('#theme-select').change(function()
    {
        var theme = $(this).val();
        if (theme === 'bogus') { return; }
        $.fn.styleSwitch(theme);
    });

    $('#voice-select').change(function()
    {
        var voice = $(this).val();
        if (voice === 'bogus') { return; }
        gv_voice = voice;
    });

    $('#say-time').click(function() { handle_time($('#time').val()); });
}

function handle_time(time)
{
    var [ hh, mm ] = time.split(':');
    // console.log(hh, ':', mm);
    say_time(hh, mm);
}


// var hours = 0;
// var minutes = 0;
// setInterval(function()
// {
//     play_sound_with_delay(hours, 0);
//     play_sound_with_delay(minutes, 750);
//     hours++;
//     hours = hours > 23 ? 0 : hours;
//     minutes++;
//     minutes = minutes > 59 ? 0 : minutes;
// }, 2000);
function say_time(hh, mm)
{
    var delay_before_hours   = 0 * 1000; // seconds
    var delay_before_minutes = 0.75 * 1000; // seconds

    play_sound_with_delay(hh, delay_before_hours);
    if (mm != 0) { play_sound_with_delay(mm, delay_before_minutes); }
}

function play_sound_with_delay(soundname, delay)
{
    setTimeout(function()
    {
        new Howl
        ({
            urls:     [ 'sounds/' + gv_voice + '/' + soundname + '.mp3', 'sounds/' + gv_voice + '/' + soundname + '.ogg' ],
            // autoplay: true,
        }).play();
    }, delay);
}
