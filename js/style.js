$(function(){
    let localStream;
    // カメラ映像取得
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      // 成功時にvideo要素にカメラ映像をセットし、再生
      const videoElm = document.getElementById('my-video');
      videoElm.srcObject = stream;
      videoElm.play();
      // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
      localStream = stream;
    }).catch( error => {
      // 失敗時にはエラーログを出力
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
    const peer = new Peer({
    key: '51b3faa6-db69-418b-8cc3-ef30f2809c53',
    debug: 3
     });
     peer.on('open', () => {
        document.getElementById('my-id').textContent = peer.id;
    });
    document.getElementById('make-call').onclick = () => {
        const theirID = document.getElementById('their-id').value;
        const mediaConnection = peer.call(theirID, localStream);
        setEventListener(mediaConnection);
    };
    const setEventListener = mediaConnection => {
        mediaConnection.on('stream', stream => {
          // video要素にカメラ映像をセットして再生
          const videoElm = document.getElementById('their-video')
          console.log(videoElm);
          videoElm.srcObject = stream;
          videoElm.play();
        });
      }
      peer.on('call', mediaConnection => {
        mediaConnection.answer(localStream);
        addEventListener(mediaConnection);
      });
    });
