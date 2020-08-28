window.onload = function () {

    (function () {

        var length = 5*5*5;  // li元素的个数  5行5列5排
        // console.log( length )
        var oUL = document.getElementById('list').children[0];  // 拿到ul元素
        // console.log( oUL )
        var aLi = oUL.children;  // 拿到ul下面的子元素
        // console.log( aLi )

        // 循环创建li元素
        for ( var i = 0; i < length; i++ ) {

            // console.log( i )
            var oli = document.createElement("li");
            oli.innerHTML = i;

            // 定义每个li元素的x, y, z坐标
            oli.x = i % 5;  // 取余确定行数x = 0 1 2 3 4
            oli.y = Math.floor( i%25/5 );  // 确定列数y = 0 1 2 3 4 
            oli.z = Math.floor( i/25 );  // 确定排数z = 0 1 2 3 4

            // 为每个li元素添加初始随机坐标
            var tX = Math.random()*6000 - 2000;  // [-2000,4000)
            var tY = Math.random()*6000 - 2000;
            var tZ = Math.random()*6000 - 2000;

            // 使用ES6中的模板语法 给li元素添加样式
            oli.style.transform = `translate3D( ${tX}px, ${tY}px, ${tZ}px )`;
            oUL.appendChild( oli );       

        };

        setTimeout( Sphere , 200 );

        // 添加鼠标事件
        (function () {

            // 保存ul元素transform样式的初始值
            var trZ = -1800,
                roX = 0,
                roY = 0;

            // 让页面中的内容无法选中
            document.onselectstart = function () {
                return false;
            }
            // 阻止页面默认的拖拽事件
            document.ondrag = function () {
                return false;
            }
            // 鼠标按下事件
            document.onmousedown = function ( e ) {

                var sX = e.clientX;  // 鼠标按下时的x坐标
                var sY = e.clientY;  // 鼠标按下时的y坐标
                // console.log( sX , sY )

                // 用户有可能只按下而不移动，保存移动的位置
                var rX = roX;
                var rY = roY;
                
                // 鼠标移动事件
                document.onmousemove = function ( e ) {
                    
                    // 鼠标移动时与原始坐标的差值
                    var chaX = e.clientX - sX;  
                    var chaY = e.clientY - sY;
                    // console.log( chaX , chaY )

                    // 添加摩擦系数，降低移动时的幅度
                    rX = roX - chaY*0.2;
                    rY = roY + chaX*0.2;

                    oUL.style.transform = `translateZ(${trZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`;

                }
                // 鼠标抬起事件
                document.onmouseup = function ( e ) {

                    // 保存上一次的移动位置
                    roX = rX;
                    roY = rY;
                    this.onmousemove = null;
                }
            };

            // 鼠标滚轮事件
            (function ( fn ) {

                // console.log( fn )
                if ( document.onmousewheel === undefined ) {

                    // 火狐浏览器  
                    document.addEventListener( "DOMMouseScroll", function ( e ) {

                        var d = e.detail/3;  // d为方向，有正负，表示滚轮的上下滚动
                        fn.call( this, d );  // 改变this指向，从window变成document  
                    },false)

                }else {

                    // 非火狐浏览器
                    document.onmousewheel = function ( e ) {

                        var d = e.wheelDelta/150;  // d为方向，有正负，表示滚轮的上下滚动
                        // console.log(d);
                        fn.call( this, d );  // 改变this指向，从window变成document  
                    }
                }

            })( function ( d ) {

                // console.log( this )  // window
                trZ += d*100;  // 鼠标滚轮改变trZ的大小
                //改变值之后，同时来改变样式
                oUL.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

            });

        })();

        // 为每个li按键创建点击事件
        (function () {

            var aBtn = document.getElementById("btn").getElementsByTagName("li");
            // console.log( aBtn )
            // 将4个函数存放到数组中，等待点击时调用
            var arr = [ Table, Sphere, Helix, Grid ];

            for ( var i = 0; i < aBtn.length; i++ ) {

                // 保存每个i的值，为每个li按键绑定点击事件
                (function ( i ) {

                    // 点击执行arr里面的函数  内部函数拿到外部函数的参数(闭包)
                    aBtn[i].onclick = arr[i]

                })( i )

            }
            
        })();

        // 三维矩形
        function Grid () {

            // li元素的初始x, y, z距离
            var disX = 300;
            var disY = 300;
            var disZ = 800;

            // 循环遍历li元素，添加距离
            for ( var i = 0 ; i < length; i++ ){
                
                // console.log( i )
                var oli = aLi[i];  // 拿到每个li元素
                // console.log(oli)

                // 将li元素整体放到页面中间位置  x, y, z变成-2 -1 0 1 2
                var x = (oli.x - 2 )*disX;
                var y = (oli.y - 2 )*disY;
                var z = (oli.z - 2 )*disZ;
                // console.log( x, y, z )

                oli.style.transform = `translate3D( ${x}px, ${y}px, ${z}px )`; 

            }
        };

        // 元素周期表
        function Table () {

            // 前18个li的位置不规律，单独标记位置
            var arr = [
                {
                    x: 0, 
                    y: 0
                }, 
                {
                    x: 17, 
                    y: 0
                },
                {
                    x: 0, 
                    y: 1
                },
                {
                    x: 1, 
                    y: 1
                },
                {
                    x: 12, 
                    y: 1
                },
                {
                    x: 13, 
                    y: 1
                },
                {
                    x: 14, 
                    y: 1
                },
                {
                    x: 15, 
                    y: 1
                },
                {
                    x: 16, 
                    y: 1
                },
                {
                    x: 17, 
                    y: 1
                },
                {
                    x: 0, 
                    y: 2
                },
                {
                    x: 1, 
                    y: 2
                },
                {
                    x: 12, 
                    y: 2
                },
                {
                    x: 13, 
                    y: 2
                },
                {
                    x: 14, 
                    y: 2
                },
                {
                    x: 15, 
                    y: 2
                },
                {
                    x: 16, 
                    y: 2
                },
                {
                    x: 17, 
                    y: 2
                },
            ];
            // 剩余li元素找规律来确认位置
            var disX = 180;  // 横坐标的距离
            var disY = 210;  // 纵坐标的距离
            var midX = 18/2;  // 横坐标的中间值
            var n = length/18;  // 总行数
            var midY = n/2;  // 纵坐标的中间值

            for ( var i = 0; i < length; i++ ) {

                var x, y;  // 标记每一个元素的x,y坐标;
                if ( i < 18 ) {

                    // 前18个元素 0 - 17
                    x = arr[i].x;     
                    y = arr[i].y;                    
                }else {

                    // 从第19个元素开始的后续元素，确定它们的x, y坐标
                    x = i%18; 
                    y = Math.floor( i/18 ) + 2;
                }

                aLi[i].style.transform = `translate3D( ${(x-midX)*disX}px, ${(y-midY)*disY}px , 0px )`;

            }

        };

        // 螺旋形
        function Helix () {

            var h = 4;  // 行数
            var num = length / h;  // 每一行的个数
            var deg = 360 / num;  // 平均度数值
            var tY = 7;  // 每一个元素的占位
            var mid = length/2;  // 取中间值

            for ( var i = 0; i < length; i++ ) {

                // 先旋转后移动
                aLi[i].style.transform = `rotateY(${i*deg}deg) translateY(${(i-mid)*tY}px) translateZ(800px)`;
            }


        };

        // 球状体
        function Sphere () {

            var arr = [1, 3, 7, 9, 11, 14, 21, 16, 12, 10, 9, 7, 4, 1];  // 所有数加起来等于125
            // 第一层循环遍历每个li元素 
            for ( var i = 0; i < length; i++ ) {   

                var numC = 0, numG = 0, arrSum = 0;  // numC是层数  numG是元素在每层的位置
                // 第二层循环遍历数组的长度
                for ( var j = 0; j < arr.length; j++ ) {  
                    
                    arrSum += arr[j];   // arr[0] + arr[1] + arr[6] ... + arr[13]
                    if ( arrSum > i ) {  
                        numC = j;   
                        numG = arr[j] - ( arrSum - i );
                        break;
                    }
                }
                var ydeg = 360/arr[numC];   // 算出每一层旋转的度数
                var xdeg = 180/(arr.length - 1);
                aLi[i].innerHTML = numC + "层，第" + numG + "个";
                aLi[i].style.transform = `rotateY(${(numG-1.3)*ydeg}deg) rotateX(${90-numC*xdeg}deg) translateZ(800px)`;
            }

        };

    })()

}