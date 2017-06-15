// 所 有 控 制 器 共 享 的 基 础 行 为 是 success(..)、failure(..) 和 showDialog(..)。
// 子 类 LoginController 和 AuthController 通过重写 failure(..) 和 success(..) 来扩展默认基础 类行为。
// 此外，注意 AuthController 需要一个 LoginController 的实例来和登录表单进行 交互，因此这个实例变成了一个数据属性。


// 父类
class Controller {
    constructor() {
        this.errors = new Array();
    }
    showDialog(title, msg) { // 给用户显示标题和消息

    };
    success(msg) {
        this.showDialog('Success', msg);
    };
    failure(err) {
        this.errors.push(err);
        this.showDialog('Error', err);
    };
}


// 子类
class LoginController extends Controller {
    constructor() {
        super();
    }
    getUser() {
        return document.getElementById('login_username').value;
    };
    getPassword() {
        return document.getElementById('login_password').value;
    };
    validateEntry(user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if (!(user && pw)) {
            return this.failure(
                'Please enter a username & password!'
            );
        } else if (user.length < 5) {
            return this.failure(
                'Password must be 5+ characters!'
            );
        }
        // 如果执行到这里说明通过验证
        return true;
    };
    // 重写基础的 failure()
    failure(err) {
        // “super”调用
        super.failure('Login invalid: ' + err);
    };
}

// 子类
class AuthController extends Controller {

    constructor(login) {
        super();
        // 需要一个 LoginController 的实例来和登录表单
        this.login = login;
    }
    server(url, data) {
        return $.ajax({
            url: url,
            data: data
        });
    };
    checkAuth() {
        var user = this.login.getUser();
        var pw = this.login.getPassword();
        if (this.login.validateEntry(user, pw)) {
            this.server('/check-auth', {
                user: user,
                pw: pw
            }).then(this.success.bind(this))
                .fail(this.failure.bind(this));
        }
    };
    // 重写基础的 success()
    success() {
        // “super”调用
        super.success('Authenticated!');
    };
    // 重写基础的 failure()
    failure(err) {
        // “super”调用
        super.failure('Auth Failed: ' + err);
    };
}


var auth = new AuthController();
auth.checkAuth(
    // 除了继承，我们还需要合成
    new LoginController());