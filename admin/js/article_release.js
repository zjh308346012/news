/**
 * 需求 1: 图片预览
 *      2:文章类型要动态渲染取得,ajax模板引擎
 *      3:时间插件jedate
 *      4:富文本框插件
 *      5:封装函数 ajax发送请求
 *      6:点击发布state状态码(已发布)
 *      7:点击发布state状态码(草稿)
 *
 */
try { require('jQuery') } catch (err) { }

$(() => {


    //图片预览模块
    $('#inputCover').change(function (e) {

        e.preventDefault();

        let myFile = $(this)[0].files[0];

        let myUrl = URL.createObjectURL(myFile);

        $('.article_cover').attr('src', myUrl);
    })


    //文章类型动态渲染模块
   

    //请求ajax 将它封装成函数

    function articleOpt(state) {

        let formdata = new FormData($('#form')[0]);

        formdata.append('content', tinymce.activeEditor.getContent());

        formdata.append('state', state)

        $.ajax({

            type: 'post',

            url: newURL.article_publish,

            dataType: 'json',

            contentType: false,

            processData: false,

            data: formdata,

            success: (res) => {

                window.location.href = './article_list.html';
            }

        })
    }

    //发布按钮模块

    $('.btn-release').on('click', function (e) {

        e.preventDefault();

        articleOpt('已发布');
    })

    //草稿按钮模块

    $('.btn-draft').on('click', function (e) {

        e.preventDefault();

        articleOpt('草稿');
    })
})