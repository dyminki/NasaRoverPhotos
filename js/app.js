$(function() {
    const mainPhoto = 'https://images-api.nasa.gov/asset/PIA11132';
    const inputBtn = $('#input-submit');
    let inputTxt = $('#input-txt');
    let showedPhotos = 0;
    let marsPhotos;
    let photos;
    
    function getSol() {
        let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + inputTxt.val() + '&api_key=YKRI5DRrCDyY0MVqZSINa07GYQlectzMMsmGwkWY';

        if(marsPhotos !== url){
            marsPhotos = url;
            clearGallery();
        }

        $.ajax({
            url: marsPhotos,
        }).done(function(pic) {
            photos = pic;
            marsGallery(photos);
            phtotsOnScroll(photos)
        }).fail(function(error) {
            console.log(error);
        });
        inputTxt.val('')
    }
    
    function clearGallery(){
        $('.section-second').empty();
    }

    function enterForPictures (e){
        if (e.which === 13){
            getSol()
        }
    }
    inputBtn.on('click', getSol);
    inputTxt.on('keypress', enterForPictures);
    
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
        if(!pic.photos[showedPhotos]){
            return;
        }
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
});