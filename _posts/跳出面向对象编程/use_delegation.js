var LoginController = {
    errors: [],
    getUser: function () {
        return document.getElementById('login_username').value;
    },
    getPassword: function () {
        return document.getElementById('login_password').value;
    },
    validateEntry: function (user, pw) {
        user = user || this.getUser(); pw = pw || this.getPassword();
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
    },
    showDialog: function (title, msg) { // 给用户显示标题和消息
    },
    failure: function (err) {
        this.errors.push(err);
        this.showDialog('Error', 'Login invalid: ' + err);
    }
};

// 让 AuthController 委托 LoginController
var AuthController = {
    errors: [],
    checkAuth() {
        var user = this.getUser(); 
        var pw = this.getPassword();
        if (this.validateEntry(user, pw)) {
            this.server('/check-auth', {
                user: user,
                pw: pw
            })
                .then(this.accepted.bind(this))
                .fail(this.rejected.bind(this));
        }
    },
    server(url, data) {
        return $.ajax({
            url: url,
            data: data
        });
    },
    accepted() {
        this.showDialog('Success', 'Authenticated!')
    },
    rejected(err) {
        this.failure('Auth Failed: ' + err);
    }
};


// 现在把 AuthController 关联到 LoginController
Object.setPrototypeOf( AuthController, LoginController );

// ======================================================================================================================================

// 在行为委托模式中，AuthController 和 LoginController 只是对象，它们之间是兄弟关系， 并不是父类和子类的关系。代码中 AuthController 委托了 LoginController，反向委托也 完全没问题

// 这种模式的重点在于只需要两个实体(LoginController 和 AuthController)，而之前的模 式需要三个。

// 我们不需要 Controller 基类来“共享”两个实体之间的行为，因为委托足以满足我们需要 的功能
// 避免了面向类设计模式中的多态

// 对象关联(对象之前互相关联)是一种编码风格，它倡导的是直接创建和关联对象，不把
// 它们抽象成类。