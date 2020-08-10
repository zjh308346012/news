/**
 * 需求 1:进行ajax数据请求,请求回来之后,定义模板,取到值后,将数据进行模板引擎填充
 *      2:操作框这里需要判断一下,因为会出现三种情况,拒绝,删除批准
 *      3:使用boostrap的插件,进行分页处理 并且如果删除一页的数据之后,当前页面应该减1
 */
try { require('jQuery') } catch (err) { }

$(() => {

    let page = 1, perpage = 5;

    function listOpt() {
        $.ajax({

            url: newURL.comment_search,

            dataType: 'json',

            data: {
                page,
                perpage
            },

            success: (res) => {

                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template('templateComment', res.data));

                    setPage(res.data.totalPage)
                }
            }
        })
    }
    listOpt();

    function setPage(total) {

        $(".pagination").bootstrapPaginator({

            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: total,
            onPageClicked: function (event, originalEvent, type, cpage) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                page = cpage
                //点击按钮重置当前页数
                listOpt();
            }
        })
    }

    //批准按钮 
    $('tbody').on('click', '.btn-pass', function (e) {

        let id = $(this).attr('data-id');

        e.preventDefault();

        stateBtn(newURL.comment_pass, id)

    })

    //拒绝按钮
    $('tbody').on('click', '.btn-reject', function (e) {

        let id = $(this).attr('data-id');

        e.preventDefault();

        stateBtn(newURL.comment_reject, id)

    })


    //删除按钮
    $('tbody').on('click', '.btn-delete', function (e) {

        let id = $(this).attr('data-id');

        let totalCount = $(this).attr('data-totalCount');

        let totalPage = $(this).attr('data-totalPage')

        let arrObj = $(this).parents('tr').siblings().length;

        e.preventDefault();

        stateBtn(newURL.comment_delete, id, function () {

            // if (arrObj == 0) {
            //     if (page > 1) {
            //         page--;
            //         listOpt();
            //     }
            // } else {
            //     listOpt();
            // }

            if ((totalCount % perpage) - 1 == 0) {
                if (page > 1) {
                    page--;
                    listOpt();
                }
            } else {
                listOpt();
            }
            // console.log(totalCount);

            // if ()

            // if ((totalPage.length - 1) == 0) {


            //     if (page > 1) {
            //         console.log(123);
            //         page--;
            //         listOpt();
            //     }

            // } else {
            //     listOpt();
            // }


        })


        // res.data.data.forEach((item) => {
        // })
    })


    //封装三个按钮的函数
    function stateBtn(url, id, callback) {

        $.ajax({
            type: 'post',

            url: url,

            dataType: 'json',

            data: { id },

            success: (res) => {
                console.log(res);

                alert(res.msg);

                callback && callback();

                listOpt();

            }
        })

    }

})




