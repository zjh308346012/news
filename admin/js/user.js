try { require('jQuery') } catch (err) { }

/**
 * 需求1: 点击个人中心的时候,向服务器请求跟人数据,并且渲染到页面上去
 *     2:图片的选择文件点击发生变化的时候,将图片更换
 *     3:点击修改按钮的时候 将图片同步到主页上的个人中心
 *     
 */

$(() => {
    //入口函数

    function optUser() {
        $.ajax({

            url: newURL.user_detail,
            //服务器链接地址

            // headers: {
            //     Authorization: localStorage.getItem('token_value')
            //     //要验证token值
            // },

            dataType: 'json',

            success: (res) => {
                console.log(res);
                if (res.code === 200) {


                    //数据请求成功通过后
                    $('.username').val(res.data.username);

                    $('.nickname').val(res.data.nickname);

                    $('.email').val(res.data.email);

                    $('.user_pic').attr('src', res.data.userPic);

                    $('.password').val(res.data.password);

                }

            }
        })
    }
    optUser();

    //给更换图片的模块注册点击事件

    $('#exampleInputFile').change(function () {
        const file = this.files[0];

        const url = URL.createObjectURL(file);

        //URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

        $('.user_pic').attr('src', url);

        console.log(url);
    })

    //给修改按钮添加一个点击事件

    $('.btn-edit').on('click', function (e) {

        e.preventDefault();
        //获取form表单里面的所有值

        let formdata = new FormData($('#form')[0]);
        //发送请求
        $.ajax({

            type: 'post',

            url: newURL.user_edit,

            dataType: 'json',

            data: formdata,

            contentType: false,

            processData: false,

            success: (res) => {
                console.log(res);

                if (res.code == 200) {


                    window.parent.location.reload();
                }
            }

        })

    })

})