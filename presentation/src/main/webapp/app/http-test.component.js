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
var core_1 = require('@angular/core');
var http_test_service_1 = require("./http-test.service");
var HTTPTestComponent = (function () {
    function HTTPTestComponent(_httpService) {
        this._httpService = _httpService;
        this.update();
    }
    HTTPTestComponent.prototype.update = function () {
        var _this = this;
        this._httpService.getNotes('./citys.json').subscribe(function (data) { return _this.getData = data; }, function (error) { return alert(error); }, function () { return console.log("Finished "); });
    };
    HTTPTestComponent = __decorate([
        core_1.Component({
            selector: 'http-test',
            template: "\n        <ul>\n        <li *ngFor=\"let note of getData\">\n        Titel : {{note.Name}}, UserId: {{note.City}}\n</li>\n</ul>\n    ",
            providers: [http_test_service_1.HTTPTestService]
        }), 
        __metadata('design:paramtypes', [http_test_service_1.HTTPTestService])
    ], HTTPTestComponent);
    return HTTPTestComponent;
}());
exports.HTTPTestComponent = HTTPTestComponent;
//# sourceMappingURL=http-test.component.js.map