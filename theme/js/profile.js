function check_login(){
    var form = $('#login-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            user_login: {
                required: true,
                minlength: 2
            },
            user_passwd: {
                required: true,
                minlength: 4
            }
        },
        messages: {
            user_login: {
                required: "请输入用户名",
                minlength: $.format("用户名长度至少{0}位")
            },
            user_passwd: {
                required: "请输入密码",
                minlength: $.format("密码长度至少{0}位")
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0)
                    window.location.href = get_redirect();
                else
                    show_error(data.response);
            }, 'json');
        }
    });
}

function check_register(){
    var form = $('#register-form');
    var agree = function(){
        window.setTimeout(function(){
            var obj = $("#accept");
            var objinfo = obj.find('span');
            obj.show();
            objinfo.show();
        }, 20);
    };
    var accept = $("input[name='accept']");
    accept.bind('click', function(){
        if (accept.attr('checked') == true)
            $('#accept').hide();
        else
            agree();
    });
    form.find('button').bind('click', function(){
        if (accept.attr('checked') !== true)
            agree();
    });
    var validator = form.validate({
        event: "focus", 
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            if (element.is(":checkbox"))
                return;
            var next = element.next();
            var span = next.parent().find('span').eq(0);
            span.css({'position':'relative', 'top': (!-[1,] ? '-5px' : '0px'), 'left':'5px'});
            var image = span.find('img').eq(0);
            if (image.length == 0)
                next.append($('<img src="/theme/img/validation-err.gif" />'));
            else
                image.attr('src', '/theme/img/validation-err.gif');
            label.appendTo(next.next());
        },
        success: function(label) {
            label.parent().parent().find('img').eq(0).attr('src', '/theme/img/validation-ok.gif');
            label.remove();
        },
        rules: {
            user_login: {
                required: true,
                minlength: 3,
                remote: "/register/check"
            },
            user_passwd: {
                required: true,
                minlength: 5
            },
            user_repeat: {
                required: true,
                equalTo: "#user_passwd"
            },
            user_email: {
                required: true,
                email: true,
                remote: "/register/check"
            },
            captcha: {
                required: true,
                minlength: 4,
                maxlength: 5
            },
            accept: "required"
        },
        messages: {
            user_login: {
                required: "请输入用户名",
                minlength: $.format("用户名长度至少{0}位"),
                remote: function() {
                    return "用户名 " + $("input[name='user_login']").val() + " 已经被注册";
                }
            },
            user_passwd: {
                required: "请输入密码",
                minlength: $.format("密码长度至少{0}位")
            },
            user_repeat: {
                required: "请输入确认密码",
                minlength: $.format("确认密码长度至少{0}位"),
                equalTo: "确认密码不匹配"
            },
            user_email: {
                required: "请输入邮箱",
                minlength: "邮箱地址太短",
                email: "邮箱格式错误",
                remote: function() {
                    return "邮箱地址 " + $("input[name='user_email']").val() + " 已经被注册";
                }
            },
            captcha: {
                required: "请输入验证码",
                minlength: $.format("验证码长度必须{0}位")
            },
            accept: "&nbsp;"
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    window.location.replace(get_redirect());
                } else {
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function check_resetpasswd(){
    var form = $('#resetpasswd-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            user_login: {
                required: true,
                minlength: 3
            },
            user_email: {
                required: true,
                email: true
            }
        },
        messages: {
            user_login: {
                required: "请输入用户名",
                minlength: $.format("用户名长度至少{0}位")
            },
            user_email: {
                required: "请输入邮箱",
                minlength: "邮箱地址太短",
                email: "邮箱格式错误"
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    show_success(data.response, get_redirect());
                } else {                    
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function check_resetpasswd_edit(){
    var form = $('#resetpasswd_edit-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            user_passwd: {
                required: true,
                minlength: 5
            },
            user_repeat: {
                required: true,
                equalTo: "#user_passwd"
            }
        },
        messages: {
            user_passwd: {
                required: "请输入新密码",
                minlength: $.format("新密码长度至少{0}位")
            },
            user_repeat: {
                required: "请输入确认新密码",
                minlength: $.format("确认新密码长度至少{0}位"),
                equalTo: "确认新密码不匹配"
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    show_success(data.response, get_redirect());
                } else {
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function check_profile(){
    var form = $('#profile-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            user_nick: {
                required: true,
                minlength: 2,
                maxlength: 15
                //remote:"/profile/index/check"
            },
            user_email: {
                required: true,
                email: true,
                remote: "/profile/index/check"
            }
        },
        messages: {
            user_nick: {
                required: "请输入昵称",
                minlength: $.format("昵称长度至少{0}位"),
                maxlength: $.format("昵称长度最多{0}位")
                /*remote: function() {
                    return "昵称 " + $("input[name='user_nick']").val() + " 已经被其他用户使用";
                }*/
            },
            user_email: {
                required: "请输入邮箱",
                minlength: "邮箱地址太短",
                email: "邮箱格式错误",
                remote: function() {
                    return "邮箱 " + $("input[name='user_email']").val() + " 已经被其他用户使用";
                }
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    show_success(data.response);
                } else {
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function check_profile_passwd(){
    var form = $('#profile_passwd-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            passwd: {
                required: true,
                minlength: 5,
                remote:"/profile/passwd/check"
            },
            user_passwd: {
                required: true,
                minlength: 5
            },
            user_repeat: {
                required: true,
                equalTo: "#user_passwd"
            }
        },
        messages: {
            passwd: {
                required: "请输入当前密码",
                minlength: $.format("当前密码长度至少{0}位"),
                remote: "当前密码错误"
            },
            user_passwd: {
                required: "请输入新密码",
                minlength: $.format("新密码长度至少{0}位")
            },
            user_repeat: {
                required: "请输入确认新密码",
                minlength: $.format("确认新密码长度至少{0}位"),
                equalTo: "确认新密码不匹配"
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    show_success(data.response, get_redirect());
                } else {
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function check_profile_contact(){
    var form = $('#profile_contact-form');
    var validator = form.validate({
        event: 'focus',
        errorClass: "error",
        validClass: "valid",
        errorElement: "span",
        errorPlacement: function(label, element) {
            label.appendTo(element.next());
        },
        success: function(label) {
            label.remove();
        },
        rules: {
            user_name: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            user_phone: {
                required: true,
                minlength: 10,
                maxlength: 18
            },
            user_province: "required",
            user_city: "required",
            user_address: {
                required: true,
                minlength: 5,
                maxlength: 255
            }
        },
        messages: {
            user_name: {
                required: "请提供真实姓名",
                minlength: $.format("真实姓名长度至少{0}位"),
                maxlength: $.format("真实姓名长度超出{0}位")
            },
            user_phone: {
                required: "请提供联系电话",
                minlength: $.format("联系电话至少{0}位"),
                maxlength: $.format("联系电话超出{0}位")
            },
            user_province: "请选择所在省份",
            user_city: "请选择所在城市",
            user_address: {
                required: "请提供联系地址",
                minlength: $.format("联系地址长度太短"),
                maxlength: $.format("联系地址长度超出{0}位")
            }
        },
        submitHandler: function() {
            $.post(form.attr('action'), form.serialize(), function(data){
                if (data.error == 0) {
                    show_success(data.response);
                } else {
                    show_error(data.response);
                }
            }, 'json');
        }
    });
}

function get_redirect(){
    return $("input[name='redirect']").val();
}

function message(obj){
    if (typeof(obj) == 'object') {
        var info = [];
        for (var key in obj)
            info.push(obj[key]);
        return info.join('<br />');
    }
    return obj;
}

function show_error(val){
    $("#captcha-wrap").find('img').attr('src', '/login/captcha?'+(new Date()));
    $("#error").show().find('span').css({'color':'#FF3300', 'background-color':'#FFF7F7', 'border-color':'#FF6633'}).html(message(val)).show().fadeOut(5000, function(){ $(this).parent().hide(); });
}

function show_success(val, url){
    var obj = $("#error");
    obj.show().find('span').css({'color':'#FFFFFF', 'background-color':'#0C8CF5', 'border-color':'#2360BA'}).html(message(val)).show();
    window.setTimeout(function(){ 
        obj.hide();
        if (typeof(url) != 'undefined')
            window.location.href = url;
    }, 5000);
}