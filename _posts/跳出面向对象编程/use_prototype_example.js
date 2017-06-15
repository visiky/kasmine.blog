// 父类
function Controller() {
    this.errors = [];
}
Controller.prototype.showDialog(title, msg) { // 给用户显示标题和消息
};
Controller.prototype.success = function (msg) {
    this.showDialog("Success", msg);
};
Controller.prototype.failure = function (err) {
    this.errors.push(err);
    this.showDialog("Error", err);
};


// 子类
function LoginController() {
    Controller.call(this);
}
// 把子类关联到父类
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function () {
    return document.getElementById("login_username").value;
};
LoginController.prototype.getPassword = function () {
    return document.getElementById("login_password").value;
};
LoginController.prototype.validateEntry = function (user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();
    if (!(user && pw)) {
        return this.failure(
            "Please enter a username & password!"
        );
    }
    else if (user.length < 5) {
        return this.failure(
            "Password must be 5+ characters!"
        );
    }
    // 如果执行到这里说明通过验证
    return true;
};
// 重写基础的 failure() 
LoginController.prototype.failure = function (err) {
    //“super”调用 
    Controller.prototype.failure.call(this,"Login invalid: " + err);
};
// 子类
function AuthController(login) {
    Controller.call(this); // 合成
    this.login = login;
}
// 把子类关联到父类
AuthController.prototype = Object.create(Controller.prototype); 
AuthController.prototype.server = function (url, data) {
        return $.ajax({
            url: url,
            data: data
        });
    };
AuthController.prototype.checkAuth = function () {
    var user = this.login.getUser(); 
    var pw = this.login.getPassword();
    if (this.login.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw: pw
        }).then(this.success.bind(this))
        .fail(this.failure.bind(this));
    }
};
// 重写基础的 success()
AuthController.prototype.success = function () {
    //“super”调用
    Controller.prototype.success.call(this, "Authenticated!");
};
// 重写基础的 failure()
AuthController.prototype.failure = function (err) {
    //“super”调用
    Controller.prototype.failure.call(this,"Auth Failed: " + err);
};


var auth = new AuthController();
auth.checkAuth(
    // 除了继承，我们还需要合成
    new LoginController());