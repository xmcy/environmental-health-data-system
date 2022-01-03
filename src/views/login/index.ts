import { Vue, Component } from "vue-property-decorator";
import "./_index.scss";

@Component({ template: require("./index.html") })
export default class Login extends Vue {
    /**
     * 记住用户名和密码
     *
     * @protected
     * @type {boolean}
     * @memberof Login
     */
    protected remember: boolean = true;

    /**
     * 用户名和密码的form对象
     *
     * @protected
     * @type {{ username: string; password: string }}
     * @memberof Login
     */
    protected form: { username: string; password: string } = {
        username: "",
        password: ""
    };

    /**
     * 用户名和密码验证
     *
     * @protected
     * @type {*}
     * @memberof Login
     */
    protected rules: any = {
        username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
    };

    public login() {
        (<any>this.$refs.loginForm).validate(async (valid: any) => {
            if (!valid) {
                return;
            }
            let params: any = {
                client_id: "unity-client",
                client_secret: "unity",
                grant_type: "password",
                password: this.form.password,
                username: this.form.username
            };

            let result: any = await this.service.post("/oauth/extras/token", params);
            if (!result?.access_token) {
                this.$message.error("登录失败");
                console.error("登录失败:", result);
                return;
            }
            this.$router.push({ name: "global" });
        });
    }
}
