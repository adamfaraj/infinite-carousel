export const infiniteCarousel = function (array, duration) {
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

    array.forEach((img, i) => {
      imageArray[i] = new Image();
      imageArray[i].src = img;
    })
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
    })

    dom.topContainer.style.width = `${topContainerWidth}px`;
    readyLastImage();
  }
  
  var readyLastImage = (lastImage) => {
    if (lastImage === undefined) {
      lastImage = dom.imageContainer.lastChild.cloneNode();
      lastImage.style.marginLeft = `-${dom.imageContainer.lastChild.width}px`;
    }
    lastImage.classList.add('image', 'last-image');
    dom.imageContainer.insertBefore(lastImage, dom.imageContainer.firstChild);
    // dom.imageContainer.firstChild.style.marginLeft = `-${dom.imageContainer.lastChild.width}px`;
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
    debugger;

    dom.imageContainer.animate([
        { transform: 'translateX(0px)' },
        { transform: `translateX(${dom.imageContainer.lastChild.width}px)` },
      ], {
        duration: duration,
        fill: 'forwards'
    });

    setTimeout(function() {
      dom.imageContainer.removeChild(dom.imageContainer.lastChild);

      let lastImage = dom.imageContainer.lastChild.cloneNode();
      let hiddenImage = document.getElementsByClassName('last-image')[0];

      hiddenImage.style.marginLeft = '0';
      // dom.imageContainer.style.marginLeft = `-${dom.imageContainer.lastChild.width}px`;
      hiddenImage.classList.remove('last-image');
      lastImage.style.marginLeft = `-${dom.imageContainer.lastChild.width}px`;

      readyLastImage(lastImage);

      dom.imageContainer.animate([
        { transform: `translateX(${dom.imageContainer.lastChild.width}px)`},
        { transform: 'translate(0px)' },
      ], {
        duration: 0,
        fill: 'none'
      });
    }, (duration));
  };

  //run this module!
  init();
};
