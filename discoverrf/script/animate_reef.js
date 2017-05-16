var slideInterval;

$(document).ready(function(){
    var gs = window.GreenSockGlobals;
    environmentBuilder();
    setTimeout(dialogManager, 300);
    animationManager();
    clickHandler();
});

function environmentBuilder(){
    function createCoral(type,x,y,zindex){
        coral = $("<div class="+type+"></div>").appendTo('#reef');
        coral.css({"z-index": zindex, "left": x+"%", "top":y+"%"});
    }
    //createCoral(<type>,<x coordinate>,<y coordinate>, <height on page(higher means it will be ontop of anything lower)>);
    //Top Coral
    createCoral("blue_brown",45,-1,1);
    createCoral("brown_brown",30,-6,1);
    createCoral("red_brush",10,-2,1);
    createCoral("brown_brown",66,7,1);
    createCoral("blue_brown",73,12,1);
    createCoral("brown_brown",54,15,1);
    createCoral("blue_brown",20,15,1);
    createCoral("yellow_finger",42,22,1);
    createCoral("blue_brown",27,19,1);

    //Middle Layer Coral
    createCoral("brown_brown",1,29,2);
    createCoral("blue_brown",65,27,2);
    createCoral("brown_brown",57,32,2);
    createCoral("red_anenome",21,35,3);
    createCoral("blue_brown",39,35,2);

    //Bottom Layer  Coral
    createCoral("yellow_brush",-5,58,3);
    createCoral("blue_brown",14,58,3);
    createCoral("blue_brown",27,53,3);
    createCoral("brown_brown",34,60,3);
    createCoral("red_brush",52,50,3);
    createCoral("brown_brown",72,58,3);
    
     $(".red_brush").each(function(i){
        var numberOfSeahorses = Math.round(Math.random()*2+2);
        for(a=0; a < numberOfSeahorses; a++){
            var x = Math.random()*50+25;
            var y = Math.random()*50-25;
            var seahorse = $("<div class='seahorse'></div>").appendTo(this);
            if(Math.random() > 0.5){
                seahorse.css({"transform":"scale(-1,1)"});
            }
            seahorse.css({left: x+'%', top: y+'%', '-webkit-filter': 'hue-rotate('+((Math.random()*90)+270)+'deg)'});
        }
    });
     $(".yellow_brush").each(function(i){
        var numberOfSeahorses = Math.round(Math.random()*2+2);
        for(a=0; a < numberOfSeahorses; a++){
            var x = Math.random()*50+25;
            var y = Math.random()*50-25;
            var seahorse = $("<div class='seahorse'></div>").appendTo(this);
            if(Math.random() > 0.5){
                seahorse.css({"transform":"scale(-1,1)"});
            }
            seahorse.css({left: x+'%', top: y+'%', '-webkit-filter': 'hue-rotate('+Math.random()*90+'deg)'});
        }
    });
    $(".red_anenome").each(function(i){
        var numberOfClownfish = 2;
        for(a=0; a < numberOfClownfish; a++){
            var x = Math.random()*50;
            var y = Math.random()*50-25;
            var clownfish = $("<div class='clownfish'></div>").appendTo(this);
            clownfish.css("left", x+"%");
            if(Math.random() > 0.5){
                clownfish.css({"transform":"scale(-1,1)"});
            }
            clownfish.css("top",y+"%");

        }
    });
}

function dialogManager(){
    function pirateSay(text, time){
        $('.speech').html('<p>'+text+'</p>' + downarrow).delay(200).slideToggle({direction: 'up'},200).delay(time).slideToggle(200); 
        /*Actions in Order:  
            1. Sets speech bubble to the text 
            2. delays 200ms 
            3. Opens up the speech bubble to it is visible (does this over 200ms)
            4. Waits however long is specified so the user can read it
            5. Slides the speech bubble back down(invisible)
            6. Clears the speechbubble so it can be used again*/
    }
    console.log('dialog manager activating');
    var downarrow = '<div class="downarrow"></div>';
    $('#pirate').slideDown(200).append('<div  class="speech"></div>');
    pirateSay('Welcome to the <b>Great Barrier Reef!</b><br>Here there are 1000s of species of aquatic flora and fauna', 5000);
    setTimeout(function(){
        pirateSay('Just click on an animal that you would like to learn more about.', 5000);
        setTimeout(function(){
            $('.speech,#pirate').slideToggle(200);
        }, 5000);
    }, 5600);
}

function animationManager(){
    seahorseManager();
    clownfishManager();
    cuttleManager();
    whaleManager();
    dredgeManager();
    //var polutionInterval = setInterval(polutionManager, 300);
    
    function clownfishManager(){
        setInterval(moveClownfish,3000);
        function moveClownfish(){
            $( ".clownfish" ).each(function( i, el) {
                var dirx = (Math.random()*200);
                var diry = (Math.random()*20);
                if(parseInt($(el).css('left')) < dirx){
                    $(el).css({"transform":"scale(1,1)"});
                } else {
                    $(el).css({"transform":"scale(-1,1)"});
                }
                TweenLite.to(el, 2, {css:{left:dirx+"px", top:diry+"px"}});
            });
        }
    } 
    function seahorseManager(){
        setInterval(seahorseMove,2000);
        function seahorseMove(){
            $( ".seahorse" ).each(function( i, el) {
                var dirx = (Math.random()*200);
                var diry = (Math.random()*20);
                TweenLite.to(el, 2, {css:{left:dirx+"px", top:diry+"px"}});
            });
        }
    }
    
    function cuttleManager(){
        var vector = "right";
        var wtimer = Math.random()*300+1500;
        setInterval( function(){ cuttleMove(vector);}, wtimer );
        function cuttleMove(vector){
            TweenLite.to($('.cuttle'),3,{'-webkit-filter': 'hue-rotate('+Math.random()*360+'deg)'});

            var dirx = (Math.random()*200-100);
            var pos = $(".cuttle_cont").position().left;
            console.log('Pos: ' + pos, ' <br> Dirx: '+dirx);
            if(dirx < 0 && pos < 500){
                dirx = -dirx;
                console.log('To far left, turning it right: ',dirx);
            } else if(dirx > 0 && pos > 800){
                dirx = -dirx;
                console.log('To far right, turning it left: ',dirx);
            }
            if(dirx > 0){
                if(vector=="right"){
                    //console.log("left > right.  wdirx:" + wdirx);
                    TweenLite.to($('.cuttle_cont'), 0.7, {left:'+='+dirx+"px"});
                    vector = "left";
                    $(".cuttle").css({"transform":"scale(1,1)",});
                }
                vector = "left";
                //console.log(vector);
            } else {
                if(vector=="right"){
                    //console.log("right < left. wdirx:" + wdirx);
                    TweenLite.to($('.cuttle_cont'), 2, {left:'+='+dirx+"px"});
                    vector="left";
                    $(".cuttle").css({"transform":"scale(-1,1)",});
                }
                vector="left";
                //console.log(vector);
            }
        }
    }

    function whaleManager(){
        var whale = $(".whale");  //Caches the whale object so it is easier for me to reference
        var whaleMovement = new TimelineLite({onComplete:whaleManager});  //Made it so that when the time line (the whale moves from right to left) is complete, it restarts
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'110%'},{left:'90%'}));  //This is just each step in the timeline
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'90%'},{left:'70%'}));   //I set it up so that it would make a swimming motion by speeding and slowing 7 times
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'70%'},{left:'50%'}));
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'50%'},{left:'30%'}));
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'30%'},{left:'10%'}));
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'10%'},{left:'-10%'}));
        whaleMovement.add(TweenLite.fromTo(whale, 5,{left:'-10%'},{left:'-50%'}));
        whaleMovement.add(TweenLite.fromTo(whale, 0.0001,{left:'-50%'},{left:'120%'}));
    }
    function dredgeManager(){
        function dropWaste(){
            var position = dredge.position();
            var newWaste = $('<div class="waste"></div>');
            $("#middle").append(newWaste);
            $(newWaste).css({top: position.top, left: position.left+200,'transform' : 'rotate('+ Math.random()*90 +'deg)'});
            TweenLite.to($(newWaste), 8, {width:'600px',height:'338px',opacity: 0});
            setTimeout(function(){newWaste.remove();}, 8000);
        }
        setInterval(dropWaste, 3000);
        var dredge = $(".dredging_ship");
        var dredgeMovement = new TimelineLite({onComplete:dredgeManager});
        dredgeMovement.add(TweenLite.fromTo(dredge, 4,{right:'110%'},{right:'90%'}));  //This is just each step in the timeline
        dredgeMovement.add(TweenLite.fromTo(dredge, 3,{right:'90%'},{right:'70%'}));   //I set it up so that it would make a swimming motion by speeding and slowing 7 times
        dredgeMovement.add(TweenLite.fromTo(dredge, 5,{right:'70%'},{right:'50%'}));
        dredgeMovement.add(TweenLite.fromTo(dredge, 3,{right:'50%'},{right:'30%'}));
        dredgeMovement.add(TweenLite.fromTo(dredge, 4,{right:'30%'},{right:'10%'}));
        dredgeMovement.add(TweenLite.fromTo(dredge, 5,{right:'10%'},{right:'-10%'}));
        dredgeMovement.add(TweenLite.fromTo(dredge, 3,{right:'-10%'},{right:'-50%'}));

    }
}

function clickHandler(){
    $(document.body).on('click', '.popupCloseButton', function(){
        $("#popup_information").slideUp(200); 
        clearInterval( slideInterval );
    });
    $(document.body).on('click', '.dredging_ship', openDredge);
    $(document.body).on('click', '.seahorse', openSeahorse);    
    $(document.body).on('click', '.clownfish', openClownfish);    
    $(document.body).on('click', '.whale', openWhale);
    $(document.body).on('click', '.cuttle',openCuttlefish);

    function changeContent(header, content, species){
        $("#popup_information").html('');
        $("#popup_information").append('<div id="popupHeader"><h3>'+header+'</h3><h3 class="popupCloseButton" >X</h3></div></div><div id="popupGallery"></div><p id="popupContent">'+content+'</p>');
        //$(".popupCloseButton").on('click', function(){$('#popup_information').toggle();});
        createSlideshow(species);
        $("#popup_information").slideDown(200);  
    }

    function openSeahorse(){
        var newHeader = "Queensland Seahorse";
        var newContent = "The Queensland Seahorse is a type of seahorse native to the seaweeds, coral and rocky reefs of the Great Barrier Reef as well as some inland mangroves.  "+
                          "It's small fins and spinny body are not the best for swimming so often they will coil their tail around marine plants to hold them in place. "+
                          "<br>The Queensland Seahorse eats shrimp and small crustaceans through its short snout.  "+
                          "Because seahorses do not have a stomach they must eat large ammounts of food. <br> Quis organic letterpress, Godard master cleanse lomo migas butcher. Sint adipisicing literally butcher Wes Anderson. Nisi umami ennui fashion axe, street art chillwave cronut paleo sartorial sint quinoa ad kale chips salvia fugiat. ";

        var species = 'seahorse';
        changeContent(newHeader, newContent, species);
    }

    function openClownfish(){
        var newHeader = "Clownfish / Anenomefish";
        var newContent = "The Clownfish is native to the warmer waters of the Indian and Pacific oceans including the Great Barrier Reef and Red sea.  "+
                          "Clownfish are omnivores, this means they eat both vegetation and meat.  "+
                          "They feed on undigested food from their host the anenome as well as small zooplankton and a little bit of algae.   <br> Quis organic letterpress, Godard master cleanse lomo migas butcher. Sint adipisicing literally butcher Wes Anderson. Nisi umami ennui fashion axe, street art chillwave cronut paleo sartorial sint quinoa ad kale chips salvia fugiat. ";
        var species = "clownfish";
        changeContent(newHeader, newContent, species);
    }
    function openWhale(){
        var newHeader = "Humpback Whale ";
        var newContent = "The Humpback Whale is an iconic Australian species not only because of their numbers but also because they often jump from the water spectacularly." +
                         "The Humpback Whale performs an annual migration between the waters of Antarctica, where they feed, and the Great Barrier Reef where they give birth"+
                         "Humpbacks grow from 12-16 metres in size and can often be spotted on the reef locations around Cairns and Port Douglas."+
                         "Humpbacks were hunted in the 40s-60s which depleted their numbers but now that whaling has declined their numbers have steadily climbed to an estimated 10,000 in 2008.  <br> Quis organic letterpress, Godard master cleanse lomo migas butcher. Sint adipisicing literally butcher Wes Anderson. Nisi umami ennui fashion axe, street art chillwave cronut paleo sartorial sint quinoa ad kale chips salvia fugiat. ";
        var species = 'whale';
        changeContent(newHeader, newContent, species);
    }

    function openCuttlefish(){
        var newHeader = "Cuttlefish"; 
        var newContent = "Cuttlefish are small molluscs found all over Australia and the world.  They are known for their ability to change colour for mating, fighting and camoflage.  "+
        "Cuttlefish are carnivorous animals that prey on small crustaceans such as shrimp and crabs, but  also eat a lot of fish.  It uses its ability to change colour to hide itself before catching the prey with it's sucker pads on it's long tentacles and eating the prey with it's beak."+
        "Due to it's small size, there are many predators of the cuttlefish including large fish, sharks and even other cuttlefish along with humans who hunt them for food.  <br> Quis organic letterpress, Godard master cleanse lomo migas butcher. Sint adipisicing literally butcher Wes Anderson. Nisi umami ennui fashion axe, street art chillwave cronut paleo sartorial sint quinoa ad kale chips salvia fugiat. ";
        var species = "cuttlefish";
        changeContent(newHeader, newContent, species);
    }

    function openDredge(){
        var newHeader = "Plans to Drop Dredged Sand at Abbott Point within the Great Barrier Reef Marine Park";
        var newContent = "Currently there are plans to expand the Abbott Point Coal Terminal which means a lot of sand must be dug up and moved.  "+
        "<b>This sand is to be dropped</b> 4km offshore <b>within the Great Barrier Reef Marine Park.</b>"+
        "There are huge environemntal consequences for these actions including the destruction of our reefs the surrounding wetlands which means destruction of one of Australia's defining tourist attractions.    <br> Quis organic letterpress, Godard master cleanse lomo migas butcher. Sint adipisicing literally butcher Wes Anderson. Nisi umami ennui fashion axe, street art chillwave cronut paleo sartorial sint quinoa ad kale chips salvia fugiat. ";
        var species = "dredge";
        changeContent(newHeader, newContent, species);
    }

    var slideshowInit = true;
    function createSlideshow(species){
        if(species == 'dredge'){
             $("#popup_information").append("<div class='map' id='dredge'></div>");
            $(".map").css('background-image','url(./img/'+species+'/map.png)');
        } else {
            $("#popup_information").append("<div class='map'></div>");
            $(".map").css('background-image','url(./img/'+species+'/map.png)');
        }
        var HTMLofGallery = '<div id="slideshow"><div id="slidecontainer">';
        for(i=0; i<3; i++){
            HTMLofGallery = HTMLofGallery + '<div class="slide"><img src="./img/'+species+'/'+(i+1)+'.jpg"/></div>';
        }
        HTMLofGallery = HTMLofGallery + '</div></div>';
        $("#popupGallery").html(HTMLofGallery);
        var currentPosition = 0;
        var slideWidth = 500;
        var slide = $('.slide');
        var numberOfSlides = slide.length;
        var speed = 3500;
        var lastSlideReached = false;
        slide.wrapAll('<div id="slideContainer"></div>');
        slide.css({ 'float' : 'left' });
        $('#slideContainer').css('width', slideWidth * numberOfSlides);
        if(slideshowInit === true){
            slideShowInit = false;
            slideInterval = setInterval(changeSlide, speed);
                function changeSlide() {
                if( ! lastSlideReached ) {
                    if(currentPosition == (numberOfSlides-1)) {
                        lastSlideReached = true;
                        clearInterval( slideInterval );
                        slideLeft();
                    slideInterval = setInterval(changeSlide, speed);
                    } else {
                        currentPosition++;
                    }
                } else {
                    if( currentPosition === 0 ) {
                        lastSlideReached = false;
                    } else {
                        currentPosition--;
                    }
                }
                moveSlide();
            }
            
            function moveSlide() {
                 $('#slideContainer').animate(
                    {'marginLeft' : slideWidth*(-currentPosition)}
                 );
            }
            
            function slideLeft() {
                $('#slideContainer').animate({'marginLeft' : 0});
                currentPosition = 0;
                lastSlideReached = false;
            }
        }
    }
}