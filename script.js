

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