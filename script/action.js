$(document).ready(function() {
    

    $('header').load('include/header.html', function(){
        // gnb 를 mo_gnb_box에 삽입
        let gnbHtml = $('.gnb').html();
        $('.mo_gnb_box .mo_gnb').html(gnbHtml);

        let spotMenu = $('.spotmenu').clone();
        $('.mo_nav').prepend(spotMenu);

        //sub 페이지 구분해서 sub 클래스 추가
        let mainPage = $('body.main').length 
        if(mainPage <= 0){
            $('.mo_menu').addClass('sub');
        }


        $('.mo_menu').click(function(){
            $(this).toggleClass('on'); 
            $('.mo_gnb_box').fadeToggle();
            $('.mo_gnb_box').toggleClass('on');  
        })

        // 마우스 서클 소스 
        
        // let circleW = $('.mouse_circle').width();
        // let circleH = $('.mouse_circle').height();
        // let y
        // $(window).mousemove(function(e){
        //     let x = e.clientX;
        //     y = e.clientY;
        //     $('.mouse_circle').css({left: x-circleW/2, top: y-circleH/2});
        // })
        
        // $(window).on('scroll', function() {
        //     $('.mouse_circle').css({top: y - circleH / 2});
        // });
        


        // $('.merong').mouseenter(function(){
        //     $('.mouse_circle').css({transform:'scale(3)', background:'blue', border:'1px solid'})
        //     console.log('k')
        // })
        
        // $('.merong').mouseleave(function(){
        //     $('.mouse_circle').css({transform:'', background:'', border:''})
        // })
        // ///////////////


        $(window).resize(function(){  
            let winW = $(window).width();
            
            if(winW > 768){
                $('.mo_gnb_box').hide();
                $('.mo_gnb_box').removeClass('on');
                $('.mo_menu').removeClass('on');
            }
        })

        //pc menu
        $('header .gnb').mouseenter(function(){
            $('.lnb').stop().slideDown(300);
        })
        
        $('header .gnb').mouseleave(function(){
            $('.lnb').stop().slideUp(300);
        })

        //mobile menu
        $('.mo_gnb > li > a').click(function(){
            $('.mo_gnb .lnb').slideUp(300);
            $(this).siblings('.lnb').stop().slideToggle(300);
            return false 
        })
    });


    $('footer').load('include/footer.html');

    let snbWidth, snbLeft, snbTop, snbHeight;

    function snbLine(){
        let snbLength = $('.snb').length;
        let snbOnLeng = $('.snb li.on').length;
        

        if(snbLength > 0 && snbOnLeng > 0){
            snbWidth = $('.snb li.on').width();
            snbLeft = $('.snb li.on').position().left;
            snbTop = $('.snb li.on').position().top;
            snbHeight = $('.snb li.on').height();
            $('.snb_line').css({left: snbLeft, width: snbWidth, top:snbTop + snbHeight});
        };        
    }
    snbLine()  //새로고침때 실행
    
    $(window).resize(function(){
        snbLine()  //화면크기 변경할때 실행
    })

    $('.snb li').mouseenter(function(){
        let snbLeft2 = $(this).position().left;
        let snbWidth2 = $(this).width();
        $('.snb_line').css({left: snbLeft2, width: snbWidth2});
    })

    $('.snb li').mouseleave(function(){
        $('.snb_line').css({left: snbLeft, width: snbWidth});
    })

 //main section1 목록 항목에 마우스를 올리면 해당 항목의 이미지와 텍스트를 크게 보여주고, 마우스를 떼면 자동 이미지 전환을 재개

    let rollingNumber = 0;

    $('#section1 li').mouseenter(function() {
        clearInterval(autoRolling)
        rollingNumber = $(this).index()

        $(this).addClass('on').siblings().removeClass('on');

        let imgSrc = $(this).find('figure img').attr('src') ;
        let h3Text = $(this).find('h3').text() ;
        let cateText = $(this).find('.cate').text() ;
        
        $('.big_img img').attr('src', imgSrc);
        $('.big_img img').hide()
        $('.big_img img').fadeIn()


        $('.big_img').removeClass('on')
        
        setTimeout(function(){
            $('.big_img').addClass('on')
            $('.big_img .text strong').text(h3Text)
            $('.big_img .text .cate').text(cateText)
        },500)
    });

    $('#section1 li').mouseleave(function() {
        autoRolling = setInterval(imgRolling, 5000)
    })



    // let imgRolling = setInterval(함수, 시간)

    // clearInterval(imgRolling)
    // ------------------------------------


    
    //main section1 자동으로 이미지와 텍스트를 슬라이드처럼 전환하는 기능
    let autoRolling = setInterval(imgRolling, 5000)

    function imgRolling(){
        rollingNumber++
        if(rollingNumber >= 4){
            rollingNumber = 0
        }

        $('.small_img li').eq(rollingNumber).addClass('on').siblings().removeClass('on');
        
        let imgSrc = $('.small_img li').eq(rollingNumber).find('figure img').attr('src');
        let h3Text = $('.small_img li').eq(rollingNumber).find('h3').text() ;
        let cateText = $('.small_img li').eq(rollingNumber).find('.cate').text() ;

        $('.big_img img').attr('src', imgSrc)
        $('.big_img img').hide()
        $('.big_img img').fadeIn()


        $('.big_img').removeClass('on')
        
        setTimeout(function(){
            $('.big_img').addClass('on')
            $('.big_img .text strong').text(h3Text)
            $('.big_img .text .cate').text(cateText)
        },500)
    }


    $('#section3 .content .name').each(function(){
        let name = $(this).text(); //박경태
        let nameComp = name.substr(0,1) + '*' + name.substr(2,1)

        $(this).text(nameComp)
    })


    // 코드의 목적은 웹페이지에서 부드럽게 스크롤하여 특정 섹션으로 이동하는 것
    $('.floating_menu a').click(function(){
        let target = $(this).attr('href')
        let targetPos = $(target).offset().top
        $('html, body').animate({scrollTop: targetPos}, 1000);
    });

    // $(window).scroll(function(){
    //     let scrollTop = $(this).scrollTop();
    //     let sec1Top = $('#section1').offset().top;
    //     let sec2Top = $('#section2').offset().top;
    //     let sec3Top = $('#section3').offset().top;
    //     let winH = $(window).height();

    //     if(scrollTop >= sec1Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section1"]').addClass('on');
    //     } else {
    //         $('.floating_menu a').removeClass('on');
    //     }
        
    //     if(scrollTop >= sec2Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section2"]').addClass('on');
    //     }

    //     if(scrollTop >= sec3Top - winH/4){
    //         $('.floating_menu a').removeClass('on');
    //         $('.floating_menu a[href="#section3"]').addClass('on');
    //     } 
    // })

    // let floatLength = $('.floating_menu.sub').length
    
    // if(floatLength < 1){  //메인페이지인경우 실행
    //     $(window).scroll(function(){
    //         let scrollTop = $(this).scrollTop();
    //         let winH = $(window).height();
    //         $('.floating_menu a').removeClass('on');
            
    //         $('.floating_menu a').not('[href="#visual"]').each(function(){
    //             let target = $(this).attr('href')
    //             let targetPos = $(target).offset().top;
                
    //             if(scrollTop >= targetPos - winH/4){
    //                 $('.floating_menu a').removeClass('on');
    //                 $(this).addClass('on');
    //             } 
    //         })
    //     })
    // }
    
    //login page    
    $('.view_pw').click(function(){
        $(this).hide();
        $('.hide_pw').show();
        $(this).siblings('input').attr('type','text');
    })

    $('.hide_pw').click(function(){
        $(this).hide();
        $('.view_pw').show();
        $(this).siblings('input').attr('type','password');
    })

    // 회원가입 파일선택 
    
    $('#photo').change(function(){

        // let filePath = $(this).val()
        //     filePath = filePath.split('\\') 
        // let fileLength = filePath.length; 
        // $('.file_name').text(filePath[fileLength-1]);


        let filePath = $(this).val()
            filePath = filePath.split('\\').pop()
            $('.file_name').text(filePath);

    })

    // 게시판 쓰기 

    $('#secret').click(function(){
        $('.public_pw').prop('readonly', false)
        $('.public_pw').css({background :'#fff'})
        $('.public_pw').focus()
    })
    
    $('#public').click(function(){
        $('.public_pw').prop('readonly', true)
        $('.public_pw').val('')
    })

})