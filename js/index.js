try { require('jQuery') } catch (err) { }

/**
 * 需求1:将图片说明部分利用ajax 请求的数据进行数据渲染, 第一张图片记得要放大(first方法)
 *     2:将最新资讯的部分用ajax 请求的数据进行数据渲染.
 *     3:右边的最新评论部分用ajax 请求的数据进行数据渲染,但是注意这里的距离时间要用到时间戳的办法(Date.now()-new.Date(res.data.date).valueOf 算出时间)
 */

$(() => {
    //入口函数


    //引用模板,AJAX数据请求 热点图的模板渲染
    $.ajax({

        url: 'http://localhost:8080/api/v1/index/hotpic',

        data: 'json',

        success: (res) => {
            console.log(res);

            if (res.code == 200) {


                $('.focus_list').html(template('templateFocuslist', res));

            }
        }
    })

    //最新资讯的模板渲染

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/latest',

        dataType: 'json',

        success: (res) => {

            console.log(res);

            $('.common_news').html(template('templateNews', res))
        }
    })

    //最新评论的模板渲染

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

    //焦点评论模板渲染

    $.ajax({

        url: 'http://localhost:8080/api/v1/index/attention',

        dataType: 'json',

        success: (res) => {
            console.log(res);

            $('.guanzhu_list').html(template('templateAttention', res));

        }
    })

    //文章热门排行
    $.ajax({

        url: 'http://localhost:8080/api/v1/index/rank',

        dataType: 'json',

        success: (res) => {
            console.log(res);

            $('.hotrank_list').html(template('templateRank', res))
        }
    })
})