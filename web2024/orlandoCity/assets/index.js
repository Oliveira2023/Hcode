(()=>{
    const drawer = document.querySelector('#drawer') 
    document.querySelectorAll('[data-drawer="open"]').forEach((item)=>{
        item.addEventListener('click', ()=>{
            if (drawer){
                drawer.classList.add('opened')
                console.log('drawer')
            }
            
        })
    })
    document.querySelectorAll('[data-drawer="close"]').forEach((item)=>{
        item.addEventListener('click', ()=>{
            if (drawer){
                drawer.classList.remove('opened')
            }
        })
    })
    document.querySelectorAll('[data-drawer="toggle"]').forEach((item)=>{
        item.addEventListener('click', ()=>{
            if (drawer){
                drawer.classList.toggle('opened')
            }
        })
    })

    const player = document.querySelector('.player')
    const video = player.querySelector('video')

    if (video){
        video.addEventListener('play', ()=>{
            if (player){
                player.classList.add('playing')
            }
            video.setAttribute('controls', 'controls')
        })
        video.addEventListener('pause', ()=>{
            if (player){
                player.classList.remove('playing')
            }
            video.removeAttribute('controls')
        })
    }
    if(player) {
        player.querySelector(".overlay").addEventListener('click', ()=>{
            if (video){
                video.paused ? video.play() : video.pause()
            }
        })
    }

})()

