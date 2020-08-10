$(() => {
    //入口函数, 页面在加载的时候 如果没有这个入口函数的话 会导致js 文件无法跟页面契合导致错误

    /**
     * 需求 1.给登录按钮添加注册点击事件 
     *      2.发送ajax请求 如果数据请求成功的话 需要记录一下token 值 将它存储在本地存储中去
     *      3.获取用户名与密码框的值
     *      4.给登录成功或失败添加模态框 bootstrap框架
     *      5.进行判断,如果失败,重新输入正确的账号密码,如果成功弹出成功的提示框 然后点击确定隐藏模态框后触发跳转页面事件
     * 
     * 
     */

    $('.input_sub').on('click', () => {
        //给登录按钮注册点击事件

        const username = $('.input_txt').val();

        const password = $('.input_pass').val();

        //获取用户名跟密码的值

        $.ajax({
            //发送AJAX请求
            type: 'post',

            url: newURL.user_login,

            data: {
                username,
                password
            },

            dataType: 'json',

            success: (res) => {
                console.log(res);
                if (res.code === 200) {

                    window.localStorage.setItem('token_value', res.token);
                    //请求数据成功 获得token值 将它存储在本地存储

                    $('#myModal').modal('show');

                    $('.txtInfo').html(res.msg);

                    $('#myModal').on('hidden.bs.modal', function (e) {
                        window.location.href = './index.html';
                    })

                } else {
                    $('#myModal').modal('show');

                    $('.txtInfo').html(res.msg);
                }
            }


        })
        $('.btn-primary').on('click', () => {

            $('#myModal').modal('hide');

        })
    })
})