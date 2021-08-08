var critical = require('critical');

critical.generate({
        inline: true,
        src: 'demo/index-raw.html',
        target: {
                html: 'demo/index.html',
                css: 'critical.css', // output inline critical css
        },
        // Critial auto detects all css files
        ignore: {
                atrule: ['@font-face'], // already preloaded
        },
});