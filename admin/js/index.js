try { require('jQuery') } catch (err) { }

/**
 * 需求 1: 请求数据 取到网页本地存储中的token值后,发送ajax请求, 服务器验证成功后返回数据,将数据给渲染到页面上
 *      2:左侧导航栏添加点击事件,(1) 点击上面的模块会给与一个相应的样式, 其他的模块恢复模样[排他思想],
 *      3:判断当前点击事件的模块是否有子模块,如果有给它添加一个下拉菜单的样式,箭头也要跟着改变
 *      4:在文章管理下面的子选项中,利用排他思想, 给点击到的模块添加一个样式
 *      5:点击其他模块的时候, 有子选项的那个模块把子选项给隐藏,并且里面的子选项的样式也给移出
 *      6:点击右上角的个人中心 直接跳转到个人中心页面
 *      7:点击退出 返回到登录页面,并且token值清空
 *      8:用iframe的方法 将各种的页面渲染到各自的页面上面去
 */
$(() => {

    //发送AJAX请求
    $.ajax({
        url: newURL.user_info,
        //封装的url地址 请求服务器地址 

        // headers: {
        //     Authorization: localStorage.getItem('token_value')
        //     //设置请求头,Authorization(授权) 去浏览器本地存储里面取得token值
        // },

        dataType: 'json',
        //跟服务器声明返回json字符串

        success: (res) => {


            if (res.code === 200) {

                $('.user_info >img').attr('src', res.data.userPic);

                $('.user_info > span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);

                $('.user_center_link >img').attr('src', res.data.userPic);
            }
            //判断如果登陆成功的话 将数据渲染到页面上面去
        },
        // error: (err) => {

        //     //这里判断是否已经通过了验证,如果没有通过验证的话讲返回登录页面

        //     if (err.statusText == "Forbidden") {

        //         alert('您未登陆,请先登陆');

        //         window.location.href = './login.html';
        //     }
        // }
    })

    $('.level01').on('click', function () {
        //这里不适用用箭头函数,因为箭头函数中的this指向是指向windows

        $(this).addClass('active').siblings().removeClass('active');


        //有hasClass 可以不用带.

        if ($(this).next().hasClass('level02')) {

            $('.level02').slideToggle();

            $(this).find('b').toggleClass('rotate0');
        } else {
            $('.level02').slideUp();

            $('.level02').removeClass('rotate0');

            $('.level02 >li').removeClass('active')
        }


    })

    $('.level02>li').on('click', function () {

        $(this).addClass('active').siblings().removeClass('active');

    })

    $('.logout').on('click', () => {

        alert('您确定退出吗');

        window.localStorage.removeItem('token_value');

        window.location.href = './login.html';

    })




})
