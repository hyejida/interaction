(() => {

    let yOffset = 0; //instead of window.pageYoffset 
    let prevScrollHeight = 0; //previous height that is about to start the new section
    let currentScene = 0; // the height of the current active scene (0-4)
    let enterNewScene = false; // the moment of starting the new scene

    //scene = html section
    const sceneInfo = [
        {

            //Section 0
            type: 'sticky',
            heightNum: 5, // Set the scrollHeight like browser height * 5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                // Change CSS styles
                messageA_opacity: [0 ,1] //[startValue, lastValue]


            }
        }, 

        {
            //Section 1
            type: 'normal',
            heightNum: 5, // Set the scrollHeight like browser height * 5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },

        {
            //Section 2
            type: 'sticky',
            heightNum: 5, // Set the scrollHeight like browser height * 5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },

        {
            //Section 3
            type: 'sticky',
            heightNum: 5, // Set the scrollHeight like browser height * 5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        // *** Set the each scroll hieght
        for(let i=0; i < sceneInfo.length; i++) {
            // 다섯배를 하는 이유는 하나의 섹션이 진행되는동안 다른 섹션 애니메이션이 작동하지 않도록 하기 위해서 이다. 그래서 하나의 섹션을 길게 만듦.
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            // html 섹션 높이로 만들어주는것.(표현법)
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        // refresh website 초기화시 값
        let totalScrollHeight = 0;
        for(let i=0; i<sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene=i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

     
    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬에서 스크롤된 범위 비율
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0];

        return rv;

    }


    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);             
                break;
                
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;         
        }
    }



    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
                                            // scene에 currentScene에 해당하는애
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene===0) return; // For the mobile screen
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`) 
        }

        if(enterNewScene) return;

        playAnimation();
    }

   
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    
    
})(); 