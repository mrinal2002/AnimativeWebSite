
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loaderScreen(){
    
    var tl=gsap.timeline();
    tl.from(".line h1",{
        y:150,
        stagger:0.25,
        duration:0.6,
        delay:0.12
    })
    tl.from("#line1-part1",{
        opacity:0,
        onStart:function(){
            let h5timer=document.querySelector("#line1-part1 h5");
            var counter=0;
            
            setInterval(function(){
                if(counter<100){
                    h5timer.innerHTML=counter++;
                }
                else{
                    h5timer.innerHTML=counter;
                }
            },35)
        }
    })
    tl.to(".line h2",{
        opacity:1,
        animationName:"anime"
    })
    tl.to("#loader",{
        opacity:0,
        duration:0.2,
        delay:4.1
    })
    
    tl.from("#page1",{
        y:1600,
        delay:0.2,
        ease:Power4
    })
    tl.to("#loader",{
        display:"none"
    })
    tl.from("#nav",{
        opacity:1
    })
    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
        y:100,
        stagger:0.125
    })
    tl.from("#hero1,#page1",{
        opacity:0,
    },"-=1.2")
}

function cursorAnimation(){
    Shery.mouseFollower("#crsr",{
        skew:true,
        ease:"cubic-bezier(0.23,1,0.320,1)",
        duration:1
    })
    // document.addEventListener('mousemove',function(dets){
    //     gsap.to("#crsr",{
    //         left:dets.x,
    //         top:dets.y
    //     })
    // })
    Shery.makeMagnet("#nav-part2 h4");
    var video=document.querySelector("#video-container video");
    var videoContainer=document.querySelector("#video-container");
    videoContainer.addEventListener('mouseenter',function(){
        videoContainer.addEventListener('mousemove',function(dets){
            gsap.to(".mousefollwer",{
                opacity:0
            })
            gsap.to("#video-cursor",{
                y:dets.y -300,
                left:dets.x -570
            })
        })
    })
    videoContainer.addEventListener('mouseleave',function(){
        gsap.to(".mousefollwer",{
            opacity:1
        })
        gsap.to("#video-cursor",{
            left:"80%",
            top:"-10%"
        })
    })
    var flag=true;
    videoContainer.addEventListener("click",function(){
        if(flag===true){
            video.play();
            video.style.opacity=1;
            document.querySelector("#video-cursor").innerHTML=`<i class="ri-pause-mini-fill"></i>`;
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag=false;
        }
        else{
            video.pause();
            video.style.opacity=0;
            document.querySelector("#video-cursor").innerHTML=`<i class="ri-play-mini-fill"></i>`;
            gsap.to("#video-cursor",{
                scale:1
            })
            flag=true;
        }
    })
}

function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        debug:false,
        gooey:true
    })
}
locomotiveAnimation();
loaderScreen();
cursorAnimation();
sheryAnimation();