"use strict";
angular.module("pomasanaAppApp", ["ngRoute", "ngCookies", "ngResource", "ngSanitize", "LocalStorageModule", "angular-loading-bar", "mgcrea.ngStrap", "ui.bootstrap", "progressButton"]).value("baseUrl", "http://pomasana.appspot.com/api").value("redirectBaseUrl", "http%3A%2F%2F127.0.0.1%3A9000%2F%23%2F").config(["$routeProvider",
    function(a) {
        var b = ["$location", "$q", "AuthService",
            function(a, b, c) {
                var d = b.defer();
                return c.isLogged() ? d.resolve() : (d.reject(), a.path("/")), d.promise
            }
        ];
        a.when("/", {
            templateUrl: "views/main.html",
            controller: "MainCtrl",
            resolve: {
                loggedHome: ["$location", "$q", "AuthService",
                    function(a, b, c) {
                        var d = b.defer();
                        return c.isLogged() ? (d.reject(), a.path("/pomotasks-todo")) : d.resolve(), d.promise
                    }
                ]
            }
        }).when("/personal-page", {
            templateUrl: "views/personal-page.html",
            controller: "MainCtrl",
            resolve: {
                loginRequired: b
            }
        }).when("/pomotasks-todo", {
            templateUrl: "views/app/pomotasks-todo.html",
            controller: "PomotaskCtrl",
            resolve: {
                loginRequired: b
            }
        }).when("/pomotasks-done", {
            templateUrl: "views/app/pomotasks-done.html",
            controller: "PomotaskCtrl",
            resolve: {
                loginRequired: b
            }
        }).when("/inventory", {
            templateUrl: "views/app/inventory.html",
            controller: "InventoryCtrl",
            resolve: {
                loginRequired: b
            }
        }).otherwise({
            redirectTo: "/"
        })
    }
]).config(["localStorageServiceProvider",
    function(a) {
        a.setPrefix("pomasana_")
    }
]).run(["$rootScope", "$location", "UserService", "AuthService", "ErrorService",
    function(a, b, c, d, e) {
        a.currentUser = d.getUser(), d.isLogged() && !d.getUser() && c.getMe(function(b) {
            d.setUser(b.data), a.currentUser = b.data
        }, function(a) {
            e.handle(a)
        })
    }
]), angular.module("progressButton", []).directive("progressButton", function() {
    return {
        scope: !0,
        link: function(a, b, c) {
            a.$parent[c.progressButton] = a, a.progressStart = function() {
                var c = b;
                if (lastProgress = (new Date).getTime(), !b.hasClass("in-progress")) {
                    c.on("progress", function() {
                        lastProgress = (new Date).getTime()
                    });
                    var d = $window.setInterval(function() {
                        (new Date).getTime() > 2e3 + lastProgress && a.progressIncrement(.05)
                    }, 500);
                    c.on("progress-finish", function() {
                        window.clearInterval(d)
                    }), a.progressIncrement(.1)
                }
            }, a.progressFinish = function() {
                a.progressSet(1)
            }, a.progressIncrement = function(a) {
                a = a || .1, f(b, "progress", {
                    value: a
                })
            }, a.progressSet = function(a) {
                var c = !1;
                a >= 1 && (c = !0), f(b, "progress", {
                    value: a,
                    absolute: !0,
                    finish: c
                })
            }, a.progressTimed = function(c, d) {
                var e = b,
                    f = angular.element(e[0].querySelectorAll(".tz-bar"));
                e.hasClass("in-progress") || (f.css("transition", c + "s linear"), a.progressSet(.99), window.setTimeout(function() {
                    f.css("transition", ""), a.progressFinish(), "function" == typeof d && d()
                }, 1e3 * c))
            };
            var d = function() {
                function a(a) {
                    h.hasClass("background-horizontal") || h.hasClass("background-bar") ? h.css("width", 100 * a + "%") : h.hasClass("background-vertical") && h.css("height", 100 * a + "%")
                }
                var d = b,
                    g = 0;
                d.addClass("progress-button"), c.progressType = c.progressType || "background-horizontal", c.loadingText = c.loadingText || "Loading..", c.finishedText = c.finishedText || "Done!", d.attr("data-progress-type", c.progressType), d.attr("data-loading-text", c.loadingText), d.attr("data-finished-text", c.finishedText), d.append(angular.element('<span class="tz-bar ' + c.progressType + '">'));
                var h = angular.element(d[0].querySelectorAll(".tz-bar"));
                d.on("progress", function(b) {
                    b = b.originalEvent || b, d.hasClass("in-progress") || (h.css("display", ""), g = 0, d.removeClass("finished").addClass("in-progress")), b.detail.absolute ? g = b.detail.value : g += b.detail.value, g >= 1 && (g = 1), b.detail.finish && (d.removeClass("in-progress").addClass("finished"), setTimeout(function() {
                        e(h, function() {
                            f(d, "progress-finish"), a(0)
                        })
                    }, 500)), a(g)
                }), d.on("progress-finish", function() {
                    setTimeout(function() {
                        h.css("display", "block")
                    }, 500)
                })
            }, e = function(a, b) {
                    a.css("opacity", 1);
                    var c = +new Date,
                        d = function() {
                            a.css("opacity", +a.css("opacity") - (new Date - c) / 400), c = +new Date, +a.css("opacity") > 0 ? window.requestAnimationFrame && requestAnimationFrame(d) || setTimeout(d, 16) : (a.css("display", "none"), a.css("opacity", 1), "function" == typeof b && b())
                        };
                    d()
                }, f = function(a, b, c) {
                    if (window.CustomEvent) var d = new CustomEvent(b, {
                        detail: c
                    });
                    else {
                        var d = document.createEvent("CustomEvent");
                        d.initCustomEvent(b, !0, !0, {
                            detail: c
                        })
                    }
                    a[0].dispatchEvent(d)
                };
            d()
        }
    }
}), angular.module("pomasanaAppApp").directive("numbersOnly", function() {
    return {
        require: "ngModel",
        link: function(a, b, c, d) {
            d.$parsers.push(function(a) {
                if (void 0 == a) return "";
                var b = a.replace(/[^0-9]/g, "");
                return b != a && (d.$setViewValue(b), d.$render()), b
            })
        }
    }
}), angular.module("pomasanaAppApp").controller("MainCtrl", ["$scope", "AuthService", "$location", "$routeParams", "$rootScope", "UserService", "$resource", "ErrorService", "ToastService", "baseUrl", "redirectBaseUrl",
    function(a, b, c, d, e, f, g, h, i, j, k) {
        if (a.loginUrl = j + "/registration?redirect_url=" + k + "personal-page", d.access_token) {
            b.login(d.access_token);
            var l = g(j + "/users/me", {}, {
                getMe: {
                    method: "GET",
                    isArray: !1,
                    headers: {
                        Authorization: d.access_token
                    }
                }
            });
            l.getMe(function(a) {
                e.currentUser = a.data, b.setUser(a.data), i.welcome()
            }), c.url(c.path())
        }
    }
]), angular.module("pomasanaAppApp").controller("AppController", ["$scope", "AuthService", "$location", "$routeParams", "$rootScope", "UserService", "$window",
    function(a, b, c, d, e, f, g) {
        a.tabIsActive = function(a) {
            return a === c.path()
        }, a.isLogged = function() {
            return b.isLogged()
        }, a.logout = function() {
            b.logout(), c.path("/"), g.location.reload()
        }
    }
]), angular.module("pomasanaAppApp").controller("InventoryCtrl", ["$scope", "AuthService", "TaskService", "ErrorService", "ToastService", "PomotasksService", "ModalService",
    function(a, b, c, d, e, f, g) {
        a.projects = {}, a.tasks = {}, a.selectedProject = {}, a.loadProjects = function() {
            c.query(function(b) {
                a.projects = b.data.data, a.selectedProject = a.projects[0], a.loadTasks()
            }, function(a) {
                d.handle(a)
            })
        }, a.loadTasks = function() {
            a.task = {}, c.getTasks({
                id: a.selectedProject.id
            }, function(b) {
                a.tasks = b.data
            }, function(a) {
                d.handle(a)
            })
        }, a.load = function() {
            a.loadProjects()
        }, a.deletePomotaskModal = function(b) {
            g.pomoTaskDelete(b).then(function() {
                a.loadTasks()
            })
        }, a.createPomotaskModal = function(b) {
            g.pomoTaskCreate(b).then(function() {
                a.loadTasks()
            })
        }, a.load()
    }
]), angular.module("pomasanaAppApp").controller("PomotaskCtrl", ["$scope", "$location", "AuthService", "TaskService", "ErrorService", "ToastService", "PomotasksService", "HelperService", "ModalService",
    function(a, b, c, d, e, f, g, h, i) {
        a.pomotasks = {}, a.loadPomotasks = function() {
            "/pomotasks-todo" === b.path() && a.loadTodoPomotasks(), "/pomotasks-done" === b.path() && a.loadDonePomotasks()
        }, a.rate = 1, a.loadTodoPomotasks = function() {
            g.getPomoTasks({
                completed: "false"
            }, function(b) {
                a.pomotasks = b.data
            }, function(a) {
                $window.alert(a.data)
            })
        }, a.loadDonePomotasks = function() {
            g.getPomoTasks({
                completed: "true"
            }, function(b) {
                a.pomotasks = b.data
            }, function(a) {
                $window.alert(a.data)
            })
        }, a.completePomotask = function(b) {
            var c = {
                completed: !0
            };
            g.updatePomoTask({
                id: b.id
            }, c, function() {
                a.loadPomotasks(), f.pomotaskDone()
            }, function(a) {
                e.handle(a)
            })
        }, a.uncompletePomotask = function(b) {
            var c = {
                completed: !1
            };
            g.updatePomoTask({
                id: b.id
            }, c, function() {
                a.loadPomotasks(), f.pomotaskUndone()
            }, function(a) {
                e.handle(a)
            })
        }, a.deletePomotaskModal = function(b) {
            i.pomoTaskDelete(b).then(function() {
                a.loadPomotasks()
            })
        }, a.modifyPomotaskModal = function(b) {
            i.pomoTaskModify(b).then(function() {
                a.loadPomotasks()
            })
        }, a.detailPomotaskModal = function(a) {
            i.pomoTaskDetail(a)
        }, a.addPomodoroModal = function(b) {
            i.pomodoroAdd(b).then(function() {
                a.loadPomotasks()
            })
        }, a.startPomodoroModal = function(b) {
            i.pomodoroStart(b).then(function() {
                a.loadPomotasks()
            })
        }, a.progress = function(a) {
            return h.getProgress(a)
        }, a.usedPom = function(a) {
            return h.getUsedPom(a)
        }, a.estPom = function(a) {
            return h.getEstPom(a)
        }, a.maxProgress = function(a) {
            return h.getMaxProgress(a)
        }, a.loadPomotasks()
    }
]), angular.module("pomasanaAppApp").controller("CreateModalInstanceCtrl", ["$scope", "$modalInstance", "PomotasksService", "$window", "task", "ErrorService", "ToastService",
    function(a, b, c, d, e, f, g) {
        a.task = e, a.data = {
            id: e.id,
            completed: !1,
            estimatedPomodori: 0
        }, a.ok = function(e) {
            e.progressStart(), c.createPomoTask(a.data, function() {
                e.progressFinish(), d.setTimeout(function() {
                    g.pomotaskCreated(), b.close()
                }, 1e3)
            }, function(a) {
                e.progressFinish(), f.handle(a)
            })
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }
]).controller("AddPomodoroModalInstanceCtrl", ["$scope", "$modalInstance", "PomodoroService", "$window", "pomotask", "ErrorService", "ToastService",
    function(a, b, c, d, e, f, g) {
        a.pomotask = e, a.data = {
            pomoTaskId: e.id,
            extInterrupt: 0,
            intInterrupt: 0,
            notes: ""
        }, a.incrementIntInterrupt = function() {
            a.data.intInterrupt++
        }, a.incrementExtInterrupt = function() {
            a.data.extInterrupt++
        }, a.decrementIntInterrupt = function() {
            a.data.intInterrupt++
        }, a.decrementExtInterrupt = function() {
            a.data.extInterrupt++
        }, a.ok = function(e) {
            e.progressStart(), c.createPomodoro(a.data, function() {
                e.progressFinish(), d.setTimeout(function() {
                    g.pomodoroAdded(), b.close()
                }, 1e3)
            }, function(a) {
                e.progressFinish(), f.handle(a)
            })
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }
]).controller("StartPomodoroModalInstanceCtrl", ["$scope", "$modalInstance", "PomodoroService", "$window", "pomotask", "$timeout", "$interval", "ErrorService", "ToastService",
    function(a, b, c, d, e, f, g, h, i) {
        a.pomotask = e, a.finished = !1, a.running = !1, a.secsText = "00", a.minsText = "25";
        var j = 1499;
        a.progress = 0;
        var k, l, m, n = function() {
                l = Math.floor(j / 60), k = j - 60 * l, a.secsText = (10 > k ? "0" : "") + k, a.minsText = (10 > l ? "0" : "") + l, 0 === j ? (g.cancel(m), a.finished = !0, a.running = !1, i.pomodoroFinished()) : (a.progress++, j--)
            };
        a.startTimer = function() {
            a.running = !0, m = g(n, 1e3)
        }, a.resetTimer = function() {
            j = 1499, a.progress = 0, a.finished = !1, a.running = !1, a.minsText = "25", a.secsText = "00", g.cancel(m)
        }, a.data = {
            pomoTaskId: e.id,
            extInterrupt: 0,
            intInterrupt: 0,
            notes: ""
        }, a.incrementIntInterrupt = function() {
            a.data.intInterrupt++
        }, a.incrementExtInterrupt = function() {
            a.data.extInterrupt++
        }, a.decrementIntInterrupt = function() {
            a.data.intInterrupt--
        }, a.decrementExtInterrupt = function() {
            a.data.extInterrupt--
        }, a.ok = function(e) {
            e.progressStart(), c.createPomodoro(a.data, function() {
                e.progressFinish(), d.setTimeout(function() {
                    i.pomodoroAdded(), b.close()
                }, 1e3)
            }, function(a) {
                e.progressFinish(), h.handle(a)
            })
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }
]).controller("DetailModalInstanceCtrl", ["$scope", "$modalInstance", "$window", "pomotask", "PomoTaskPomService", "HelperService", "ErrorService", "ToastService",
    function(a, b, c, d, e, f, g) {
        a.pomodori = {}, a.pomotask = d, e.get({
            id: d.id
        }, {}, function(b) {
            a.pomodori = b.data
        }, function(a) {
            g.handle(a), b.close()
        }), a.estimates = f.getEstimates(d), a.usedPom = function(a) {
            return f.getUsedPom(a)
        }, a.estPom = function(a) {
            return f.getEstPom(a)
        }, a.maxProgress = function(a) {
            return f.getMaxProgress(a)
        }, a.lastEst = function(a) {
            return f.getLastEst(a)
        }, a.ok = function() {
            b.close()
        }
    }
]).controller("ModifyModalInstanceCtrl", ["$scope", "$modalInstance", "$window", "pomotask", "PomotasksService", "ErrorService", "ToastService", "HelperService",
    function(a, b, c, d, e, f, g, h) {
        a.pomotask = d, a.data = {
            estimatedPomodori: h.getLastEst(d),
            name: d.name
        }, a.ok = function(h) {
            h.progressStart(), e.updatePomoTask({
                id: d.id
            }, a.data, function() {
                h.progressFinish(), c.setTimeout(function() {
                    g.pomotaskModified(), b.close()
                }, 1e3)
            }, function(a) {
                h.progressFinish(), f.handle(a)
            })
        }, a.cancel = function() {
            b.dismiss()
        }
    }
]).controller("DeleteModalInstanceCtrl", ["$scope", "$modalInstance", "$window", "pomotask", "PomotasksService", "ErrorService", "ToastService",
    function(a, b, c, d, e, f, g) {
        a.pomotask = d, a.ok = function(a) {
            a.progressStart(), e.remove({
                id: d.id
            }, function() {
                a.progressFinish(), c.setTimeout(function() {
                    g.pomotaskDeleted(), b.close()
                }, 1e3)
            }, function(b) {
                a.progressFinish(), f.handle(b)
            })
        }, a.cancel = function() {
            b.dismiss("cancel")
        }
    }
]), angular.module("pomasanaAppApp").factory("AuthService", ["localStorageService",
    function(a) {
        return {
            getToken: function() {
                return a.get("access_token")
            },
            getUser: function() {
                return a.get("user")
            },
            setUser: function(b) {
                return a.set("user", b)
            },
            login: function(b) {
                return a.set("access_token", b)
            },
            logout: function() {
                a.remove("access_token"), a.remove("user")
            },
            isLogged: function() {
                return a.get("access_token")
            }
        }
    }
]), angular.module("pomasanaAppApp").factory("UserService", ["AuthService", "$resource", "baseUrl",
    function(a, b, c) {
        return b(c + "/users/me", {}, {
            getMe: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            }
        })
    }
]), angular.module("pomasanaAppApp").factory("ErrorService", [
    function() {
        return {
            handle: function(a) {
                return 0 === a.status ? void toastr.error("There was a problem, check the connectivity. ", "Ops!") : 500 === a.status ? void toastr.error("The server has some problem. Check again later.", "Ops!") : 403 === a.status ? void toastr.error("You are not authorized.", "403") : 404 === a.status ? void toastr.error("The resource was not found. ", "404") : 405 === a.status ? void toastr.error("Method Not Allowed ", "405") : void toastr.error("There was a problem. ", "Ops!")
            }
        }
    }
]), angular.module("pomasanaAppApp").factory("ToastService", ["$rootScope",
    function(a) {
        return {
            welcome: function() {
                toastr.info("Welcome " + a.currentUser.name + "!")
            },
            pomotaskCreated: function() {
                toastr.success("The pomotask has been created! ", "OK")
            },
            pomotaskModified: function() {
                toastr.success("The pomotask has been modified! ", "OK")
            },
            pomotaskDeleted: function() {
                toastr.success("The pomotask has been deleted!  ", "OK")
            },
            pomotaskUpdated: function() {
                toastr.success("The pomotask has been modified! ", "OK")
            },
            pomotaskDone: function() {
                toastr.success("The pomotask is done. ", "Good work!")
            },
            pomotaskUndone: function() {
                toastr.success("There pomotask is todo. ", "Need extra work!")
            },
            pomodoroAdded: function() {
                toastr.success("The pomodoro has been added. ", "OK")
            },
            pomodoroFinished: function() {
                toastr.success("The pomodoro finished, now rest for five minutes!", "Good job!")
            }
        }
    }
]), angular.module("pomasanaAppApp").factory("TaskService", ["AuthService", "$resource", "baseUrl",
    function(a, b, c) {
        return b(c + "/asana/projects/:id", {
            id: "@id"
        }, {
            query: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            getTasks: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            }
        })
    }
]), angular.module("pomasanaAppApp").factory("ModalService", ["$modal", "$window",
    function(a) {
        return {
            pomoTaskCreate: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomotask-create.html",
                    controller: "CreateModalInstanceCtrl",
                    resolve: {
                        task: function() {
                            return b
                        }
                    }
                }).result
            },
            pomoTaskModify: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomotask-modify.html",
                    controller: "ModifyModalInstanceCtrl",
                    resolve: {
                        pomotask: function() {
                            return b
                        }
                    }
                }).result
            },
            pomoTaskDetail: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomotask-detail.html",
                    controller: "DetailModalInstanceCtrl",
                    resolve: {
                        pomotask: function() {
                            return b
                        }
                    }
                }).result
            },
            pomoTaskDelete: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomotask-delete.html",
                    controller: "DeleteModalInstanceCtrl",
                    resolve: {
                        pomotask: function() {
                            return b
                        }
                    }
                }).result
            },
            pomodoroAdd: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomodoro-add.html",
                    controller: "AddPomodoroModalInstanceCtrl",
                    resolve: {
                        pomotask: function() {
                            return b
                        }
                    }
                }).result
            },
            pomodoroStart: function(b) {
                return a.open({
                    templateUrl: "views/modals/pomodoro-start.html",
                    controller: "StartPomodoroModalInstanceCtrl",
                    resolve: {
                        pomotask: function() {
                            return b
                        }
                    },
                    backdrop: "static",
                    keyboard: !1
                }).result
            }
        }
    }
]), angular.module("pomasanaAppApp").factory("PomoTaskPomService", ["AuthService", "$resource", "baseUrl", "$window",
    function(a, b, c) {
        var d = b(c + "/pomotasks/:id/pomodori", {
            pomotaskId: "@id"
        }, {
            get: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            }
        });
        return d
    }
]), angular.module("pomasanaAppApp").factory("PomotasksService", ["AuthService", "$resource", "baseUrl", "$window",
    function(a, b, c) {
        var d = b(c + "/pomotasks/:id", {
            pomotaskId: "@id"
        }, {
            get: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            remove: {
                method: "DELETE",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            getPomoTasks: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            updatePomoTask: {
                method: "PUT",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            createPomoTask: {
                method: "POST",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            }
        });
        return d
    }
]), angular.module("pomasanaAppApp").factory("PomodoroService", ["AuthService", "$resource", "baseUrl", "$window",
    function(a, b, c) {
        var d = b(c + "/pomodori/:id", {
            pomotaskId: "@id"
        }, {
            get: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            remove: {
                method: "DELETE",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            getPomodori: {
                method: "GET",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            updatePomodoro: {
                method: "PUT",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            },
            createPomodoro: {
                method: "POST",
                isArray: !1,
                headers: {
                    Authorization: a.getToken()
                }
            }
        });
        return d
    }
]), angular.module("pomasanaAppApp").factory("HelperService", [
    function() {
        return {
            getUsedPom: function(a) {
                return a.usedPomodori.length
            },
            getEstPom: function(a) {
                var b = JSON.parse("[" + a.estimatedPomodori + "]");
                return b[0][b[0].length - 1]
            },
            getEstimates: function(a) {
                var b = JSON.parse("[" + a.estimatedPomodori + "]");
                return b[0]
            },
            getProgress: function(a) {
                var b = JSON.parse("[" + a.estimatedPomodori + "]"),
                    c = b[0][b[0].length - 1],
                    d = a.usedPomodori.length;
                return 0 === d ? 0 : d / c * 100
            },
            getMaxProgress: function(a) {
                var b = JSON.parse("[" + a.estimatedPomodori + "]"),
                    c = b[0][b[0].length - 1],
                    d = Math.max(c, a.usedPomodori.length);
                return d
            },
            getLastEst: function(a) {
                return a.estimatedPomodori[1]
            }
        }
    }
]);