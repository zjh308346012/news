try { require('jQuery') } catch (err) { }

$(() => {
    $.ajax({

        url: newURL.category_list,

        dataType: 'json',

        success: (res) => {
            console.log(res);
            if (res.code == 200) {

                $('.category').html(template('templateRelease', res))
            }
        }
    })

    //时间插件jedate
    jeDate("#indate", {
        // 触发操作
        trigger: "click",
        theme: { bgcolor: "#D91600", pnColor: "orange" },
        format: "YYYY-MM-DD",
        isinitVal: true,
        shortcut: [
            { name: "一周", val: { DD: 7 } },
            { name: "一个月", val: { DD: 30 } },
            { name: "二个月", val: { MM: 2 } },
            { name: "三个月", val: { MM: 3 } },
            { name: "一年", val: { DD: 365 } }
        ]
    })

    //富文本框的插件

    tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN'
    });
})