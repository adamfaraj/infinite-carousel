import { infiniteCarousel } from './carousel.js';

let imageArray = [
  'https://drivetribe.imgix.net/DYFyKEi7TF-VdelzIO1hQw?w=500&h=281&fm=pjpg&auto=compress&fit=crop&crop=faces', 
  'https://images.squarespace-cdn.com/content/v1/52d46dd9e4b0f63bcb07fa01/1498619786666-U2OTPN3QALSTTMB1BOC8/ke17ZwdGBToddI8pDm48kHJjM-Evnp5g-1kf5Yv15cUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcpWKe3KzaCrFDKPR1a1Ob8xobjReaxMuaKtrvUDoDmPO9EsdBHei1w8jR6w0UZiby/tumblr_nwvwieh5Pu1tmvlkuo1_1280.jpg',
  'https://news.formulad.com/wordpress/wp-content/uploads/2019/05/1-1-600x400.jpg', 'https://news.formulad.com/wordpress/wp-content/uploads/2018/05/forrestwang-600x400.jpg'];

let duration = 10000;

infiniteCarousel(imageArray, duration);
