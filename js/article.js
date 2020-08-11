try { require('jQuery') } catch (err) { }
/**
 * 需求 1:文章详细内容渲染页面
 */

$(() => {

    //入口函数

    let id = location.search.split('=')[1];

    console.log(id);

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/article',

        dataType: 'json',

        data: { id },

        success: (res) => {
            console.log(res);
            $('.setfr').html(template('templateArticle', res.data))
        }
    })
})