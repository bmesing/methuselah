

class MyLog {

    constructor(
        private content: string,
    ) {
    }

    fail() : MyLog {
        return true ? this : this
                .log();
    }
    
    log() : MyLog {
        console.log(this.content);
        return this;
    }
}



let c = new MyLog("Hello world");
c.fail();
c.log();
console.log("sdfsd");
