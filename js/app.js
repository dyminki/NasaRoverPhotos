$(function() {
    const mainPhoto = 'https://images-api.nasa.gov/asset/PIA11132';
    const marsPhotos = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2100&api_key=YKRI5DRrCDyY0MVqZSINa07GYQlectzMMsmGwkWY';

    let showedPhotos = 0;

    function phtotsOnScroll(allPhotos) {
        window.onscroll = function(e) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                if(!allPhotos){
                    return;
                }else{
                    marsGallery(allPhotos);
                }           
            }
        };
    }

    function marsGallery(pic){
        let amountPicturesToShow = 6;
        for(let i = showedPhotos; i < amountPicturesToShow + showedPhotos; i++) {
            let photo = pic.photos[showedPhotos].img_src;
            let newEl = $(`
            <img src=${photo} class="photo"></img>`);
            $('.section-second').append(newEl);
        }
        showedPhotos = showedPhotos + amountPicturesToShow;
    };
    
    function background(data) {
        const bg = data.collection.items[0].href;
        $('.section-first').css('background-image', `url(${bg})`);
    }

    $.ajax({
        url: mainPhoto,
    }).done(function(titlePhoto) {
        background(titlePhoto);
    }).fail(function(error) {
        console.log(error);
    });

    $.ajax({
        url: marsPhotos,
    }).done(function(pic) {
        phtotsOnScroll(pic)
    }).fail(function(error) {
        console.log(error);
    });
});