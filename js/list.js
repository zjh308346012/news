try { require('jQuery') } catch (err) { }
/**
 * 需求1:将根据后台接口的数据渲染到前台页面上
 */

$(() => {
    //最新资讯的模板渲染

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/latest',

        dataType: 'json',

        success: (res) => {

            console.log(res);

            $('.common_news').html(template('templateNews', res))
        }
    })

    //文章热门排行
    $.ajax({

        url: 'http://localhost:8080/api/v1/index/rank',

        dataType: 'json',

        success: (res) => {
            console.log(res);

            $('.content_list').html(template('templateRank', res))
        }
    })

    //焦点评论模板渲染

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/attention',

        dataType: 'json',

        success: (res) => {
            console.log(res);

            $('.guanzhu_list').html(template('templateAttention', res));

        }
    })

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/latest_comment',

        dataType: 'json',

        success: (res) => {
            console.log(res);
            if (res.code == 200) {

                res.data.forEach((item) => {
                    console.log(item);

                    item.mydate = Math.round((Date.now() - new Date(item.date)) / 1000 / 60 / 60 / 24 / 30);

                })
            }

            $('.comment_list').html(template('templateComment', res))
        }
    })
})