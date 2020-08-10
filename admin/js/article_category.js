
/**
 * 需求 1:文章类别管理进行数据渲染
 *      2:当模态框关闭之后全部清零
 *      3:点击编辑按钮的时候弹出模态框,模态框里面的数值用自定义属性存在(ID也要,为后面的编辑当前的列表提供ID),里面相应的文本也要改变(编辑分类,编辑)
 *       4:点击按钮判断按钮是新增按钮还是编辑按钮 如果是新增进行相应的操作,如果是编辑进行相应的操作,把两个ajax请求封装成一个函数进行调用
 *        5:删除模块 点击删除按钮,自定义属性,调用自定义属性的ID 然后进行ajax数据请求
 *        6:将模板渲染进行封装,然后每一个进行修改的ajax请求的每个模块调用进行刷新页面,
 */
try { require('jQuery') } catch (err) { }

$(() => {

    //文章类别管理进行数据渲染

    function init() {
        $.ajax({

            url: newURL.category_list,

            dataType: 'json',

            success: (res) => {

                console.log(res);

                $('tbody').html(template('templateCategory', res))
            }
        })

    }
    init();
    //点击新增按钮弹出模态框,以及里面的文本名称进行改变

    //新增模块
    // $('.btn-primary').on('click', function () {

    //     $('#myModal').modal('show');

    //     let formdata = $('form').serialize();
    //     console.log(formdata);

    //     $.ajax({

    //         type: 'post',

    //         url: newURL.category_add,

    //         dataType: 'json',

    //         data: formdata,

    //         success: (res) => {
    //             console.log(res);

    //             if (res.code == 201) {

    //                 alert('新增成功');

    //                 $('#myModal').modal('hide');

    //                 init();
    //             }
    //         },
    //         error: function (err) {
    //             console.log(err)
    //             // 如果数据输入重复，则会报错
    //             if (err.responseJSON.code == 400) {
    //                 alert(err.responseJSON.msg)
    //             }
    //         }
    //     })
    // })

    $('#myModal').on('hidden.bs.modal', function (e) {

        $('form')[0].reset();

    })

    //动态生成的元素必须用事件委托来做,才能获取它的值

    $('tbody').on('click', '.btn-edit', function () {

        $('#name').val($(this).data('name'));

        $('#slug').val($(this).data('slug'));

        $('#id').val($(this).data('id'));

        $('#myModal').modal('show');

        $('.modal-title').text('编辑分类');

        $('.btn-primary').text('编辑');

    })

    $('.btn-primary').on('click', function () {

        if ($(this).text() == '新增') {

            let formdata = $('form').serialize();

            opt(newURL.category_add, formdata, '新增');

        } else if ($(this).text() == '编辑') {

            let name = $('#name').val();

            let slug = $('#name').val();

            let id = $('#name').val();

            opt(newURL.category_edit, { name, slug, id }, '编辑');
        }

    })

    //封装新增与编辑的ajax请求

    function opt(url, data, msg) {

        $.ajax({

            type: 'post',

            url: url,

            dataType: 'json',

            data: data,

            success: (res) => {
                if (res.code == 201 || res.code == 200) {
                    alert(msg + '操作成功');

                    $('#myModal').modal('hide')

                    init();
                }
            },
            error: function (err) {
                console.log(err)
                // 如果数据输入重复，则会报错
                if (err.responseJSON.code == 400) {
                    alert(err.responseJSON.msg)
                }
            }


        })

    }

    //删除模块
    $('tbody').on('click', '.btn-del', function () {

        let id = $(this).data('id');

        if (confirm('你真的要删除吗')) {

            $.ajax({

                type: 'post',

                url: newURL.category_delete,

                dataType: 'json',

                data: {
                    id
                },

                success: (res) => {
                    console.log(res);

                    alert(res.msg);

                    init();
                }

            })

        }

    })

})