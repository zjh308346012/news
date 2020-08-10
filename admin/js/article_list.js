/**
 * 需求:1获取分别列表数据,引入模板Js ,定义模板引擎, 获取到的数据渲染到模板引擎上
 *      2:下拉选择框,要进行动态数据获取,
 *      3:点击筛选按钮进行刷新的重新渲染
 *      4:引入boostrap的组件,分页插件
 *      <script src="./libs/jquery-1.12.4.min.js"></script>
<script src="./libs/bootstrap/js/bootstrap.min.js"></script>
<!-- 引入模板引擎js文件 -->
<script src="./libs/template-web.js"></script>
<script src="./libs/bootstrappaginator/bootstrap-paginator.min.js"></script>
        5:在写分页的js的时候注意
        - bootstrapMajorVersion：它来设置当前的bootstrap的版本，不同的版本所需要的分页结构不一样
       - 3.X ---ul
       - 2.X ---div
-       currentPage:当前页码，后期与ajax请求中的页码对应,它的作用看上去可以为当前页码添加样式
-       totalPages：总页数，一般后台都会有返回
-      onPageClicked：单击页码所触发的事件，单击页码需要加载这一页的数据
 */
try { require('jQuery') } catch (err) { }

$(() => {
    //入口函数
    let page = 1;

    let perpage = 8;

    //文章列表渲染部分
    copy();
    function copy() {
        $.ajax({

            url: newURL.article_query,

            dataType: 'json',

            data: {
                page,
                //当前页

                perpage,
                //每页显示的评论数

                type: $('#selCategory').val(),
                //文章类型ID

                state: $('#selStatus').val()
                //文章状态
            },

            success: (res) => {

                console.log(res);

                if (res.code == 200) {

                    $('tbody').html(template('templateQuery', res.data))

                    if (res.data.totalPage > 1) {
                        //如果当前页数超过1的话,将数据中的总页数传给boostrap的函数插件

                        rander(res.data.totalPage)

                    } else {
                        //如果当前页数没有超过1的话就只显示一页
                        rander(1)
                    }
                }
            }
        })
    }

    //文章类别渲染部分
    $.ajax({
        //文章类别部分利用到动态加载的,因为有文章类别管理科员新增文章类别的模块
        url: newURL.category_list,

        dataType: 'json',

        success: (res) => {

            if (res.code == 200) {

                console.log(res);

                $('#selCategory').html(template('templateList', res))
            }
        }
    })

    //筛选按钮部分
    $('#btnSearch').on('click', function (e) {
        //当文章类别跟文章的状态选取好了之后,点击筛选按钮,让页面重新加载刷新

        e.preventDefault();

        page = 1;


        copy();

    })

    function rander(total) {
        //这里的Boosstrap插件必须设置版本号 2X 用div 3X用ul 

        $('.pagination').bootstrapPaginator({

            bootstrapMajorVersion: 3,
            //设置版本号

            currentPage: page,
            //当前页码

            totalPages: total,
            //总页数


            onPageClicked: (event, originalEvent, type, cpage) => {

                //这里是点击boostrap插件的选择框的时候,触发事件点击到那个页面就跳转到那个页面

                page = cpage;

                copy();
            }
        })
    }

    //删除文章模块
    $('tbody').on('click', '.delete', function () {
        console.log(123);

        let id = $(this).attr('data-id');
        console.log(id);

        $.ajax({

            type: 'post',

            url: newURL.article_delete,

            dataType: 'json',

            data: { id },

            success: (res) => {
                console.log(res);
                if (res.code == 204) {
                    window.location.href = './article_list.html'
                }
            }
        })

    })
    //点击编辑按钮 进入编辑界面,并且编辑界面渲染所点击的数据

   
})
