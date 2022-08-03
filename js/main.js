(() => {

    let yOffset = 0; //instead of window.pageYoffset 
    let prevScrollHeight = 0; //previous height that is about to start the new section
    let currentScene = 0; // the height of the current active scene (0-4)

    //scene = html section
    const sceneInfo = [
        {

            //Section 0
            type: 'sticky',
            heightNum: 5, // Set the scrollHeight like browser height * 5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
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
        // Set the each scroll hieght
        for(let i=0; i < sceneInfo.length; i++) {
            // 다섯배를 하는 이유는 하나의 섹션이 진행되는동안 다른 섹션 애니메이션이 작동하지 않도록 하기 위해서 이다. 그래서 하나의 섹션을 길게 만듦.
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            // html 섹션 높이로 만들어주는것.(표현법)
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
    }


   

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
                                            // scene에 currentScene에 해당하는애
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if (yOffset < prevScrollHeight) {
            if (currentScene===0) return;
            currentScene--;
        }

        console.log(currentScene);
     
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();
})();