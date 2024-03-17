





// slide bar 
function toggleActiveClass(){
  hamburgerButton.classList.toggle('hamburger_active');
  menuLinksContainer.classList.toggle('menuLinks_active')
}

const hamburgerButton = document.querySelector('[data-hamburger]');
const menuLinksContainer = document.querySelector('[data-menulinks]')
const menuLinks = [...menuLinksContainer.children]
hamburgerButton.addEventListener('click', toggleActiveClass)

menuLinks.forEach(link => {
  link.addEventListener('click', toggleActiveClass)
})
 

// text animation


window.addEventListener('scroll', textReveal);

function textReveal(){

  revealElements = document.querySelectorAll('.reveal');
  

  revealElements.forEach(element => {
    let windowHeight = window.innerHeight;
    let elementTop = element.getBoundingClientRect().top;
    let revealPoint =  30;
    if(elementTop+revealPoint < windowHeight){
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  })
 
  

}

textReveal();







//  --------------- Reviews SlidBar---------------

function currentSnapReview(){
  let boxWidth = reviewsBoxs[0].getBoundingClientRect().width;
  
   const boxesLeftPosition = Array.from(reviewsBoxs).map(review => review.getBoundingClientRect().left);
   const currentReviewIndex = boxesLeftPosition.findIndex(boxposition => (boxposition <= boxWidth && boxposition > -50));
   
   anchorDots.forEach((dot,index) =>{
    if(index==currentReviewIndex){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active');
    }
   })
}

function enableScrollSnap(){
  reviewsContainer.style.scrollSnapType = 'x mandatory'
  reviewsContainer.scrollBehavior = 'smooth'
}
function disableScrollSnap(){
  reviewsContainer.style.scrollSnapType = 'none';
  reviewsContainer.scrollBehavior = 'none'
}



const anchorDots = document.querySelectorAll('.dot');
const reviewsContainer = document.querySelector('.second-reviews-container');
const reviewsBoxs = document.querySelectorAll('[data-review]')
let startX, scrollLeft;
let isDown = false;
const prevReview = document.getElementById('prevReview');
const middleReview = document.getElementById('middleReview');
const nextReview = document.getElementById('nextReview');
currentSnapReview();


reviewsContainer.addEventListener('mousedown', (e)=>{
  startX = e.clientX - reviewsContainer.offsetLeft;
  isDown = true;
  scrollLeft = reviewsContainer.scrollLeft;
  disableScrollSnap();
})

reviewsContainer.addEventListener('mouseup', ()=>{
  isDown = false;
  enableScrollSnap();
  // currentSnapReview();
})

reviewsContainer.addEventListener('mouseleave', ()=>{
  isDown = false;
  
  // currentSnapReview();
})

reviewsContainer.addEventListener('scroll',() =>{
  currentSnapReview();
})
reviewsContainer.addEventListener('mousemove', (e)=>{
  e.preventDefault()
  if(!isDown){
    return;
  }
  const moveX = e.clientX - reviewsContainer.offsetLeft;
  const walk = startX - moveX;
  reviewsContainer.scrollLeft = walk + scrollLeft;
})


anchorDots.forEach((dot,index) =>{
  dot.addEventListener('click', ()=>{
    for( let i=0; i<anchorDots.length;i++){
      if(i!=index){
        anchorDots[i].classList.remove('active');
      }
    }
    dot.classList.add('active');
    const target = document.querySelector(dot.getAttribute('data-target'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  })
})








