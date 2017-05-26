"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var info_1 = require("./info");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
require("rxjs/add/operator/map");
var InfoFormComponent = (function () {
    function InfoFormComponent(http) {
        var _this = this;
        this.http = http;
        this.scores = ['0   Breakdown', '10  Angry', "20  Sorrowful", "30  Upset", "40  Anxious", "50  Lost", "60  So-so", "70  Contented", "80  Happy", "90  Excited", "100 Ecstatic"];
        this.create = false;
        this.detailPage = false;
        this.eye = new info_1.Info();
        this.detail = new info_1.Info();
        http.get("/list")
            .map(function (res) { return res.json(); })
            .subscribe(function (v) { _this.eyes = v; });
    }
    InfoFormComponent.prototype.showCreatePage = function () {
        this.create = true;
    };
    InfoFormComponent.prototype.createBackToListPage = function () {
        this.create = false;
    };
    InfoFormComponent.prototype.submit = function () {
        var _this = this;
        var body = JSON.stringify(this.eye);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http
            .post('/list', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data[data.length - 1]); _this.create = false; }, function (err) { console.log(err); }, function () {
            _this.http.get("/list")
                .map(function (res) { return res.json(); })
                .subscribe(function (v) { _this.eyes = v; });
        });
    };
    InfoFormComponent.prototype.goDetail = function (id) {
        var _this = this;
        this.detailPage = true;
        return this.http
            .get("/detail/" + id)
            .map(function (res) { return res.json(); })
            .subscribe(function (v) { _this.detail = v; });
    };
    InfoFormComponent.prototype.detailBackToListPage = function () {
        this.detailPage = false;
    };
    return InfoFormComponent;
}());
InfoFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'info-form',
        templateUrl: './temp/info-form.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], InfoFormComponent);
exports.InfoFormComponent = InfoFormComponent;
//# sourceMappingURL=eye-form.component.js.map