function flv_load(element, url) {
    var i;
    var mediaDataSource = {
        type: 'flv',
        isLive: true,
        hasAudio: true,
        hasVideo: true
    };
    mediaDataSource['url'] = url;
    // console.log('MediaDataSource', mediaDataSource);
    flv_load_mds(element, mediaDataSource);
}

function flv_load_mds(element, mediaDataSource) {
    if (typeof player !== "undefined") {
        if (player != null) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
            player = null;
        }
    }
    player = flvjs.createPlayer(mediaDataSource, {
        enableWorker: false,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range',
    });
    player.attachMediaElement(element);
    player.load();
}