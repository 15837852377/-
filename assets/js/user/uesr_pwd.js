$(function () {
    const form = layui.form
    // 自定义检验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
        },
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    });
    // 更新密码
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更改密码失败！")
                // 修改密码成功后清空秘钥并且跳转到登录页面
                localStorage.removeItem("token")
                // 子页面跳转无法实现整个页面出去 调用父盒子跳转整个页面
                window.parent.location.href = "/login.html"
            }
        })
    })
})