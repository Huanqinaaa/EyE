"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Info = (function () {
    function Info(id, date, spend, content, score) {
        if (id === void 0) { id = 0; }
        if (date === void 0) { date = ''; }
        if (spend === void 0) { spend = ''; }
        if (content === void 0) { content = ''; }
        if (score === void 0) { score = ''; }
        this.id = id;
        this.date = date;
        this.spend = spend;
        this.content = content;
        this.score = score;
    }
    return Info;
}());
exports.Info = Info;
//# sourceMappingURL=info.js.map