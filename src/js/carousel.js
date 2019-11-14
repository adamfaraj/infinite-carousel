export const infiniteCarousel = function () {
  var dom;
  
  var imageArray = [];

  //initialize the module
  var init = function() {
    console.clear();
    cacheDOM();
    bindEventHandlers();
    insertImages(imageArray);
  };

  var initImages = () => {

    imageArray[0] = new Image();
    imageArray[0].src = "https://drivetribe.imgix.net/DYFyKEi7TF-VdelzIO1hQw?w=500&h=281&fm=pjpg&auto=compress&fit=crop&crop=faces";

    imageArray[1] = new Image();
    imageArray[1].src = "https://images.squarespace-cdn.com/content/v1/52d46dd9e4b0f63bcb07fa01/1498619786666-U2OTPN3QALSTTMB1BOC8/ke17ZwdGBToddI8pDm48kHJjM-Evnp5g-1kf5Yv15cUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcpWKe3KzaCrFDKPR1a1Ob8xobjReaxMuaKtrvUDoDmPO9EsdBHei1w8jR6w0UZiby/tumblr_nwvwieh5Pu1tmvlkuo1_1280.jpg";

    imageArray[2] = new Image();
    imageArray[2].src = "https://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2015/08/11083002/2015-DA-Spotlight-James-Deane-S14-PMcG-1-1200x800.jpg";
    
    imageArray[3] = new Image();
    imageArray[3].src = "https://news.formulad.com/wordpress/wp-content/uploads/2018/05/forrestwang-600x400.jpg"
  };

  initImages();
  
  //caching the DOM
  var cacheDOM = function() {
    dom = {};
    dom.topContainer = document.getElementsByClassName('top-container')[0];
    dom.imageContainer = document.getElementsByClassName('image-container')[0];
    
    if (imageArray.length > 0) {
      dom.image = document.getElementsByClassName('image');
    }
    dom.left = document.querySelector(".left");
    dom.right = document.querySelector(".right");
  };

  //define event handlers
  var bindEventHandlers = function() {
    dom.left.addEventListener("click", onLeftClicked);
    dom.right.addEventListener("click", onRightClicked);
  };

  var insertImages = (array) => {
    // debugger;
    let topContainerWidth = 0;
    while (dom.imageContainer.firstChild) {
      dom.imageContainer.removeChild(dom.imageContainer.firstChild);      
    }

    array.forEach((image, i) => {
      let img = document.createElement('img');
      img.src = image.src;
      img.classList.add('image');
      dom.imageContainer.append(img);
      topContainerWidth += img.width;
      // dom.imageContainer.append(img[imageArray.length - 1]);
    })
    dom.topContainer.style.width = `${topContainerWidth}px`;
    readyLastImage();
  }
  
  var readyLastImage = (lastImage) => {
    if (lastImage === undefined) {
      lastImage = dom.imageContainer.lastChild.cloneNode();
    }
    lastImage.classList.add('image', 'last-image');
    dom.imageContainer.insertBefore(lastImage, dom.imageContainer.firstChild);
    dom.imageContainer.firstChild.style.marginLeft = `-${dom.imageContainer.lastChild.width}px`;
  }

  //when user clicks left arrow
  var onLeftClicked = function() {
    dom.imageContainer.firstChild.classList.remove('left-clicked');
    dom.imageContainer.append(dom.imageContainer.firstChild.cloneNode());
    
    // dom.imageContainer.style.margin = '0';
    dom.imageContainer.childNodes.forEach(node => {
      node.classList.remove('right-clicked');
    });
    dom.imageContainer.childNodes[1].classList.add('left-clicked');
    

    dom.imageContainer.removeChild(dom.imageContainer.firstChild);
    
    // dom.imageContainer.style.marginLeft = "500px";
    
    // imageArray.unshift(imageArray[imageArray.length - 1]);
    // imageArray.pop();
  };

  //when user clicks right arrow
  var onRightClicked = function() {

    dom.imageContainer.animate([
        { transform: 'translateX(0px)' },
        { transform: `translateX(${dom.imageContainer.lastChild.width}px)` },
      ], {
        duration: 500,
        fill: 'none'
    });

    setTimeout(function() {
      dom.imageContainer.removeChild(dom.imageContainer.lastChild);

      let lastImage = dom.imageContainer.lastChild.cloneNode();
      let hiddenImage = document.getElementsByClassName('last-image')[0];

      hiddenImage.style.marginLeft = '0';
      hiddenImage.classList.remove('last-image');
      readyLastImage(lastImage);
    }, 500);
  };

  //run this module!
  init();
};
