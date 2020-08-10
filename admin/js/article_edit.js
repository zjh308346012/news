/**
 * 需求1:点击编辑按钮,获取点击当前的id,用id去ajax请求数据,将获得数据重新渲染到当前的编辑页面   
 *     2:图片本地预览
 *     3:JEDATE时间插件的使用
 *     4:富文本框的插件使用
 *     5:点击修改按钮,进行数据的提交
 */

try { require('jQuery') } catch (err) { }

$(() => {

    let id = location.search.split('=')[1];

    console.log(id);
    //获取url进行截取ID

    //进行AJAX请求


    $.ajax({
        url: newURL.article_search,

        dataType: 'json',

        data: { id },

        success: (res) => {
            console.log(res);

            if (res.code == 200) {
                $('#inputTitle').val(res.data.title);

                $('.article_cover').attr('src', res.data.cover);

                $('.category').val(res.data.categoryId);

                $('#indate').val(res.data.date);

                $('#mytextarea').val(res.data.content);
            }
        }

    })

    //点击修改按钮


    //图片本地预览


    $('#inputCover').change(function () {

        let myFile = this.files[0];

        let myUrl = URL.createObjectURL(myFile);

        $('.article_cover').attr('src', myUrl);
    })

    //因为修改跟存为草稿都是同样的操作所以我们把它封装成函数

    //修改按钮
    $('.btn-edit').on('click', function (e) {

        e.preventDefault();
        opt('已发布');
    })
    //存为草稿按钮
    $('.btn-draft').on('click', function (e) {

        e.preventDefault();
        opt('草稿');
    })


    function opt(state) {

        let formdata = new FormData($('#form')[0]);

        console.log(...formdata);

        formdata.append('id', id);

        formdata.append('content', tinymce.activeEditor.getContent());

        formdata.append('state', state);

        $.ajax({

            type: 'post',

            url: newURL.article_edit,

            dataType: 'json',

            data: formdata,

            contentType: false,

            processData: false,

            success: (res) => {
                console.log(res);

                alert(res.msg);

                window.location.href = './article_list.html';

            },
            error: (err) => {
                console.log(err);
            }
        })
    }


})