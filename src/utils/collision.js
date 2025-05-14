    function collision(a,b){

    for(let i = 0; i < 5 ; i++){       
            let locationCol = locations[i].element.getBoundingClientRect();

            if(playerRect.left > locationCol.left + locationCol.width || locationCol.left > playerRect.left + playerRect.width || playerRect.top > locationCol.height + locationCol.top || locationCol.top > playerRect.top + playerRect.height){
                if(holderofindex == i){
                    cool = 0;
                    showed = 0;
                    sidepanelimg.textContent = '';
                    locationInfo.textContent = 'No planet within proximity';
                    buttons.innerHTML = ''; // Clear buttons properly
                }
            } else {
                cool = 1;
                holderofindex = i;
                break;
            }
        } 
        if(cool && !showed){
            locations[holderofindex].show(holderofindex);
            showed = 1;
        }
        
    }
