var MyLog = (function () {
    function MyLog(content) {
        this.content = content;
    }
    MyLog.prototype.fail = function () {
        return true ? this : this
            .log();
    };
    MyLog.prototype.log = function () {
        console.log(this.content);
        return this;
    };
    return MyLog;
}());
var c = new MyLog("Hello world");
c.fail();
c.log();
console.log("sdfsd");
