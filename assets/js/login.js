$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form;
    // layui组件弹出层layer
    var layer = layui.layer;
    //   通过form.verify()函数 自定义校验规则
    form.verify({
        // 自定义 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            // value 是确认密码框中的内容
            //拿到密码框中的值和value判断
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致!'
            }
        }
    });

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认提交
        e.preventDefault();
        // 发起ajax post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
                    // return console.log(res.message);
            }
            // 弹出层组件 内置方法msg() ： 提示信息
            layer.msg('注册成功，请登录！');
            // console.log('登录成功');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    });

    // // 监听登录表单的提交事件
    // $('#form_login').submit(function(e) {
    //     // alert('1111')
    //     // 阻止默认提交
    //     e.preventDefault();
    //     // console.log($(this).serialize());
    //     $.ajax = ({
    //         url: '/api/login',
    //         method: 'POST',
    //         // 快速获取表单数据
    //         data: $(this).serialize(), // serialize()

    //         success: function(res) {
    //             alert('1111')
    //             if (res.status !== 0) {
    //                 return layer.msg('登录失败')
    //             }
    //             // 弹出层组件 内置方法msg() ： 提示信息
    //             layer.msg('登录成功');
    //             // 将登录成功后得到的 token 字符串（来自接口文档）保存到localStorage中
    //             localStorage.setItem('token', res.token);
    //             // 跳转到后台主页
    //             location.href = './index.html'
    //         }
    //     });
    // });


    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})