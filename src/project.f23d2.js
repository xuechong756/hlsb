window.__require = function e(t, n, o) {
    function a(c, s) {
        if (!n[c]) {
            if (!t[c]) {
                var r = c.split("/");
                if (r = r[r.length - 1],
                !t[r]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l)
                        return l(r, !0);
                    if (i)
                        return i(r, !0);
                    throw new Error("Cannot find module '" + c + "'")
                }
            }
            var d = n[c] = {
                exports: {}
            };
            t[c][0].call(d.exports, function(e) {
                return a(t[c][1][e] || e)
            }, d, d.exports, e, t, n, o)
        }
        return n[c].exports
    }
    for (var i = "function" == typeof __require && __require, c = 0; c < o.length; c++)
        a(o[c]);
    return a
}({
    AudioManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f405fvQBT9Ndo2BzZhBBvAZ", "AudioManager");
        var o = e("GameDataManager");
        t.exports = {
            bgm: null,
            audioResArray: [],
            preloadAudio: function(e) {
                var t = this;
                cc.loader.loadResDir(e, cc.AudioClip, function(e, n) {
                    e ? console.error("\u8d44\u6e90\u52a0\u8f7d\u9519\u8bef") : t.audioResArray = n
                }),
                cc.audioEngine.setMusicVolume(.3)
            },
            getAudioClipByName: function(e) {
                for (var t = 0; t < this.audioResArray.length; t++)
                    if (this.audioResArray[t]._name == e)
                        return this.audioResArray[t];
                return null
            },
            playEffect: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                if (o.sound) {
                    var n = this.getAudioClipByName(e);
                    cc.audioEngine.playEffect(n, t)
                }
            },
            stopAllEffect: function() {
                cc.audioEngine.stopAllEffects()
            },
            playButtonClickEffect: function() {
                this.playEffect("click")
            },
            stopAllAudios: function() {
                cc.audioEngine.stopAll()
            },
            pauseAllAudios: function() {
                cc.audioEngine.pauseAll()
            },
            resumeAllAudio: function() {
                cc.audioEngine.resumeAll()
            },
            playBGM: function(e) {
                var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                if ((this.bgm != e || !cc.audioEngine.isMusicPlaying()) && (this.bgm = e,
                o.music)) {
                    this.stopBGM();
                    var n = this.getAudioClipByName(e);
                    cc.audioEngine.playMusic(n, t)
                }
            },
            pauseBGM: function() {
                this.stopBGM()
            },
            resumeBGM: function() {
                this.bgm && this.playBGM(this.bgm)
            },
            stopBGM: function() {
                cc.audioEngine.stopMusic()
            }
        },
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager"
    }],
    GameDataManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b4424UsqV1KQ7YLzxjQWQ4K", "GameDataManager");
        var o = {
            GAMEMODE: cc.Enum({
                CLASSIC: 0,
                PUZZLE: 1
            }),
            bSound: !0,
            bMusic: !0,
            init: function() {
                this.nCoins = cc.sys.localStorage.getItem("coins"),
                this.bSound = cc.sys.localStorage.getItem("sound"),
                this.bMusic = cc.sys.localStorage.getItem("music"),
                this.nCoins = this.nCoins || "0" == this.nCoins ? this.nCoins : 10,
                this.bSound = "0" != this.bSound ? "1" : "0",
                this.bMusic = this.bMusic ? this.bMusic : "true"
            },
            set sound(e) {
                this.bSound = e ? 1 : 0,
                cc.sys.localStorage.setItem("sound", this.bSound)
            },
            get sound() {
                return 1 == this.bSound
            },
            set music(e) {
                this.bMusic = e + "",
                cc.sys.localStorage.setItem("music", this.bMusic)
            },
            get music() {
                return "true" == this.bMusic
            },
            set coins(e) {
                this.nCoins = e,
                cc.sys.localStorage.setItem("coins", this.nCoins)
            },
            get coins() {
                return this.nCoins
            },
            updateInviteData: function(e) {
                cc.sys.localStorage.setItem("invitedata", e)
            },
            getInviteData: function() {
                return cc.sys.localStorage.getItem("invitedata")
            },
            setRewardInvited: function(e) {
                var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
                cc.sys.localStorage.setItem("invited" + e, t)
            },
            isRewardInvited: function(e) {
                return 1 == cc.sys.localStorage.getItem("invited" + e)
            },
            onRewardAdClose: function() {
                this.CClass()
            },
            onRewardAdStop: function() {
                this.CStopClass()
            },
            setRewardCloseClass: function(e) {
                this.CClass = e
            },
            setRewardStopClass: function(e) {
                this.CStopClass = e
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    Game: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "56f26hKLaZEBYBnM2EmWcqO", "Game");
        var o = e("AudioManager")
          , a = e("GameDataManager")
          , i = e("LocalStorageData")
          , c = e("WorldController");
        cc.Class({
            extends: cc.Component,
            properties: {
                maskLayer: cc.Node,
                shopLayer: cc.Node,
                goldLabel: cc.Label,
                shopGoldLabel: cc.Label,
                levelNum: cc.Label,
                levelSelect: cc.Node,
                shopBtn: cc.Node,
                levelData: cc.JsonAsset
            },
            onLoad: function() {
				this.autoAdapteScreen();
                c.setLevelData(this.levelData.json);
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onRewardAdClose: function() {
                var e = cc.find("Canvas").getComponent("Game")
                  , t = i.get("gold");
                i.set("gold", t + 50),
                e.goldLabel.string = i.get("gold"),
                e.shopGoldLabel.string = i.get("gold")
            },
            onRewardAdStop: function() {
                wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                })
            },
            start: function() {
                if (cc.director.preloadScene("GameScene"),
                isNaN(i.get("gold")) ? (this.goldLabel.string = 0,
                i.set("gold", 0)) : this.goldLabel.string = i.get("gold"),
                isNaN(i.get("gold")) ? (this.shopGoldLabel.string = 0,
                i.set("gold", 0)) : this.shopGoldLabel.string = i.get("gold"),
                isNaN(i.get("levelNum")))
                    this.levelNum.string = "\u7b2c1\u5173",
                    i.set("levelNum", 0);
                else {
                    var e = i.get("levelNum") + 1;
                    this.levelNum.string = "\u7b2c" + e + "\u5173"
                }
                console.log("date", this.changeToDate(Date.now()) > i.get("checkInDate")),
                isNaN(i.get("checkInDate")) ? cc.find("Canvas/checkIn").active = !0 : this.changeToDate(Date.now()) > i.get("checkInDate") && (cc.find("Canvas/checkIn").active = !0)
            },
            changeToDate: function(e) {
                return Math.floor(e / 864e5)
            },
            showGameBox: function(e) {},
            setBlockInputEvents: function(e) {
                this.maskLayer.active = e
            },
            inviteClicked: function(e) {
                this.inviteDialog.active = !0,
                this.setBlockInputEvents(!0),
                o.playButtonClickEffect()
            },
            closeClicked: function(e) {
                e.currentTarget.parent.active = !1,
                this.setBlockInputEvents(!1)
            },
            cleanInviteData: function() {},
            startBtn: function() {
                if (!this.click) {
                    if (this.click = !0,
                    c.getcurrentLevel(),
                    c.currentLevel >= c.levelNum)
                        return wx.showToast({
                            title: "\u656c\u8bf7\u671f\u5f85\u540e\u7eed\u5173\u5361\uff01",
                            icon: "none",
                            duration: 2e3
                        });
                    this.click = !1,
                    this.startGame()
                }
            },
            startGame: function() {
                this.click = !1,
                cc.director.loadScene("GameScene")
            },
            goldAddBtn: function() {
                this.rewardType = 0;
                var e = this;
                wx.showModal({
                    title: "\u63d0\u793a",
                    content: "\u662f\u5426\u89c2\u770b\u89c6\u9891\u83b7\u53d6\u91d1\u5e01\uff1f",
                    success: function(t) {
                        t.confirm ? (console.log("\u7528\u6237\u70b9\u51fb\u786e\u5b9a"),
                        a.setRewardCloseClass(e.onRewardAdClose),
                        a.setRewardStopClass(e.onRewardAdStop)) : t.cancel && console.log("\u7528\u6237\u70b9\u51fb\u53d6\u6d88")
                    }
                })
            },
            openRank: function() {},
            closeRank: function() {},
            openShop: function() {
                this.shopLayer.active = !0
            },
            closeShop: function() {
                this.shopLayer.active = !1
            },
            selectBtn: function() {
                this.levelSelect.active = !0
            },
            shareBtn: function() {},
            shareEvent: function() {},
            updateShopGold: function() {
                isNaN(i.get("gold")) ? (this.shopGoldLabel.string = 0,
                this.goldLabel.string = i.get("gold"),
                i.set("gold", 0)) : (this.shopGoldLabel.string = i.get("gold"),
                this.goldLabel.string = i.get("gold"))
            },
            changeTime: function(e) {
                var t, n = Math.floor(e / 60);
                t = n < 10 ? "0" + n : n;
                var o = e % 60;
                return o < 10 ? t + ":0" + o : t + ":" + o
            },
            update: function() {}
        }),
        cc._RF.pop()
    }
    , {
        AudioManager: "AudioManager",
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    LanguageData: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var o = e("polyglot.min")
          , a = null;
        function i(e) {
            return window.i18n.languages[e]
        }
        function c(e) {
            e && (a ? a.replace(e) : a = new o({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
        t.exports = {
            init: function(e) {
                if (e !== window.i18n.curLang) {
                    var t = i(e) || {};
                    window.i18n.curLang = e,
                    c(t),
                    this.inst = a
                }
            },
            t: function(e, t) {
                if (a)
                    return a.t(e, t)
            },
            inst: a,
            updateSceneRenderers: function() {
                for (var e = cc.director.getScene().children, t = [], n = 0; n < e.length; ++n) {
                    var o = e[n].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, o)
                }
                for (var a = 0; a < t.length; ++a) {
                    var i = t[a];
                    i.node.active && i.updateLabel()
                }
                for (var c = [], s = 0; s < e.length; ++s) {
                    var r = e[s].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(c, r)
                }
                for (var l = 0; l < c.length; ++l) {
                    var d = c[l];
                    d.node.active && d.updateSprite(window.i18n.curLang)
                }
            }
        },
        cc._RF.pop()
    }
    , {
        "polyglot.min": "polyglot.min"
    }],
    LocalStorageData: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1eb23KHKLZBLowNlhYy/o2c", "LocalStorageData"),
        t.exports = {
            initItem: function(e) {
                var t;
                wx.getStorage({
                    key: e.str,
                    success: function(n) {
                        console.log(n.data),
                        null != (t = parseInt(n.data)) && 0 != t.length && !isNaN(t) || wx.setStorage({
                            key: e.str,
                            data: JSON.stringify(e.number)
                        })
                    },
                    fail: function(t) {
                        console.log(t),
                        wx.setStorage({
                            key: e.str,
                            data: JSON.stringify(e.number),
                            success: function() {}
                        })
                    }
                })
            },
            initData: function() {
                console.log("\u521d\u59cb\u5316\u7528\u6237\u672c\u5730\u6570\u636e"),
                this.initItem({
                    str: "level0",
                    number: 0
                }),
                this.initItem({
                    str: "starSum",
                    number: 0
                }),
                this.initItem({
                    str: "first",
                    number: 0
                }),
                this.initItem({
                    str: "gold",
                    number: 0
                }),
                this.initItem({
                    str: "count",
                    number: 0
                }),
                this.initItem({
                    str: "checkinDate",
                    number: 0
                }),
                this.initItem({
                    str: "ADDate",
                    number: 0
                }),
                this.initItem({
                    str: "water0",
                    number: 1
                }),
                this.initItem({
                    str: "glass0",
                    number: 1
                }),
                this.initItem({
                    str: "pen0",
                    number: 1
                }),
                this.initItem({
                    str: "selectWater",
                    number: 0
                }),
                this.initItem({
                    str: "selectGlass",
                    number: 0
                }),
                this.initItem({
                    str: "selectPen",
                    number: 0
                }),
                this.initItem({
                    str: "finish",
                    number: 0
                }),
                this.initItem({
                    str: "firstWeek",
                    number: 0
                }),
                this.initItem({
                    str: "levelNum",
                    number: 0
                }),
                this.initItem({
                    str: "lastTime",
                    number: Date.now()
                })
            },
            get: function(e) {
                var t = cc.sys.localStorage.getItem(e);
                return parseInt(t)
            },
            set: function(e, t) {
                cc.sys.localStorage.setItem(e, t)
            },
            updateStars: function(e) {
                var t = this.get("starSum");
                isNaN(t) && isNaN(e) || (this.set("starSum", e + t),
                console.log("update starSum"))
            },
            updateGold: function(e) {
                var t = this.get("gold");
                isNaN(t) || isNaN(e) || (this.set("gold", e + t),
                console.log("update gold" + e))
            },
            updateCount: function() {
                var e = this.get("count");
                console.log(e),
                this.set("count", e + 1)
            },
            timer: -1,
            updateLevelStar: function(e, t, n) {
                if (cc.sys.localStorage.getItem(e) >= t)
                    return n.active = !1,
                    0;
                if (isNaN(cc.sys.localStorage.getItem(e)))
                    return this.updateStars(t),
                    n.active = !0,
                    n.children[0].getComponent(cc.Label).string = "+" + 10 * t,
                    this.updateGold(10 * t),
                    cc.sys.localStorage.setItem(e, t),
                    10 * t;
                this.updateStars(t - cc.sys.localStorage.getItem(e)),
                n.active = !0,
                n.children[0].getComponent(cc.Label).string = "+" + 10 * (t - cc.sys.localStorage.getItem(e)),
                this.updateGold(10 * (t - cc.sys.localStorage.getItem(e)));
                var o = cc.sys.localStorage.getItem(e);
                return cc.sys.localStorage.setItem(e, t),
                10 * (t - o)
            }
        },
        cc._RF.pop()
    }
    , {}],
    LocalizedLabel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var o = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(e) {
                        this._dataID !== e && (this._dataID = e,
                        this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                o.inst || o.init(),
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Label);
                if (e)
                    return this.label = e,
                    void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? o.t(this.dataID) && (this.label.string = o.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var o = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: o
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Sprite);
                if (e)
                    return this.sprite = e,
                    void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e)
                        return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function(e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame),
                    this.sprite.spriteFrame = t
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    PhysicsManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c97c8znFQVJ94bFCs40pdXU", "PhysicsManager"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    SpriteFrameSet: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var o = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    WorldController: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "54be8n2PKVD7LlNM3o5A7zf", "WorldController");
        var o = e("LocalStorageData");
        t.exports = {
            totalLength: 1500,
            waterIsSpawn: !1,
            share: !1,
            winWaterNum: 24,
            win: !1,
            levelNum: 0,
            levelData: [],
            changeLevel: !1,
            currentLevel: 0,
            begin: !1,
            frames: 0,
            repeat: !1,
            tryItem: !1,
            playNum: 0,
            tryNum: 0,
            tryWater: !1,
            tryWaterNum: 0,
            completeCount: 0,
            shareError: ["\u5206\u4eab\u5931\u8d25\uff0c\u8bf7\u5206\u4eab\u5230\u4e0d\u540c\u7fa4\uff01", "\u5206\u4eab\u5931\u8d25\uff0c\u8bf7\u6362\u4e2a\u7fa4\u5206\u4eab\u8bd5\u8bd5\uff01", "\u5206\u4eab\u5931\u8d25\uff0c\u8bf7\u4e0d\u8981\u5206\u4eab\u5230\u540c\u4e00\u4e2a\u7fa4\uff01"],
            setLevelData: function(e) {
                this.levelData = e,
                this.levelNum = e.length
            },
            getLevelData: function(e, t) {
                e(this.currentLevel, t)
            },
            getcurrentLevel: function() {
                isNaN(o.get("levelNum")) || void 0 === o.get("levelNum") ? (o.set("levelNum", 0),
                this.currentLevel = 0) : this.currentLevel = o.get("levelNum")
            }
        },
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData"
    }],
    checkIn: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f9003zme7JLIrrafGPa8x6H", "checkIn");
        var o = e("LocalStorageData")
          , a = e("GameDataManager");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.changeToDate(Date.now()) % 2 == 1 ? (cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u4f53\u529b\u62f7\u8d1d7@2x").active = !0,
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u91d1\u5e01@2x").active = !1) : (cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u4f53\u529b\u62f7\u8d1d7@2x").active = !1,
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u91d1\u5e01@2x").active = !0)
            },
            onRewardAdClose: function() {
                var e = cc.find("Canvas/checkIn").getComponent("checkIn");
                switch (e.rewardType) {
                case 1:
                    o.updateGold(150),
                    wx.showToast({
                        title: "\u6210\u529f\u9886\u53d6150\u91d1\u5e01",
                        icon: "none",
                        duration: 2e3
                    }),
                    cc.find("Canvas/ui/gold/goldNum").getComponent(cc.Label).string = o.get("gold"),
                    e.close();
                    break;
                case 2:
                    o.updateGold(300),
                    wx.showToast({
                        title: "\u6210\u529f\u9886\u53d6300\u91d1\u5e01",
                        icon: "none",
                        duration: 2e3
                    }),
                    cc.find("Canvas/ui/gold/goldNum").getComponent(cc.Label).string = o.get("gold"),
                    e.close()
                }
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u89c6\u9891\u53cc\u500d\u9886\u53d6@2x").getComponent(cc.Button).interactable = !1,
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u9886\u53d6@2x").getComponent(cc.Button).interactable = !1,
                o.set("checkInDate", e.changeToDate(Date.now()))
            },
            changeToDate: function(e) {
                return Math.floor(e / 864e5)
            },
            onRewardAdStop: function() {
                cc.find("Canvas/checkIn").getComponent("checkIn"),
                wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                })
            },
            checkIn: function() {
                this.rewardType = 1,
                this.onRewardAdClose()
            },
            doubleCheckIn: function() {
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x/\u4f53\u529b\u62f7\u8d1d7@2x").active ? this.rewardType = 4 : this.rewardType = 2,
                this.rewardType,
                a.setRewardCloseClass(this.onRewardAdClose),
                a.setRewardStopClass(this.onRewardAdStop)
            },
            close: function() {
                cc.find("Canvas/checkIn/\u77e9\u5f623@2x").runAction(cc.sequence(cc.scaleTo(.5, 0), cc.callFunc(function() {
                    this.node.active = !1
                }, this)))
            }
        }),
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData"
    }],
    complete: [function(t, n, o) {
        "use strict";
        cc._RF.push(n, "50c5bTL3dFAC5lYQsc+10o2", "complete");
        var a = t("WorldController")
          , i = t("LocalStorageData")
          , c = t("GameDataManager");
        cc.Class({
            extends: cc.Component,
            properties: {
                star1: cc.Node,
                star2: cc.Node,
                starsNode: cc.Node,
                starSprite: cc.SpriteFrame,
                goldShow: cc.Node,
                shareButton: cc.Node,
                rewardIcon: cc.SpriteFrame
            },
            onLoad: function() {
                this.goldReward = 0
            },
            onEnable: function() {
                a.playNum++,
                a.repeat = !1
            },
            init: function() {
                var e = i.get("levelNum");
                a.currentLevel == e && i.set("levelNum", e + 1),
                a.currentLevel < 5 ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0,
                cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : a.currentLevel % 2 == 1 ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !0,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !1,
                cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0,
                cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !0,
                cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !1);
                var t = cc.find("Canvas/UILayer/pen/lineLength").width
                  , n = this
                  , o = cc.callFunc(this.shake, this);
                t > this.star2.x + 120 ? (n.starsNode.children[1].children[1].active = !1,
                n.starsNode.children[2].children[1].active = !1,
                setTimeout(function() {
                    n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o)),
                    setTimeout(function() {
                        n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem(),
                        n.starsNode.children[1].children[1].active = !0,
                        n.starsNode.children[1].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o))
                    }, 300),
                    setTimeout(function() {
                        n.starsNode.children[1].children[0].getComponent(cc.ParticleSystem).resetSystem(),
                        n.starsNode.children[2].children[1].active = !0,
                        n.starsNode.children[2].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o))
                    }, 600),
                    setTimeout(function() {
                        n.starsNode.children[2].children[0].getComponent(cc.ParticleSystem).resetSystem()
                    }, 900)
                }, 500),
                this.goldReward = i.updateLevelStar("level" + a.currentLevel, 3, this.goldShow)) : t > this.star1.x + 120 ? (this.starsNode.children[2].children[1].active = !1,
                this.starsNode.children[2].children[0].active = !1,
                n.starsNode.children[1].children[1].active = !1,
                setTimeout(function() {
                    n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o)),
                    setTimeout(function() {
                        n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem(),
                        n.starsNode.children[1].children[1].active = !0,
                        n.starsNode.children[1].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o))
                    }, 300),
                    setTimeout(function() {
                        n.starsNode.children[1].children[0].getComponent(cc.ParticleSystem).resetSystem()
                    }, 600)
                }, 500),
                this.goldReward = i.updateLevelStar("level" + a.currentLevel, 2, this.goldShow)) : (this.starsNode.children[1].children[1].active = !1,
                this.starsNode.children[2].children[1].active = !1,
                this.starsNode.children[1].children[0].active = !1,
                this.starsNode.children[2].children[0].active = !1,
                setTimeout(function() {
                    n.starsNode.children[0].children[1].runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeCubicActionIn()), o)),
                    setTimeout(function() {
                        n.starsNode.children[0].children[0].getComponent(cc.ParticleSystem).resetSystem()
                    }, 300)
                }, 500),
                this.goldReward = i.updateLevelStar("level" + a.currentLevel, 1, this.goldShow))
            },
            shake: function() {
                var e = cc.find("Canvas/complete/completeNode");
                this.schedule(function() {
                    e.position = cc.v2(0, 0),
                    e.position = cc.v2(5 * (Math.random(0, 1) - .5), 5 * (Math.random(0, 1) - .5))
                }, .05, 4)
            },
            onRewardAdClose: function() {
                var e = cc.find("Canvas/complete").getComponent("complete");
                switch (e.rewardType) {
                case 2:
                    i.updateGold(30),
                    wx.showToast({
                        title: "\u6210\u529f\u9886\u53d630\u91d1\u5e01",
                        icon: "none",
                        duration: 2e3
                    }),
                    cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active ? (cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1,
                    cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0) : (cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !0,
                    cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !1),
                    a.currentLevel < 5 && (cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active = !1,
                    cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").active = !0,
                    cc.find("Canvas/complete/completeNode/btnNode/shareBtn").active = !1,
                    cc.find("Canvas/complete/completeNode/btnNode/vedioBtn").active = !0);
                    break;
                case 3:
                    i.updateGold(2 * e.goldReward),
                    wx.showToast({
                        title: "\u6210\u529f\u9886\u53d63\u500d\u5956\u52b1",
                        icon: "none",
                        duration: 2e3
                    }),
                    cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").active ? cc.find("Canvas/complete/completeNode/btnNode/shareBtn2").getComponent(cc.Button).interactable = !1 : cc.find("Canvas/complete/completeNode/btnNode/vedioBtn2").getComponent(cc.Button).interactable = !1
                }
            },
            onRewardAdStop: function() {
                switch (cc.find("Canvas/complete").getComponent("complete").vedio) {
                case 1:
                    wx.showToast({
                        title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                        icon: "none",
                        duration: 2500
                    });
                    break;
                case 2:
                    a.currentLevel < 5 ? wx.showToast({
                        title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                        icon: "none",
                        duration: 2500
                    }) : wx.showToast({
                        title: a.shareError[Math.floor(3 * Math.random(0, .99))],
                        icon: "none",
                        duration: 2500
                    })
                }
            },
            nextLevelBtn: function() {
                if (a.waterIsSpawn = !1,
                a.win = !1,
                a.currentLevel + 1 >= a.levelNum)
                    return wx.showToast({
                        title: "\u656c\u8bf7\u671f\u5f85\u540e\u7eed\u5173\u5361\uff01",
                        icon: "none",
                        duration: 2e3
                    }),
                    void (this.click = !1);
                this.nextLevel()
            },
            nextLevel: function(e) {
                a.currentLevel++,
                cc.director.loadScene("GameScene")
            },
            shareBtn: function() {
                this.rewardType = 2,
                this.vedio = 2,
                c.setRewardCloseClass(this.onRewardAdClose),
                c.setRewardStopClass(this.onRewardAdStop),
                a.share = !0
            },
            vedioBtn: function() {
                this.rewardType = 2,
                this.vedio = 1,
                c.setRewardCloseClass(this.onRewardAdClose),
                c.setRewardStopClass(this.onRewardAdStop)
            },
            shareBtn2: function() {
                this.rewardType = 3,
                this.vedio = 2,
                c.setRewardCloseClass(this.onRewardAdClose),
                c.setRewardStopClass(this.onRewardAdStop),
                a.share = !0
            },
            vedioBtn2: function() {
                this.rewardType = 3,
                this.vedio = 1,
                c.setRewardCloseClass(this.onRewardAdClose),
                c.setRewardStopClass(this.onRewardAdStop)
            },
            restartBtn: function() {
                a.waterIsSpawn = !1,
                a.win = !1,
                this.restart(e)
            },
            restart: function(e) {
                cc.director.loadScene("GameScene")
            },
            backBtn: function() {
                a.waterIsSpawn = !1,
                a.win = !1,
                cc.director.loadScene("MenuScene")
            },
            changeTime: function(e) {
                var t = ""
                  , n = Math.floor(e / 60);
                t = n < 10 ? "0" + n : n;
                var o = e % 60;
                return o < 10 ? t + ":0" + o : t + ":" + o
            },
            update: function() {}
        }),
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    drawlinesTest: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d0346H8MOxFKJbgZPyM6mOY", "drawlinesTest"),
        e("PhysicsManager");
        var o = e("WorldController")
          , a = 0
          , i = !1
          , c = cc.v2(0, 0)
          , s = cc.v2(0, 0)
          , r = 0
          , l = cc.v2(0, 0)
          , d = cc.v2(0, 0)
          , h = !1
          , p = []
          , u = o.totalLength;
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                cc.PhysicsAABBQueryCallback.prototype.ReportFixture = function(e) {
                    if (e.GetBody(),
                    this._isPoint) {
                        if (e.TestPoint(this._point))
                            return this._fixtures.push(e),
                            !1
                    } else
                        this._fixtures.push(e);
                    return !0
                }
                ;
                var e = cc.director.getPhysicsManager();
                e.enabled = !0;
                var t = this;
                new cc.Node("err" + r),
                this.node.on(cc.Node.EventType.TOUCH_START, function(n) {
                    if (u > 0)
                        if (i || 0 != r) {
                            s = n.getLocation(),
                            c = this.convertToNodeSpaceAR(s);
                            var g = t.testrect(s.x, s.y);
                            if (t.wideRaycast(d.x, d.y, s.x, s.y),
                            g && !h) {
                                var m = Math.sqrt(Math.pow(c.x - l.x, 2) + Math.pow(c.y - l.y, 2))
                                  , v = this.getChildByName("line" + r);
                                v.getComponent(cc.Graphics).lineTo(c.x, c.y),
                                v.getComponent(cc.Graphics).stroke(),
                                v.getComponent(cc.Graphics).moveTo(c.x, c.y);
                                for (var f = 0; f < m / 10; f++) {
                                    var C = v.addComponent(cc.PhysicsCircleCollider);
                                    C.offset = cc.v2(l.x + 10 * f * (c.x - l.x) / m, l.y + 10 * f * (c.y - l.y) / m),
                                    C.radius = 4.5,
                                    C.density = 1,
                                    C.apply()
                                }
                                l = c,
                                d = s,
                                a += m,
                                u -= m,
                                cc.find("Canvas/lineLength").width = u / o.totalLength * 240
                            }
                            p.push(c)
                        } else {
                            if (i = !0,
                            n.getID(),
                            s = n.getLocation(),
                            c = this.convertToNodeSpaceAR(s),
                            l = c,
                            d = s,
                            0 != e.testAABB(cc.rect(c.x, c.y, 4.5, 4.5)).length)
                                return void (i = !1);
                            h = !1,
                            r++;
                            var y = new cc.Node("line" + r)
                              , w = y.addComponent(cc.Graphics)
                              , S = y.addComponent(cc.RigidBody);
                            this.addChild(y),
                            S.gravityScale = 0,
                            S.type = cc.RigidBodyType.Static,
                            w.lineCap = cc.Graphics.LineCap.ROUND,
                            w.lineWidth = 9,
                            w.moveTo(c.x, c.y),
                            p.push(c)
                        }
                }, this.node)
            },
            clearLines: function() {
                p = [],
                this.node.getChildByName("line1") && this.node.getChildByName("line1").destroy(),
                cc.find("Canvas/lineLength").width = 240,
                u = o.totalLength,
                a = 0,
                r = 0,
                i = !1,
                this.getWaterNode() && this.getWaterNode().removeAllChildren()
            },
            getWaterNode: function() {
                return cc.find("Canvas/level/out/waterNode") ? cc.find("Canvas/level/out/waterNode") : cc.find("Canvas/level/outTop/waterNode") ? cc.find("Canvas/level/outTop/waterNode") : cc.find("Canvas/level/outRight/waterNode") ? cc.find("Canvas/level/outRight/waterNode") : void 0
            },
            getLinesData: function() {
                return p
            },
            startTest: function() {
                if (console.log("water!!!!!!!!!!!!"),
                u > 0 && a > 0) {
                    var e = this.node.getChildByName("line1");
                    e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                    e.getComponent(cc.RigidBody).gravityScale = 3.5,
                    e.group = "line",
                    this.getWaterNode().getComponent("water").spawnWater()
                }
            },
            testrect: function(e, t) {
                var n = cc.director.getPhysicsManager()
                  , o = n.testPoint(cc.v2(e - 4.5, t - 4.5));
                if (null == o || o.node.name == "line" + r) {
                    var a = n.testPoint(cc.v2(e - 4.5, t + 4.5));
                    if (null == a || a.node.name == "line" + r) {
                        var i = n.testPoint(cc.v2(e + 4.5, t - 4.5));
                        if (null == i || i.node.name == "line" + r) {
                            var c = n.testPoint(cc.v2(e + 4.5, t + 4.5));
                            if (null == c || c.node.name == "line" + r) {
                                var s = n.testPoint(cc.v2(e, t));
                                if (null == s || s.node.name == "line" + r)
                                    return !0
                            }
                        }
                    }
                }
                return !1
            },
            wideRaycast: function(e, t, n, o) {
                var a = cc.director.getPhysicsManager()
                  , i = Math.sqrt(Math.pow(n - e, 2) + Math.pow(o - t, 2))
                  , c = 4.5 * -(o - t) / i
                  , s = 4.5 * (n - e) / i
                  , l = a.rayCast(cc.v2(e - c, t - s), cc.v2(n - c, o - s), cc.RayCastType.Any);
                if (l.length > 0)
                    for (var d = 0; d < l.length; d++) {
                        if (l[d].collider.node.name != "line" + r) {
                            h = !0;
                            break
                        }
                        h = !1
                    }
                var p = a.rayCast(cc.v2(e + c, t + s), cc.v2(n + c, o + s), cc.RayCastType.Any);
                if (p.length > 0)
                    for (d = 0; d < p.length; d++) {
                        if (p[d].collider.node.name != "line" + r) {
                            h = !0;
                            break
                        }
                        h = !1
                    }
            }
        }),
        cc._RF.pop()
    }
    , {
        PhysicsManager: "PhysicsManager",
        WorldController: "WorldController"
    }],
    drawlines: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1bc4azz119F74JxYOEfDU3N", "drawlines"),
        e("PhysicsManager");
        var o = e("WorldController")
          , a = e("userType")
          , i = e("LocalStorageData")
          , c = 0
          , s = 0
          , r = !1
          , l = cc.v2(0, 0)
          , d = cc.v2(0, 0)
          , h = !1
          , p = 0
          , u = 0
          , g = cc.v2(0, 0)
          , m = cc.v2(0, 0)
          , v = !1
          , f = ["moveBox1", "moveBox2", "moveBox3", "moveBox4", "moveBox5", "glass"];
        cc.Class({
            extends: cc.Component,
            properties: {
                percentShow: cc.Label,
                penSprite: {
                    default: [],
                    type: cc.SpriteFrame
                },
                penNode: cc.Node
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onLoad: function() {
				this.autoAdapteScreen();
				
                cc.PhysicsAABBQueryCallback.prototype.ReportFixture = function(e) {
                    if (e.GetBody(),
                    this._isPoint) {
                        if (e.TestPoint(this._point))
                            return this._fixtures.push(e),
                            !1
                    } else
                        this._fixtures.push(e);
                    return !0
                }
                ;
                var e = cc.director.getPhysicsManager();
                e.enabled = !0,
                p = 0,
                c = 0,
                s = o.totalLength;
                var t = this
                  , n = new cc.Node("err" + p);
                this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
                    if (s && !r) {
                        if (r = !0,
                        u = t.getID(),
                        0 == o.currentLevel && (cc.find("Canvas/UILayer/hand").stopAllActions(),
                        cc.find("Canvas/UILayer/hand").active = !1),
                        d = t.getLocation(),
                        l = this.convertToNodeSpaceAR(d),
                        g = l,
                        m = d,
                        0 != e.testAABB(cc.rect(l.x, l.y, 4.5, 4.5)).length)
                            return void (r = !1);
                        h = !0,
                        v = !1,
                        p++;
                        var n = new cc.Node("line" + p)
                          , c = n.addComponent(cc.Graphics)
                          , f = n.addComponent(cc.RigidBody);
                        this.addChild(n),
                        f.gravityScale = 0,
                        f.type = cc.RigidBodyType.Static,
                        c.strokeColor = a.penColor[i.get("selectPen")],
                        c.lineCap = cc.Graphics.LineCap.ROUND,
                        c.lineWidth = 9,
                        c.moveTo(l.x, l.y),
                        this.getComponent("drawlines").penNode.getComponent(cc.Sprite).spriteFrame = this.getComponent("drawlines").penSprite[i.get("selectPen")],
                        this.getComponent("drawlines").penNode.position = l,
                        this.getComponent("drawlines").penNode.active = !0,
                        this.getComponent("drawlines").penNode.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 15), cc.rotateTo(.2, -15)))),
                        cc.find("Canvas/UILayer/btnLayer/tishiBtn").getComponent(cc.Button).interactable = !1,
                        cc.find("Canvas/UILayer/btnLayer/drawAdd").getComponent(cc.Button).interactable = !1,
                        cc.find("Canvas/UILayer/btnLayer/tryItem").getComponent(cc.Button).interactable = !1
                    }
                }, this.node),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                    if (h) {
                        if (u === e.getID()) {
                            if (d = e.getLocation(),
                            l = this.convertToNodeSpaceAR(d),
                            s <= 0)
                                return (f = this.getChildByName("line" + p)).getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                f.getComponent(cc.RigidBody).gravityScale = 3.5,
                                f.group = "line",
                                void (o.waterIsSpawn || (o.waterIsSpawn = !0,
                                o.frames = cc.director.getTotalFrames(),
                                o.begin = !0,
                                t.getWaterNode().getComponent("water").spawnWater()));
                            if (L = t.testrect(d.x, d.y),
                            t.wideRaycast(m.x, m.y, d.x, d.y),
                            L && !v) {
                                var f, C = Math.sqrt(Math.pow(l.x - g.x, 2) + Math.pow(l.y - g.y, 2));
                                if ((f = this.getChildByName("line" + p)).getComponent(cc.Graphics).lineTo(l.x, l.y),
                                f.getComponent(cc.Graphics).stroke(),
                                f.getComponent(cc.Graphics).moveTo(l.x, l.y),
                                C > 8) {
                                    if (C < 10)
                                        (S = f.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(l.x, l.y),
                                        S.radius = 4.5,
                                        S.density = 1,
                                        S.apply();
                                    else {
                                        for (var y = C / 10, w = 1; w < y; w++)
                                            (S = f.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(g.x + 10 * w * (l.x - g.x) / C, g.y + 10 * w * (l.y - g.y) / C),
                                            S.radius = 4.5,
                                            S.density = 1,
                                            S.apply();
                                        var S;
                                        (S = f.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(l.x, l.y),
                                        S.radius = 4.5,
                                        S.density = 1,
                                        S.apply()
                                    }
                                    g = l,
                                    m = d,
                                    c += C,
                                    (s -= C) / o.totalLength * 240 > 0 ? (cc.find("Canvas/UILayer/pen/lineLength").width = s / o.totalLength * 240,
                                    3e3 == o.totalLength ? t.percentShow.string = (s / o.totalLength * 200).toFixed(0) + "%" : t.percentShow.string = (s / o.totalLength * 100).toFixed(0) + "%") : (cc.find("Canvas/UILayer/pen/lineLength").width = 0,
                                    t.percentShow.string = "0%")
                                }
                                cc.find("Canvas/music").getComponent("musicManager").penAudio(),
                                t.getComponent("drawlines").penNode.position = l,
                                t.getComponent("drawlines").penNode.active = !0
                            } else {
                                var N = n.addComponent(cc.Graphics);
                                N.getComponent(cc.Graphics).clear(),
                                N.getComponent(cc.Graphics).moveTo(g.x, g.y),
                                N.getComponent(cc.Graphics).strokeColor = cc.color(255, 0, 0),
                                N.getComponent(cc.Graphics).lineTo(l.x, l.y),
                                N.getComponent(cc.Graphics).stroke()
                            }
                        }
                    } else if (!r) {
                        var L;
                        if (r = !0,
                        u = e.getID(),
                        d = e.getLocation(),
                        l = this.convertToNodeSpaceAR(d),
                        g = l,
                        m = d,
                        !(L = t.testrect(d.x, d.y)))
                            return void (r = !1);
                        h = !0,
                        v = !1,
                        p++;
                        var b = new cc.Node("line" + p)
                          , R = b.addComponent(cc.Graphics)
                          , A = b.addComponent(cc.RigidBody);
                        this.addChild(b),
                        A.gravityScale = 0,
                        A.type = cc.RigidBodyType.Static,
                        R.strokeColor = a.penColor[i.get("selectPen")],
                        R.lineCap = cc.Graphics.LineCap.ROUND,
                        R.lineWidth = 9,
                        R.moveTo(l.x, l.y),
                        this.getComponent("drawlines").penNode.getComponent(cc.Sprite).spriteFrame = this.getComponent("drawlines").penSprite[i.get("selectPen")],
                        this.getComponent("drawlines").penNode.position = l,
                        this.getComponent("drawlines").penNode.active = !0,
                        this.getComponent("drawlines").penNode.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.2, 15), cc.rotateTo(.2, -15)))),
                        cc.find("Canvas/UILayer/btnLayer/tishiBtn").getComponent(cc.Button).interactable = !1,
                        cc.find("Canvas/UILayer/btnLayer/drawAdd").getComponent(cc.Button).interactable = !1,
                        cc.find("Canvas/UILayer/btnLayer/tryItem").getComponent(cc.Button).interactable = !1
                    }
                }, this.node),
                this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    if (h && u === e.getID()) {
                        if (s > 0 && c > 0) {
                            var n = this.getChildByName("line" + p);
                            n.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                            n.getComponent(cc.RigidBody).gravityScale = 3.5,
                            n.group = "line",
                            o.waterIsSpawn || (o.waterIsSpawn = !0,
                            t.getWaterNode().getComponent("water").spawnWater()),
                            this.parent.children.forEach(function(e) {
                                for (var t = 0; t < f.length; t++) {
                                    if (e.name == f[4])
                                        return void (e.children[0].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic);
                                    e.name == f[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                                }
                            }),
                            o.frames = cc.director.getTotalFrames(),
                            o.begin = !0
                        }
                        cc.find("Canvas/music").getComponent("musicManager").stopPenAudio(),
                        cc.find("Canvas/UILayer/wenzi").active = !1,
                        h = !1,
                        r = !1,
                        this.getComponent("drawlines").penNode.active = !1
                    }
                }, this.node),
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                    if (h && u === e.getID()) {
                        if (s > 0 && c > 0) {
                            var n = this.getChildByName("line" + p);
                            n.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                            n.getComponent(cc.RigidBody).gravityScale = 3.5,
                            n.group = "line",
                            o.waterIsSpawn || (o.waterIsSpawn = !0,
                            t.getWaterNode().getComponent("water").spawnWater()),
                            this.parent.children.forEach(function(e) {
                                for (var t = 0; t < f.length; t++) {
                                    if (e.name == f[4])
                                        return void (e.children[0].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic);
                                    e.name == f[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                                }
                            }),
                            o.frames = cc.director.getTotalFrames(),
                            o.begin = !0
                        }
                        cc.find("Canvas/music").getComponent("musicManager").stopPenAudio(),
                        h = !1,
                        r = !1,
                        this.getComponent("drawlines").penNode.active = !1
                    }
                }, this.node)
            },
            getWaterNode: function() {
                return cc.find("Canvas/level/out/waterNode") ? cc.find("Canvas/level/out/waterNode") : cc.find("Canvas/level/outTop/waterNode") ? cc.find("Canvas/level/outTop/waterNode") : cc.find("Canvas/level/outRight/waterNode") ? cc.find("Canvas/level/outRight/waterNode") : void 0
            },
            testrect: function(e, t) {
                var n = cc.director.getPhysicsManager()
                  , o = n.testPoint(cc.v2(e - 4.5, t - 4.5));
                if (null == o || o.node.name == "line" + p) {
                    var a = n.testPoint(cc.v2(e - 4.5, t + 4.5));
                    if (null == a || a.node.name == "line" + p) {
                        var i = n.testPoint(cc.v2(e + 4.5, t - 4.5));
                        if (null == i || i.node.name == "line" + p) {
                            var c = n.testPoint(cc.v2(e + 4.5, t + 4.5));
                            if (null == c || c.node.name == "line" + p) {
                                var s = n.testPoint(cc.v2(e, t));
                                if (null == s || s.node.name == "line" + p)
                                    return !0
                            }
                        }
                    }
                }
                return !1
            },
            wideRaycast: function(e, t, n, o) {
                var a = cc.director.getPhysicsManager()
                  , i = Math.sqrt(Math.pow(n - e, 2) + Math.pow(o - t, 2))
                  , c = 4.5 * -(o - t) / i
                  , s = 4.5 * (n - e) / i
                  , r = a.rayCast(cc.v2(e - c, t - s), cc.v2(n - c, o - s), cc.RayCastType.All);
                if (r.length > 0)
                    for (var l = 0; l < r.length; l++) {
                        if (r[l].collider.node.name != "line" + p) {
                            v = !0;
                            break
                        }
                        v = !1
                    }
                var d = a.rayCast(cc.v2(e + c, t + s), cc.v2(n + c, o + s), cc.RayCastType.All);
                if (d.length > 0)
                    for (l = 0; l < d.length; l++) {
                        if (d[l].collider.node.name != "line" + p) {
                            v = !0;
                            break
                        }
                        v = !1
                    }
            },
            addCanDrawTotalLength: function() {
                s = 3e3,
                this.percentShow.string = (s / o.totalLength * 200).toFixed(0) + "%"
            },
            onDestroy: function() {
                this.unscheduleAllCallbacks()
            },
            update: function(e) {
                o.begin && cc.director.getTotalFrames() - o.frames > 480 && (o.win || (cc.find("Canvas/gameOver").active = !0,
                cc.find("Canvas/music").getComponent("musicManager").loseAudio()))
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        PhysicsManager: "PhysicsManager",
        WorldController: "WorldController",
        userType: "userType"
    }],
    editor: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "07bc9wZ1VxK4bNyACNQe+QE", "editor");
        var o = e("WorldController")
          , a = ["\u51fa\u6c34\u53e3@2x", "\u51fa\u6c34\u53e3@2x", "\u51fa\u6c34\u53e3@2x", "\u6b63\u5e38@2x", "1@2x", "2@2x", "3@2x", "4@2x", "5@2x", "6@2x", "7@2x", "8@2x", "9@2x", "10@2x", "8@2x", "4@2x", "4@2x", "\u5f62\u72b65@2x", "\u5f62\u72b65@2x", "\u77e9\u5f6212@2x", "19@2x", "\u692d\u57064@2x", "\u692d\u57064@2x", "\u692d\u57064@2x", "\u5341\u5b57\u67b6@2x"]
          , i = ["moveBox1", "moveBox2", "moveBox3", "moveBox4", "moveBox5", "glass"]
          , c = [];
        cc.Class({
            extends: cc.Component,
            properties: {
                prefabAtlas: {
                    default: [],
                    type: cc.Prefab
                },
                itemNode: cc.Node,
                toFileBtn: cc.Node,
                clearBtn: cc.Node,
                testBtn: cc.Node,
                bianjiBtn: cc.Node,
                completeBtn: cc.Node,
                recoverBtn: cc.Node
            },
            onLoad: function() {
                cc.director.getPhysicsManager().enabled = !0;
                for (var e = this, t = 0; t < a.length; t++)
                    !function(t) {
                        cc.loader.loadRes("box/" + a[t], cc.SpriteFrame, function(n, o) {
                            var a = new cc.Node;
                            a.addComponent(cc.Sprite),
                            a.getComponent(cc.Sprite).spriteFrame = o;
                            var i = a.addComponent("click");
                            1 == t && (a.rotation = 90),
                            2 == t && (a.rotation = 180),
                            14 == t && (a.width = 130,
                            a.height = 130),
                            15 == t && (a.rotation = -90),
                            16 == t && (a.rotation = 90,
                            a.scaleX = -1),
                            18 == t && (a.scaleX = -1),
                            22 == t && (a.scaleX = .5,
                            a.scaleY = .5),
                            23 == t && (a.scaleX = 2,
                            a.scaleY = 2);
                            var c = a.width
                              , s = a.height;
                            c > s ? (a.width = 130,
                            a.height = 130 / c * s) : c == s ? (a.width = 130,
                            a.height = 130) : (a.height = 130,
                            a.width = 130 / s * c),
                            c < s && 0 != a.rotation && (a.width = 130),
                            a.parent = e.itemNode,
                            i.init(e.prefabAtlas[t], e.node)
                        })
                    }(t)
            },
            over: function() {
                var e = new cc.Node("drawline");
                e.parent = this.node,
                e.addComponent("drawlinesTest").waterNode = this.getWaterNode();
                var t = e.addComponent(cc.Widget);
                t.isAlignTop = !0,
                t.top = 0,
                t.isAlignBottom = !0,
                t.bottom = 0,
                t.isAlignLeft = !0,
                t.left = 0,
                t.isAlignRight = !0,
                t.right = 0,
                console.log("over!!!"),
                this.clearBtn.active = !0,
                this.testBtn.active = !0,
                this.bianjiBtn.active = !0,
                this.completeBtn.active = !1,
                this.recoverBtn.active = !0
            },
            bianji: function() {
                this.clearLines();
                var e = cc.find("Canvas/level/drawline");
                e && e.destroy(),
                this.node.children.forEach(function(e) {
                    for (var t = 0; t < i.length; t++)
                        e.name == i[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static)
                }),
                this.clearBtn.active = !1,
                this.testBtn.active = !1,
                this.toFileBtn.active = !1,
                this.bianjiBtn.active = !1,
                this.recoverBtn.active = !1,
                this.completeBtn.active = !0
            },
            getWaterNode: function() {
                return cc.find("Canvas/level/out/waterNode") ? cc.find("Canvas/level/out/waterNode") : cc.find("Canvas/level/outTop/waterNode") ? cc.find("Canvas/level/outTop/waterNode") : cc.find("Canvas/level/outRight/waterNode") ? cc.find("Canvas/level/outRight/waterNode") : void 0
            },
            getLevelData: function(e) {
                for (var t = [], n = 0; n < this.node.children.length; n++)
                    this.node.children[n].y < -this.node.height / 2 ? this.node.children[n].destroy() : t.push({
                        name: this.node.children[n].name,
                        x: this.node.children[n].x,
                        y: this.node.children[n].y
                    });
                var o = cc.find("Canvas/level/drawline").getComponent("drawlinesTest").getLinesData();
                return t.push({
                    levelID: e,
                    answer: o
                }),
                console.log(t),
                console.log(JSON.stringify(t)),
                t
            },
            clearLines: function() {
                cc.find("Canvas/level/drawline") && cc.find("Canvas/level/drawline").getComponent("drawlinesTest").clearLines()
            },
            startTest: function() {
                c = this.getLevelData("test"),
                this.node.children.forEach(function(e) {
                    console.log(e);
                    for (var t = 0; t < i.length; t++) {
                        if (e.name == i[4])
                            return void (e.children[0].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic);
                        e.name == i[t] && (e.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                    }
                }),
                cc.find("Canvas/level/drawline").getComponent("drawlinesTest").startTest(),
                this.toFileBtn.active = !0
            },
            recover: function() {
                var e = this;
                e.clearLines(),
                e.node.removeAllChildren(),
                c.forEach(function(t) {
                    if (t.name && "drawline" != t.name) {
                        var n = e.getPrefab(t.name)
                          , o = cc.instantiate(e.prefabAtlas[n]);
                        o.addComponent("moveItem"),
                        o.x = t.x,
                        o.y = t.y,
                        o.parent = e.node,
                        "out" != t.name && "outTop" != t.name && "outRight" != t.name || o.setSiblingIndex(0)
                    }
                }),
                this.clearBtn.active = !1,
                this.testBtn.active = !1,
                this.toFileBtn.active = !1,
                this.bianjiBtn.active = !1,
                this.recoverBtn.active = !1,
                this.completeBtn.active = !0
            },
            getPrefab: function(e) {
                for (var t = 0; t < this.prefabAtlas.length; t++)
                    if (this.prefabAtlas[t].name == e)
                        return t
            },
            toFile: function() {
                var e = this;
                if (wx.getFileSystemManager) {
                    var t = wx.getFileSystemManager();
                    t.readFile({
                        filePath: wx.env.USER_DATA_PATH + "/level.json",
                        encoding: "utf8",
                        success: function(n) {
                            if (o.changeLevel)
                                a = JSON.parse(n.data),
                                i = e.changeNum + 1,
                                c[c.length - 1].levelID = i,
                                console.log("levelID:", i),
                                a[i - 1] = c,
                                t.writeFile({
                                    filePath: wx.env.USER_DATA_PATH + "/level.json",
                                    data: JSON.stringify(a),
                                    success: function(t) {
                                        console.log("write file success" + t),
                                        e.clearLines(),
                                        cc.find("Canvas/tishi").getComponent(cc.Graphics).clear(),
                                        e.node.removeAllChildren(),
                                        e.toFileBtn.active = !1,
                                        e.clearBtn.active = !1,
                                        e.testBtn.active = !1,
                                        e.bianjiBtn.active = !1,
                                        e.completeBtn.active = !0
                                    },
                                    fail: function(e) {
                                        console.log("write file error" + e)
                                    }
                                });
                            else {
                                var a, i = (a = JSON.parse(n.data)).length + 1;
                                c[c.length - 1].levelID = i,
                                console.log("levelID:", i),
                                a.push(c),
                                t.writeFile({
                                    filePath: wx.env.USER_DATA_PATH + "/level.json",
                                    data: JSON.stringify(a),
                                    success: function(t) {
                                        console.log("write file success" + t),
                                        e.clearLines(),
                                        e.node.removeAllChildren(),
                                        e.toFileBtn.active = !1,
                                        e.clearBtn.active = !1,
                                        e.testBtn.active = !1,
                                        e.bianjiBtn.active = !1,
                                        e.completeBtn.active = !0
                                    },
                                    fail: function(e) {
                                        console.log("write file error" + e)
                                    }
                                })
                            }
                        },
                        fail: function(n) {
                            console.log("read file null");
                            var o = [];
                            o.push(e.getLevelData(1)),
                            t.writeFile({
                                filePath: wx.env.USER_DATA_PATH + "/level.json",
                                data: JSON.stringify(o),
                                success: function(t) {
                                    console.log("write file success" + t),
                                    e.clearLines(),
                                    e.node.removeAllChildren()
                                },
                                fail: function(e) {
                                    console.log("write file error" + e.errMsg)
                                }
                            })
                        }
                    })
                }
            },
            levelChange: function(e) {
                var t = this;
                wx.getFileSystemManager().readFile({
                    filePath: wx.env.USER_DATA_PATH + "/level.json",
                    encoding: "utf8",
                    success: function(n) {
                        var a = JSON.parse(n.data);
                        c = a[e],
                        o.changeLevel = !0,
                        t.changeNum = e,
                        t.clearLines(),
                        t.node.removeAllChildren(),
                        c.forEach(function(e) {
                            if (e.name && "drawline" != e.name) {
                                var n = t.getPrefab(e.name)
                                  , o = cc.instantiate(t.prefabAtlas[n]);
                                o.addComponent("moveItem"),
                                o.x = e.x,
                                o.y = e.y,
                                o.parent = t.node,
                                "out" != e.name && "outTop" != e.name && "outRight" != e.name || o.setSiblingIndex(0)
                            }
                            if (!e.name) {
                                var a = e.answer
                                  , i = cc.find("Canvas/tishi").getComponent(cc.Graphics);
                                i.clear(),
                                i.moveTo(a[0].x, a[0].y - 30),
                                a.forEach(function(e) {
                                    i.lineTo(e.x, e.y - 30),
                                    i.stroke(),
                                    i.moveTo(e.x, e.y - 30)
                                })
                            }
                        }),
                        t.clearBtn.active = !1,
                        t.testBtn.active = !1,
                        t.toFileBtn.active = !1,
                        t.bianjiBtn.active = !1,
                        t.recoverBtn.active = !1,
                        t.completeBtn.active = !0
                    },
                    fail: function(e) {
                        console.log("read file null")
                    }
                })
            }
        }),
        cc._RF.pop()
    }
    , {
        WorldController: "WorldController"
    }],
    gameOver: [function(t, n, o) {
        "use strict";
        cc._RF.push(n, "8f38dCBX4FLKa1JzAJ3A71l", "gameOver");
        var a = t("WorldController");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            onEnable: function() {
                a.begin = !1,
                a.tryItem = !1,
                a.tryWater = !1,
                a.playNum++,
                a.playNum
            },
            onRewardAdClose: function() {
                cc.find("Canvas/gameOver").getComponent("gameOver")
            },
            onRewardAdStop: function() {
                wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                })
            },
            shareBtn: function() {},
            restartBtn: function() {
                a.waterIsSpawn = !1,
                a.win = !1,
                this.restart(e)
            },
            restart: function(e) {
                cc.director.loadScene("GameScene")
            },
            backBtn: function() {
                a.waterIsSpawn = !1,
                a.win = !1,
                cc.director.loadScene("MenuScene")
            },
            changeTime: function(e) {
                var t = ""
                  , n = Math.floor(e / 60);
                t = n < 10 ? "0" + n : n;
                var o = e % 60;
                return o < 10 ? t + ":0" + o : t + ":" + o
            },
            update: function() {}
        }),
        cc._RF.pop()
    }
    , {
        WorldController: "WorldController"
    }],
    glass: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "90488VwdR1Cka0+8u9A8jK5", "glass");
        var o = e("WorldController")
          , a = e("LocalStorageData");
        cc.Class({
            extends: cc.Component,
            properties: {
                complete: cc.ParticleSystem,
                glass1Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass2Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass3Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass4Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass5Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass6Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass7Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass8Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass9999Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass8888Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass9Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass10Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                }
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onLoad: function() {
				this.autoAdapteScreen();
                this.waterNum = 0,
                this.glass = [];
                var e = a.get("selectGlass");
                switch (o.tryItem && (e = o.tryNum),
                e) {
                case 0:
                    this.glass = this.glass1Atlas;
                    break;
                case 1:
                    this.glass = this.glass2Atlas;
                    break;
                case 2:
                    this.glass = this.glass3Atlas;
                    break;
                case 3:
                    this.glass = this.glass4Atlas;
                    break;
                case 4:
                    this.glass = this.glass5Atlas;
                    break;
                case 5:
                    this.glass = this.glass6Atlas;
                    break;
                case 6:
                    this.glass = this.glass7Atlas;
                    break;
                case 7:
                    this.glass = this.glass8Atlas;
                    break;
                case 9:
                    this.glass = this.glass9999Atlas;
                    break;
                case 8:
                    this.glass = this.glass8888Atlas;
                    break;
                case 10:
                    this.glass = this.glass9Atlas;
                    break;
                case 11:
                    this.glass = this.glass10Atlas;
                    break;
                default:
                    this.glass = this.glass1Atlas
                }
                this.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[0]
            },
            onBeginContact: function(e, t, n) {
                if (111 == n.tag && 666 == t.tag && (t.node.getComponent("glass").waterNum++,
                e.disabled = !0,
                n.tag = 0,
                this.waterNum >= o.winWaterNum / 2 && this.waterNum < o.winWaterNum && (t.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[1]),
                this.waterNum >= o.winWaterNum && !o.win)) {
                    t.node.parent.getComponent(cc.Sprite).spriteFrame = this.glass[2],
                    o.win = !0,
                    console.log("success");
                    var a = cc.find("Canvas/gameOver");
                    a && !a.active && (cc.find("Canvas/music").getComponent("musicManager").completeAudio(),
                    t.node.getComponent("glass").complete.resetSystem(),
                    this.timeout = setTimeout(function() {
                        o.completeCount % 3 == 0 ? cc.find("Canvas/rollLayer").active = !0 : (cc.find("Canvas/tryItem").active = !0,
                        o.completeCount++)
                    }, 1e3))
                }
            },
            onDestroy: function() {
                this.unscheduleAllCallbacks(),
                clearTimeout(this.timeout)
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    huxi: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2973bnATO1J35yeQ5U+muIA", "huxi"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onEnable: function() {
                this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1.2), cc.scaleTo(1, 1))))
            }
        }),
        cc._RF.pop()
    }
    , {}],
    levelChange: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b96cf5/Xk5NDLpPFH+uHB/9", "levelChange"),
        e("LocalStorageData"),
        e("WorldController"),
        cc.Class({
            extends: cc.Component,
            properties: {
                levelNum: cc.Label,
                star: cc.SpriteFrame,
                starNo: cc.SpriteFrame,
                starNode: cc.Node,
                lock: cc.Node
            },
            init: function(e) {
                this.lock.active = !1,
                this.levelNum.string = e + 1,
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.lock.active ? wx.showToast && wx.showToast({
                        title: "\u5173\u5361\u672a\u89e3\u9501",
                        icon: "none",
                        duration: 2e3
                    }) : (cc.find("Canvas/level").getComponent("test").levelChange(e),
                    cc.find("Canvas/levelSelect").getComponent("levelSelect").close())
                }, this)
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    levelItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "0512em2Of1GLr9cOdlI/oDo", "levelItem");
        var o = e("LocalStorageData")
          , a = e("WorldController");
        cc.Class({
            extends: cc.Component,
            properties: {
                levelNum: cc.Label,
                star: cc.SpriteFrame,
                starNo: cc.SpriteFrame,
                starNode: cc.Node,
                lock: cc.Node
            },
            init: function(e) {
                var t = o.get("levelNum");
                if (e <= t) {
                    this.lock.active = !1,
                    this.levelNum.string = e + 1;
                    var n = o.get("level" + e);
                    3 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star,
                    this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.star,
                    this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.star) : 2 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star,
                    this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.star,
                    this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo) : 1 == n ? (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.star,
                    this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.starNo,
                    this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo) : (this.starNode.children[0].getComponent(cc.Sprite).spriteFrame = this.starNo,
                    this.starNode.children[1].getComponent(cc.Sprite).spriteFrame = this.starNo,
                    this.starNode.children[2].getComponent(cc.Sprite).spriteFrame = this.starNo)
                } else
                    this.lock.active = !0;
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    this.lock.active ? wx.showToast && wx.showToast({
                        title: "\u5173\u5361\u672a\u89e3\u9501",
                        icon: "none",
                        duration: 2e3
                    }) : a.currentLevel = e,
                    cc.director.loadScene("GameScene")
                }, this)
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    levelSelect: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e5fceu50BRPe7I+DrWDMETC", "levelSelect");
        var o = e("WorldController");
        cc.Class({
            extends: cc.Component,
            properties: {
                itemPrefab: cc.Prefab,
                content: cc.Node
            },
            start: function() {
                o.getLevelData(this.showItem, this)
            },
            showItem: function(e, t) {
                for (var n = 0; n < o.levelNum; n++) {
                    var a = cc.instantiate(t.itemPrefab);
                    a.getComponent("levelItem").init(n),
                    a.parent = t.content
                }
            },
            close: function() {
                this.node.active = !1
            },
            show: function() {
                this.node.active = !0
            }
        }),
        cc._RF.pop()
    }
    , {
        WorldController: "WorldController"
    }],
    loadLevel: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c4c6cRM9DVHCrLKwvhDU6fQ", "loadLevel");
        var o = e("WorldController");
        cc.Class({
            extends: cc.Component,
            properties: {
                itemNode: cc.Node,
                prefabAtlas: {
                    default: [],
                    type: cc.Prefab
                }
            },
            onLoad: function() {
                cc.director.getPhysicsManager().enabled = !0,
                o.getLevelData(this.getLevelData, this)
            },
            getLevelData: function(e, t) {
                o.levelData[e].forEach(function(e) {
                    if (e.name && "drawline" != e.name) {
                        var n = t.getPrefab(e.name)
                          , o = cc.instantiate(t.prefabAtlas[n]);
                        o.x = e.x,
                        o.y = e.y,
                        o.parent = t.itemNode,
                        "out" != e.name && "outTop" != e.name && "outRight" != e.name || o.setSiblingIndex(0)
                    }
                })
            },
            getPrefab: function(e) {
                for (var t = 0; t < this.prefabAtlas.length; t++)
                    if (this.prefabAtlas[t].name == e)
                        return t
            }
        }),
        cc._RF.pop()
    }
    , {
        WorldController: "WorldController"
    }],
    moveItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "989a9Sb6/1LLaqwvPatULgG", "moveItem"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var e = this.node
                  , t = cc.find("Canvas/level");
                this.node.on(cc.Node.EventType.TOUCH_MOVE, function(n) {
                    e.position = t.convertToNodeSpaceAR(n.getLocation()),
                    e.children[0] && (e.children[0].position = cc.v2(0, 0))
                }),
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(t) {
                    e.destroy()
                })
            }
        }),
        cc._RF.pop()
    }
    , {}],
    musicManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "7abe4KliQhLrLvOYe6aU612", "musicManager"),
        cc.Class({
            extends: cc.Component,
            properties: {
                water: {
                    type: cc.AudioClip,
                    default: null
                },
                win: {
                    type: cc.AudioClip,
                    default: null
                },
                lose: {
                    type: cc.AudioClip,
                    default: null
                },
                complete: {
                    type: cc.AudioClip,
                    default: null
                },
                pen: {
                    type: cc.AudioClip,
                    default: null
                },
                button: {
                    type: cc.AudioClip,
                    default: null
                }
            },
            waterAudio: function() {
                cc.audioEngine.play(this.water, !1, .5)
            },
            winAudio: function() {
                cc.audioEngine.play(this.win, !1, .5)
            },
            loseAudio: function() {
                cc.audioEngine.play(this.lose, !1, .5)
            },
            completeAudio: function() {
                cc.audioEngine.play(this.complete, !1, .5)
            },
            buttonAudio: function() {
                cc.audioEngine.play(this.button, !1, .5)
            },
            penAudio: function() {
                this.penEffect && -1 != cc.audioEngine.getState(this.penEffect) || (this.penEffect = cc.audioEngine.play(this.pen, !1, .5))
            },
            stopPenAudio: function() {
                cc.audioEngine.stop(this.penEffect)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    "polyglot.min": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        (function(e, a) {
            "function" == typeof define && define.amd ? define([], function() {
                return a(e)
            }) : "object" == (void 0 === n ? "undefined" : o(n)) ? t.exports = a(e) : e.Polyglot = a(e)
        }
        )(void 0, function(e) {
            function t(e) {
                e = e || {},
                this.phrases = {},
                this.extend(e.phrases || {}),
                this.currentLocale = e.locale || "en",
                this.allowMissing = !!e.allowMissing,
                this.warn = e.warn || l
            }
            function n(e) {
                var t, n, o, a = {};
                for (t in e)
                    if (e.hasOwnProperty(t))
                        for (o in n = e[t])
                            a[n[o]] = t;
                return a
            }
            function a(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }
            function i(e, t, n) {
                var o, i;
                return null != n && e ? o = a((i = e.split(h))[s(t, n)] || i[0]) : o = e,
                o
            }
            function c(e) {
                var t = n(u);
                return t[e] || t.en
            }
            function s(e, t) {
                return p[c(e)](t)
            }
            function r(e, t) {
                for (var n in t)
                    "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}","g"), t[n]));
                return e
            }
            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }
            function d(e) {
                var t = {};
                for (var n in e)
                    t[n] = e[n];
                return t
            }
            t.VERSION = "0.4.3",
            t.prototype.locale = function(e) {
                return e && (this.currentLocale = e),
                this.currentLocale
            }
            ,
            t.prototype.extend = function(e, t) {
                var n;
                for (var a in e)
                    e.hasOwnProperty(a) && (n = e[a],
                    t && (a = t + "." + a),
                    "object" == (void 0 === n ? "undefined" : o(n)) ? this.extend(n, a) : this.phrases[a] = n)
            }
            ,
            t.prototype.clear = function() {
                this.phrases = {}
            }
            ,
            t.prototype.replace = function(e) {
                this.clear(),
                this.extend(e)
            }
            ,
            t.prototype.t = function(e, t) {
                var n, o;
                return "number" == typeof (t = null == t ? {} : t) && (t = {
                    smart_count: t
                }),
                "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'),
                o = e),
                "string" == typeof n && (t = d(t),
                o = r(o = i(n, this.currentLocale, t.smart_count), t)),
                o
            }
            ,
            t.prototype.has = function(e) {
                return e in this.phrases
            }
            ;
            var h = "||||"
              , p = {
                chinese: function(e) {
                    return 0
                },
                german: function(e) {
                    return 1 !== e ? 1 : 0
                },
                french: function(e) {
                    return e > 1 ? 1 : 0
                },
                russian: function(e) {
                    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                },
                czech: function(e) {
                    return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                },
                polish: function(e) {
                    return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                },
                icelandic: function(e) {
                    return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                }
            }
              , u = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"]
            };
            return t
        }),
        cc._RF.pop()
    }
    , {}],
    rollReward: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "bb625RJridC7qhpv7Iu1NYw", "rollReward");
        var o = e("LocalStorageData")
          , a = e("WorldController")
          , i = e("GameDataManager");
        cc.Class({
            extends: cc.Component,
            properties: {
                zhuanpan: cc.Node,
                beginBtn: cc.Node,
                itemNum: 8,
                showLayer: cc.Node,
                shareBtn: cc.Node,
                videoBtn: cc.Node,
                closeBtn: cc.Node,
                reward2: cc.SpriteFrame
            },
            onLoad: function() {
                this.rewardNum = 0
            },
            onEnable: function() {
                isNaN(o.get("glass9")) || (this.zhuanpan.getComponent(cc.Sprite).spriteFrame = this.reward2)
            },
            onRewardAdClose: function() {
                var e = cc.find("Canvas/rollLayer").getComponent("rollReward");
                switch (e.rewardType) {
                case 1:
                    e.zhuanpan.rotation = 0,
                    e.rewardNum++,
                    e.reward()
                }
            },
            onRewardAdStop: function() {
                var e = cc.find("Canvas/rollLayer").getComponent("rollReward");
                1 == e.tishi ? (wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                }),
                e.videoBtn.getComponent("cc.Button").interactable = !0) : (wx.showToast({
                    title: a.shareError[Math.floor(3 * Math.random(0, .99))],
                    icon: "none",
                    duration: 2500
                }),
                e.shareBtn.getComponent("cc.Button").interactable = !0)
            },
            getRandom: function(e, t) {
                return Math.floor(Math.random(0, .99) * (t - e)) + e
            },
            getEnd: function(e) {
                return console.log(e),
                e < 2 ? this.getRandom(0, 360 / this.itemNum - 1) : e < 17 ? 360 / this.itemNum + this.getRandom(0, 360 / this.itemNum - 1) : e < 27 ? 360 / this.itemNum * 2 + this.getRandom(0, 360 / this.itemNum - 1) : e < 47 ? 360 / this.itemNum * 3 + this.getRandom(0, 360 / this.itemNum - 1) : e < 55 ? 360 / this.itemNum * 4 + this.getRandom(0, 360 / this.itemNum - 1) : e < 70 ? 360 / this.itemNum * 5 + this.getRandom(0, 360 / this.itemNum - 1) : e < 80 ? 360 / this.itemNum * 6 + this.getRandom(0, 360 / this.itemNum - 1) : 360 / this.itemNum * 7 + this.getRandom(0, 360 / this.itemNum - 1)
            },
            beginBtnEvent: function() {
                this.reward(),
                this.beginBtn.getComponent("cc.Button").interactable = !1
            },
            reward: function() {
                var e = this
                  , t = this.getRandom(0, 100)
                  , n = this.getEnd(t)
                  , o = cc.callFunc(function() {
                    e.getReward(n),
                    e.beginBtn.active = !1,
                    e.rewardNum,
                    a.currentLevel < 5 ? (e.videoBtn.active = !0,
                    e.videoBtn.getComponent(cc.Button).interactable = !0) : e.shareBtn.active ? (e.videoBtn.active = !0,
                    e.shareBtn.active = !1,
                    e.videoBtn.getComponent(cc.Button).interactable = !0) : (e.shareBtn.active = !0,
                    e.videoBtn.active = !1,
                    e.shareBtn.getComponent(cc.Button).interactable = !0),
                    e.closeBtn.active = !0
                }, this)
                  , i = cc.rotateBy(2, 2160).easing(cc.easeQuarticActionIn())
                  , c = cc.rotateBy(3, n + 1080).easing(cc.easeQuarticActionOut());
                this.zhuanpan.runAction(cc.sequence(i, c, o))
            },
            getReward: function(e) {
                switch (Math.floor((360 - e) / (360 / this.itemNum))) {
                case 0:
                    o.updateGold(20),
                    wx.showToast({
                        title: "\u91d1\u5e01+20",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 1:
                    o.updateGold(80),
                    wx.showToast({
                        title: "\u91d1\u5e01+80",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 2:
                    o.updateGold(50),
                    wx.showToast({
                        title: "\u91d1\u5e01+50",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 3:
                    o.updateGold(100),
                    wx.showToast({
                        title: "\u91d1\u5e01+100",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 4:
                    o.updateGold(20),
                    wx.showToast({
                        title: "\u91d1\u5e01+20",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 5:
                    o.updateGold(80),
                    wx.showToast({
                        title: "\u91d1\u5e01+80",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 6:
                    o.updateGold(50),
                    wx.showToast({
                        title: "\u91d1\u5e01+50",
                        icon: "none",
                        duration: 2e3
                    });
                    break;
                case 7:
                    isNaN(o.get("glass9")) ? (o.set("glass9", 0),
                    this.showLayer.active = !0,
                    this.showLayer.getComponent("tryItem").showItem = !0,
                    this.node.active = !1) : (o.updateGold(100),
                    wx.showToast({
                        title: "\u91d1\u5e01+100",
                        icon: "none",
                        duration: 2e3
                    }))
                }
            },
            tryBtn: function() {
                this.rewardType = 1,
                this.tishi = 1,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop),
                this.videoBtn.getComponent("cc.Button").interactable = !1
            },
            shareEvent: function() {
                this.rewardType = 1,
                this.tishi = 2,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop),
                a.share = !0,
                this.shareBtn.getComponent("cc.Button").interactable = !1
            },
            close: function() {
                this.node.active = !1,
                cc.find("Canvas/complete").active = !0,
                cc.find("Canvas/complete").getComponent("complete").init(),
                cc.find("Canvas/music").getComponent("musicManager").winAudio()
            },
            onDisable: function() {}
        }),
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    shopItemData: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "647f6p030pGKr7BP40LTZUR", "shopItemData"),
        t.exports = {
            waterGold: [0, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
            glassGold: [0, 500, 1e3, 1500, 2e3, 2e3, 3e3, 3e3, 0, 0, 3e3, 3e3],
            penGold: [0, 500, 1e3, 1500, 2500, 4e3, 4e3]
        },
        cc._RF.pop()
    }
    , {}],
    shopItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c0b16OVuyFDcZ2s1j7DcS8X", "shopItem");
        var o = e("LocalStorageData")
          , a = e("shopItemData");
        cc.Class({
            extends: cc.Component,
            properties: {},
            init: function(e, t, n, i) {
                var c;
                1 == t && (0 == (c = o.get("water" + e)) ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = i,
                this.node.children[1].active = !1,
                this.node.children[2].active = !1) : 1 == c ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = n,
                this.node.children[1].active = !0,
                this.node.children[2].active = !1) : (this.node.children[0].active = !1,
                this.node.children[1].active = !1,
                this.node.children[2].active = !0,
                this.node.children[2].children[0].getComponent(cc.Label).string = a.waterGold[e])),
                2 == t && (0 == (c = o.get("glass" + e)) ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = i,
                this.node.children[3].active = !1,
                this.node.children[1].active = !1) : 1 == c ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = n,
                this.node.children[3].active = !0,
                this.node.children[1].active = !1) : (this.node.children[0].active = !1,
                this.node.children[3].active = !1,
                this.node.children[1].active = !0,
                8 == e || 9 == e || 10 == e || 11 == e || (this.node.children[1].children[0].getComponent(cc.Label).string = a.glassGold[e]))),
                3 == t && (0 == (c = o.get("pen" + e)) ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = i,
                this.node.children[1].active = !1,
                this.node.children[2].active = !1) : 1 == c ? (this.node.children[0].getComponent(cc.Sprite).spriteFrame = n,
                this.node.children[1].active = !0,
                this.node.children[2].active = !1) : (this.node.children[0].active = !1,
                this.node.children[1].active = !1,
                this.node.children[2].active = !0,
                this.node.children[2].children[0].getComponent(cc.Label).string = a.penGold[e])),
                this.node.on(cc.Node.EventType.TOUCH_END, function() {
                    var c;
                    if (1 == t)
                        if (0 == (c = o.get("water" + e))) {
                            o.set("water" + e, 1);
                            var s = o.get("selectWater");
                            o.set("water" + s, 0),
                            o.set("selectWater", e),
                            this.children[1].active = !0,
                            this.children[0].getComponent(cc.Sprite).spriteFrame = n,
                            this.parent.children[s].children[1].active = !1,
                            this.parent.children[s].children[0].getComponent(cc.Sprite).spriteFrame = i
                        } else
                            1 == c || (o.get("gold") >= a.waterGold[e] ? (console.log("\u8d2d\u4e70"),
                            o.updateGold(-a.waterGold[e]),
                            cc.find("Canvas").getComponent("Game").updateShopGold(),
                            o.set("water" + e, 0),
                            this.children[0].active = !0,
                            this.children[0].getComponent(cc.Sprite).spriteFrame = i,
                            this.children[2].active = !1) : (console.log("\u91d1\u5e01\u4e0d\u8db3"),
                            wx.showToast && wx.showToast({
                                title: "\u91d1\u5e01\u4e0d\u8db3",
                                icon: "none",
                                duration: 2e3
                            })));
                    2 == t && (0 == (c = o.get("glass" + e)) ? (o.set("glass" + e, 1),
                    s = o.get("selectGlass"),
                    o.set("glass" + s, 0),
                    o.set("selectGlass", e),
                    this.children[3].active = !0,
                    this.children[0].getComponent(cc.Sprite).spriteFrame = n,
                    this.parent.children[s].children[3].active = !1,
                    this.parent.children[s].children[0].getComponent(cc.Sprite).spriteFrame = i) : 1 == c || (8 == e || 9 == e || 10 == e || 11 == e ? wx.showToast && wx.showToast({
                        title: "\u5956\u52b1\u4e13\u5c5e\u76ae\u80a4\uff0c\u4e0d\u53ef\u8d2d\u4e70",
                        icon: "none",
                        duration: 2e3
                    }) : o.get("gold") >= a.glassGold[e] ? (console.log("\u8d2d\u4e70"),
                    o.updateGold(-a.glassGold[e]),
                    cc.find("Canvas").getComponent("Game").updateShopGold(),
                    o.set("glass" + e, 0),
                    this.children[0].active = !0,
                    this.children[0].getComponent(cc.Sprite).spriteFrame = i,
                    this.children[1].active = !1) : (console.log("\u91d1\u5e01\u4e0d\u8db3"),
                    wx.showToast && wx.showToast({
                        title: "\u91d1\u5e01\u4e0d\u8db3",
                        icon: "none",
                        duration: 2e3
                    })))),
                    3 == t && (0 == (c = o.get("pen" + e)) ? (o.set("pen" + e, 1),
                    s = o.get("selectPen"),
                    o.set("pen" + s, 0),
                    o.set("selectPen", e),
                    this.children[1].active = !0,
                    this.children[0].getComponent(cc.Sprite).spriteFrame = n,
                    this.parent.children[s].children[1].active = !1,
                    this.parent.children[s].children[0].getComponent(cc.Sprite).spriteFrame = i) : 1 == c || (o.get("gold") >= a.penGold[e] ? (console.log("\u8d2d\u4e70"),
                    o.updateGold(-a.penGold[e]),
                    cc.find("Canvas").getComponent("Game").updateShopGold(),
                    o.set("pen" + e, 0),
                    this.children[0].active = !0,
                    this.children[0].getComponent(cc.Sprite).spriteFrame = i,
                    this.children[2].active = !1) : (console.log("\u91d1\u5e01\u4e0d\u8db3"),
                    wx.showToast && wx.showToast({
                        title: "\u91d1\u5e01\u4e0d\u8db3",
                        icon: "none",
                        duration: 2e3
                    }))))
                }, this.node)
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        shopItemData: "shopItemData"
    }],
    shopLayer: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c145euFEylDSrdybyrIAPdj", "shopLayer"),
        e("LocalStorageData"),
        cc.Class({
            extends: cc.Component,
            properties: {
                waterLayer: cc.Node,
                glassLayer: cc.Node,
                penLayer: cc.Node,
                waterBtn: cc.Node,
                glassBtn: cc.Node,
                penBtn: cc.Node,
                waterSelect: cc.SpriteFrame,
                waterNo: cc.SpriteFrame,
                glassSelect: cc.SpriteFrame,
                glassNo: cc.SpriteFrame,
                penSelect: cc.SpriteFrame,
                penNo: cc.SpriteFrame,
                usingSprite: cc.SpriteFrame,
                havedSprite: cc.SpriteFrame
            },
            onLoad: function() {
                for (var e = 0; e < this.waterLayer.children[0].children.length; e++)
                    this.waterLayer.children[0].children[e].addComponent("shopItem").init(e, 1, this.usingSprite, this.havedSprite);
                for (var t = 0; t < this.glassLayer.children[0].children.length; t++)
                    this.glassLayer.children[0].children[t].addComponent("shopItem").init(t, 2, this.usingSprite, this.havedSprite);
                for (var n = 0; n < this.penLayer.children[0].children.length; n++)
                    this.penLayer.children[0].children[n].addComponent("shopItem").init(n, 3, this.usingSprite, this.havedSprite)
            },
            waterBtnEvent: function() {
                this.waterLayer.active = !0,
                this.glassLayer.active = !1,
                this.penLayer.active = !1,
                this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterSelect,
                this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassNo,
                this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penNo
            },
            glassBtnEvent: function() {
                this.waterLayer.active = !1,
                this.glassLayer.active = !0,
                this.penLayer.active = !1,
                this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterNo,
                this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassSelect,
                this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penNo
            },
            penBtnEvent: function() {
                this.waterLayer.active = !1,
                this.glassLayer.active = !1,
                this.penLayer.active = !0,
                this.waterBtn.getComponent(cc.Sprite).spriteFrame = this.waterNo,
                this.glassBtn.getComponent(cc.Sprite).spriteFrame = this.glassNo,
                this.penBtn.getComponent(cc.Sprite).spriteFrame = this.penSelect
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData"
    }],
    tishi: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "fc847YVME9Anr4VX/9CxZmh", "tishi");
        var o = e("WorldController")
          , a = e("LocalStorageData")
          , i = e("GameDataManager")
          , c = e("userType");
        cc.Class({
            extends: cc.Component,
            properties: {
                star1: cc.Node,
                star2: cc.Node,
                line: cc.Node,
                starsNode: cc.Node,
                goldLabel: cc.Label,
                levelShow: cc.Label,
                hand: cc.Node,
                wenzi: cc.Node,
                light: cc.Node,
                tryWaterNode: cc.Node,
                tishiNode: cc.Node,
                videoTishi: cc.SpriteFrame
            },
            onLoad: function() {
                isNaN(a.get("gold")) ? (this.goldLabel.string = 0,
                a.set("gold", 0)) : this.goldLabel.string = a.get("gold");
                var e = o.currentLevel + 1;
                this.levelShow.string = "\u7b2c" + e + "\u5173",
                o.getLevelData(this.showStarLine, this),
                this.lineLengthResume();
                var t = cc.find("Canvas/UILayer/pen/lineLength");
                this.schedule(function() {
                    t.width < this.star1.x + 120 ? (this.starsNode.children[1].active = !1,
                    this.starsNode.children[2].active = !1) : t.width < this.star2.x + 120 && (this.starsNode.children[2].active = !1)
                }, .5),
                o.currentLevel < 5 && (this.tryWaterNode.active = !1,
                this.tishiNode.getComponent(cc.Sprite).spriteFrame = this.videoTishi)
            },
            start: function() {
                if (0 == o.currentLevel) {
                    o.getLevelData(this.getAnswer, this);
                    var e = cc.v2(0, 0)
                      , t = cc.v2(0, 0);
                    o.levelData[0].forEach(function(n) {
                        if (!n.name) {
                            var o = n.answer;
                            e = cc.v2(o[0].x, o[0].y),
                            t = cc.v2(o[1].x, o[1].y)
                        }
                    }),
                    this.wenzi.active = !0,
                    this.hand.active = !0;
                    var n = cc.callFunc(function() {
                        this.hand.position = e
                    }, this);
                    this.hand.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, t), cc.delayTime(.5), n))),
                    a.set("first", 1)
                }
                var i = this;
                setTimeout(function() {
                    o.repeat && i.light && (i.light.active = !0)
                }, 1e3),
                o.tryWaterNum = Math.floor(6 * Math.random(0, .99)),
                this.tryWaterNode.children[0].color = c.tryWaterColor[o.tryWaterNum]
            },
            onRewardAdClose: function() {
                var e = cc.find("Canvas/UILayer/tishi").getComponent("tishi");
                switch (console.log(e.rewardType),
                e.rewardType) {
                case 1:
                    var t = a.get("gold");
                    a.set("gold", t + 50),
                    e.goldLabel.string = a.get("gold");
                    break;
                case 2:
                    e.light.active = !1,
                    o.repeat = !1,
                    o.getLevelData(e.getAnswer, e);
                    break;
                case 3:
                    o.totalLength = 3e3,
                    cc.find("Canvas/level/drawLine").getComponent("drawlines").addCanDrawTotalLength();
                    break;
                case 4:
                    o.tryWater = !0,
                    wx.showToast({
                        title: "\u8bd5\u7528\u6210\u529f\uff01",
                        icon: "none",
                        duration: 2e3
                    })
                }
            },
            onRewardAdStop: function() {
                1 == cc.find("Canvas/UILayer/tishi").getComponent("tishi").tishi || o.currentLevel < 5 ? wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                }) : wx.showToast({
                    title: o.shareError[Math.floor(3 * Math.random(0, .99))],
                    icon: "none",
                    duration: 2500
                })
            },
            goldAddBtn: function() {
                this.rewardType = 1;
                var e = this;
                wx.showModal({
                    title: "\u63d0\u793a",
                    content: "\u662f\u5426\u89c2\u770b\u89c6\u9891\u83b7\u53d6\u91d1\u5e01\uff1f",
                    success: function(t) {
                        t.confirm ? (console.log("\u7528\u6237\u70b9\u51fb\u786e\u5b9a"),
                        i.setRewardCloseClass(e.onRewardAdClose),
                        i.setRewardStopClass(e.onRewardAdStop)) : t.cancel && console.log("\u7528\u6237\u70b9\u51fb\u53d6\u6d88")
                    }
                })
            },
            restartBtn: function() {
                o.waterIsSpawn = !1,
                o.begin = !1,
                o.win = !1,
                o.repeat = !0,
                cc.director.loadScene("GameScene")
            },
            backBtn: function() {
                o.waterIsSpawn = !1,
                o.begin = !1,
                cc.director.loadScene("MenuScene")
            },
            showTishi: function() {
                this.rewardType = 2,
                this.tishi = 1,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop)
            },
            shareTishi: function() {
                this.rewardType = 2,
                this.tishi = 2,
                this.onRewardAdClose()
            },
            lineLengthAdd: function() {
                this.rewardType = 3,
                this.tishi = 1,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop)
            },
            lineLengthResume: function() {
                o.totalLength = 1500
            },
            tryWater: function() {
                this.rewardType = 4,
                this.tishi = 1,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop)
            },
            showStarLine: function(e, t) {
                o.levelData[e].forEach(function(e) {
                    if (!e.name) {
                        for (var n = e.answer, a = 0, i = 1; i < n.length; i++)
                            a += Math.sqrt(Math.pow(n[i].x - n[i - 1].x, 2) + Math.pow(n[i].y - n[i - 1].y, 2));
                        var c = a / o.totalLength;
                        t.star2.x = 1.5 * c > .5 ? 0 : t.line.width / 2 - t.line.width * c * 1.5,
                        2 * c > .8 ? t.star1.x = .3 * -t.line.width : (t.star1.x = t.line.width / 2 - t.line.width * c * 2,
                        (t.star1.x - t.star2.x) / 240 < .2 && (t.star1.x = t.star2.x - 48))
                    }
                })
            },
            getAnswer: function(e, t) {
                o.levelData[e].forEach(function(e) {
                    if (!e.name) {
                        var n = e.answer
                          , o = t.node.getComponent(cc.Graphics);
                        o.moveTo(n[0].x, n[0].y - 30),
                        n.forEach(function(e) {
                            o.lineTo(e.x, e.y - 30),
                            o.stroke(),
                            o.moveTo(e.x, e.y - 30)
                        })
                    }
                })
            },
            onDestroy: function() {
                this.lineLengthResume()
            }
        }),
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController",
        userType: "userType"
    }],
    tryItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9840c+icZ5LiKPylWlaae9M", "tryItem");
        var o = e("WorldController")
          , a = e("LocalStorageData")
          , i = e("GameDataManager");
        cc.Class({
            extends: cc.Component,
            properties: {
                closeBtn: cc.Node,
                glassIcon: cc.Node,
                shareNode: cc.Node,
                videoNode: cc.Node,
                useBtn: cc.Node,
                glass1Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass2Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass3Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass4Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass5Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass6Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass7Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass8Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                rewardGlass: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass9Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                },
                glass10Atlas: {
                    default: [],
                    type: cc.SpriteFrame
                }
            },
            onLoad: function() {
                this.showItem = !1
            },
            onEnable: function() {
                var e = this;
                setTimeout(function() {
                    e.closeBtn.active = !0
                }, 2e3),
                this.glass = [],
                this.scheduleOnce(function() {
                    if (this.tryNum = this.getGlassNum(),
                    this.showItem)
                        this.glass = this.rewardGlass,
                        this.videoNode.active = !1,
                        this.shareNode.active = !1,
                        this.useBtn.active = !0;
                    else
                        switch (o.currentLevel < 5 ? (this.videoNode.active = !0,
                        this.shareNode.active = !1) : o.currentLevel % 2 == 1 ? (this.videoNode.active = !1,
                        this.shareNode.active = !0) : (this.videoNode.active = !0,
                        this.shareNode.active = !1),
                        this.tryNum) {
                        case 0:
                            this.glass = this.glass1Atlas;
                            break;
                        case 1:
                            this.glass = this.glass2Atlas;
                            break;
                        case 2:
                            this.glass = this.glass3Atlas;
                            break;
                        case 3:
                            this.glass = this.glass4Atlas;
                            break;
                        case 4:
                            this.glass = this.glass5Atlas;
                            break;
                        case 5:
                            this.glass = this.glass6Atlas;
                            break;
                        case 6:
                            this.glass = this.glass7Atlas;
                            break;
                        case 7:
                            this.glass = this.glass8Atlas;
                            break;
                        default:
                            this.glass = this.glass1Atlas
                        }
                    this.glassIcon.getComponent(cc.Sprite).spriteFrame = this.glass[0]
                }
                .bind(this), .02);
                var t = 0;
                this.schedule(function() {
                    3 == t && (t = 0),
                    this.glassIcon.getComponent(cc.Sprite).spriteFrame = this.glass[t],
                    t++
                }, 1),
                o.tryItem = !1,
                o.tryWater = !1
            },
            onRewardAdClose: function() {
                var e = cc.find("Canvas/tryItem").getComponent("tryItem");
                switch (e.rewardType) {
                case 1:
                    o.tryItem = !0,
                    o.tryNum = e.tryNum,
                    e.close()
                }
            },
            onRewardAdStop: function() {
                1 == cc.find("Canvas/tryItem").getComponent("tryItem").tishi ? wx.showToast({
                    title: "\u53ea\u6709\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u80fd\u83b7\u5f97\u5956\u52b1\u54e6",
                    icon: "none",
                    duration: 2500
                }) : wx.showToast({
                    title: o.shareError[Math.floor(3 * Math.random(0, .99))],
                    icon: "none",
                    duration: 2500
                })
            },
            getGlassNum: function() {
                for (var e = [], t = 0; t < 8; t++)
                    isNaN(a.get("glass" + t)) && (this.tryType = 1,
                    e.push(t));
                return e.length > 0 ? e[Math.floor(Math.random(0, .99) * e.length)] : this.showItem ? void 0 : this.close()
            },
            getWaterNum: function() {
                for (var e = 0; e < 12; e++)
                    if (isNaN(a.get("water" + e)))
                        return this.tryType = 2,
                        e;
                return this.getPenNum()
            },
            getPenNum: function() {
                for (var e = 0; e < 6; e++)
                    if (isNaN(a.get("pen" + e)))
                        return this.tryType = 3,
                        e;
                return this.close()
            },
            tryBtn: function() {
                this.rewardType = 1,
                this.tishi = 1,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop)
            },
            shareBtn: function() {
                this.rewardType = 1,
                this.tishi = 2,
                i.setRewardCloseClass(this.onRewardAdClose),
                i.setRewardStopClass(this.onRewardAdStop),
                o.share = !0
            },
            useEvent: function() {
                a.set("glass9", 1);
                var e = a.get("selectGlass");
                a.set("glass" + e, 0),
                a.set("selectGlass", 9),
                this.close()
            },
            close: function() {
                this.node.active = !1,
                cc.find("Canvas/complete").active = !0,
                cc.find("Canvas/complete").getComponent("complete").init(),
                cc.find("Canvas/music").getComponent("musicManager").winAudio()
            },
            onDisable: function() {}
        }),
        cc._RF.pop()
    }
    , {
        GameDataManager: "GameDataManager",
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController"
    }],
    userType: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "49094ioWwtC0JPCbt84SvbG", "userType"),
        t.exports = {
            waterColor: [cc.color(82, 174, 235), cc.color(148, 209, 66), cc.color(254, 254, 0), cc.color(253, 177, 60), cc.color(253, 85, 60), cc.color(178, 179, 178), cc.color(52, 51, 52), cc.color(198, 76, 195), cc.color(254, 89, 159), cc.color(181, 110, 41), cc.color(79, 80, 254), cc.color(0, 212, 198)],
            penColor: [cc.color(4, 0, 0), cc.color(150, 48, 175), cc.color(0, 114, 143), cc.color(23, 128, 90), cc.color(136, 93, 51), cc.color(238, 89, 36)],
            tryWaterColor: [cc.color(70, 155, 92), cc.color(153, 123, 247), cc.color(218, 90, 102), cc.color(122, 229, 150), cc.color(129, 169, 250), cc.color(209, 48, 31)]
        },
        cc._RF.pop()
    }
    , {}],
    wall: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d9bed3tCrJFU6+DBxVxB2px", "wall"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onBeginContact: function(e, t, n) {
                111 == n.tag && n.node.destroy(),
                999 == n.tag && 888 == t.tag && (t.tag = 0,
                console.log("fail"),
                cc.find("Canvas/complete").active || (this.timeout = setTimeout(function() {
                    cc.find("Canvas/gameOver").active = !0,
                    cc.find("Canvas/music").getComponent("musicManager").loseAudio()
                }, 1e3)),
                n.node.destroy())
            },
			onLoad:function(){
				this.autoAdapteScreen();
			},
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onDestroy: function() {
                this.unscheduleAllCallbacks(),
                clearTimeout(this.timeout)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    water: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8a866FFKppEN6rr724h2v69", "water");
        var o = e("userType")
          , a = e("LocalStorageData")
          , i = e("WorldController")
          , c = cc.color(0, 0, 0);
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            spawnWater: function() {
                c = isNaN(a.get("selectWater")) ? o.waterColor[0] : o.waterColor[a.get("selectWater")],
                i.tryWater && (c = o.tryWaterColor[i.tryWaterNum]);
                var e = 0
                  , t = 0;
                90 == this.node.parent.rotation ? t = 1 : 180 == this.node.parent.rotation && (t = 2),
                this.schedule(function() {
                    var n = new cc.Node("water" + e++);
                    n.position = cc.v2(0, 0 + 50 * Math.random(0, 1)),
                    n.group = "water";
                    var o = n.addComponent(cc.RigidBody)
                      , a = n.addComponent(cc.PhysicsCircleCollider);
                    a.radius = 12,
                    a.tag = 111,
                    a.friction = 0,
                    o.gravityScale = 3.5,
                    o.type = cc.RigidBodyType.Dynamic,
                    1 == t ? (o.linearVelocity.y = -300,
                    o.linearDamping = 1) : 2 == t ? (o.linearVelocity.x = -300,
                    o.linearDamping = 1) : (o.linearVelocity.x = 300,
                    o.linearDamping = 1),
                    o.enabledContactListener = !0,
                    n.parent = this.node
                }, .05, 36),
                this.schedule(function() {
                    cc.find("Canvas/music").getComponent("musicManager").waterAudio()
                }, .2, 9)
            },
            metaball: function(e, t, n, o) {
                var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2.4
                  , i = Math.PI / 2
                  , c = n.sub(o).mag()
                  , s = e + 1.9 * t
                  , r = (s - c) / s * 2.2 + .4
                  , l = void 0
                  , d = void 0;
                if (0 === e || 0 === t || c > s || c <= Math.abs(e - t))
                    return null;
                c < e + t ? (l = Math.acos((e * e + c * c - t * t) / (2 * e * c)),
                d = Math.acos((t * t + c * c - e * e) / (2 * t * c))) : (l = 0,
                d = 0);
                var h = n.sub(o).angle(cc.v2(-1, 0));
                n.y > o.y && (h = -h);
                var p = Math.acos((e - t) / c)
                  , u = h + l + (p - l) * r
                  , g = h - l - (p - l) * r
                  , m = h + Math.PI - d - (Math.PI - d - p) * r
                  , v = h - Math.PI + d + (Math.PI - d - p) * r
                  , f = this.getVector(n, u, e)
                  , C = this.getVector(n, g, e)
                  , y = this.getVector(o, m, t)
                  , w = this.getVector(o, v, t)
                  , S = e + t
                  , N = Math.min(r * a, f.sub(y).mag() / S) * Math.min(1, 2 * c / (e + t))
                  , L = e * N
                  , b = t * N;
                return {
                    pos1: f,
                    pos2: C,
                    pos3: y,
                    pos4: w,
                    con1: this.getVector(f, u - i, L),
                    con2: this.getVector(C, g + i, L),
                    con3: this.getVector(y, m + i, b),
                    con4: this.getVector(w, v - i, b)
                }
            },
            getVector: function(e, t, n) {
                var o = n * Math.cos(t)
                  , a = n * Math.sin(t);
                return cc.v2(e.x + o, e.y + a)
            },
            update: function(e) {
                var t = this.node.getComponent(cc.Graphics);
                this.balls = this.node.children,
                t.clear(),
                t.fillColor = c;
                for (var n = 0; n < this.balls.length; n++) {
                    var o = this.balls[n]
                      , a = o.position
                      , i = 1.3 * o.getComponent("cc.PhysicsCircleCollider").radius;
                    t.circle(a.x, a.y, i),
                    t.fill();
                    for (var s = n; s < this.balls.length; s++)
                        if (n !== s) {
                            var r, l = this.balls[s], d = l.position, h = 1.2 * l.getComponent("cc.PhysicsCircleCollider").radius;
                            (r = a.y < d.y ? this.metaball(i, h, a, d) : this.metaball(h, i, d, a)) && (t.moveTo(r.pos1.x, r.pos1.y),
                            t.bezierCurveTo(r.con1.x, r.con1.y, r.con3.x, r.con3.y, r.pos3.x, r.pos3.y),
                            t.lineTo(r.pos4.x, r.pos4.y),
                            t.bezierCurveTo(r.con4.x, r.con4.y, r.con2.x, r.con2.y, r.pos2.x, r.pos2.y),
                            t.lineTo(r.pos1.x, r.pos1.y),
                            t.fill())
                        }
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        LocalStorageData: "LocalStorageData",
        WorldController: "WorldController",
        userType: "userType"
    }],
    wx: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e76afKreHRLp7W/YzEutrfP", "wx");
        var o = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value"in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n),
                o && e(t, o),
                t
            }
        }();
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = {
            USER_DATA_PATH: ""
        }
          , c = function() {
            function e() {
                a(this, e)
            }
            return o(e, [{
                key: "stat",
                value: function() {
                    return {}
                }
            }]),
            e
        }()
          , s = function() {
            function e() {
                a(this, e)
            }
            return o(e, [{
                key: "get",
                value: function() {
                    return new Promise(function() {}
                    ,function() {}
                    )
                }
            }]),
            e
        }()
          , r = function() {
            function e() {
                a(this, e)
            }
            return o(e, [{
                key: "collection",
                value: function() {
                    return new s
                }
            }]),
            e
        }()
          , l = function() {
            function e() {
                a(this, e)
            }
            return o(e, [{
                key: "database",
                value: function() {
                    return new r
                }
            }]),
            e
        }()
          , d = function() {
            function e() {
                a(this, e),
                this.env = i,
                this.cloud = new l
            }
            return o(e, [{
                key: "createInnerAudioContext",
                value: function() {
                    return {
                        stop: function() {},
                        play: function() {},
                        onSeeked: function() {}
                    }
                }
            }, {
                key: "getSystemInfoSync",
                value: function() {
                    return {}
                }
            }, {
                key: "showShareMenu",
                value: function() {}
            }, {
                key: "updateShareMenu",
                value: function() {}
            }, {
                key: "onShareAppMessage",
                value: function() {}
            }, {
                key: "shareAppMessage",
                value: function() {}
            }, {
                key: "createRewardedVideoAd",
                value: function() {
                    return {
                        onLoad: function() {},
                        onError: function() {},
                        onClose: function() {},
                        load: function() {
                            return new Promise(function() {}
                            ,function() {}
                            )
                        }
                    }
                }
            }, {
                key: "vibrateShort",
                value: function() {}
            }, {
                key: "createBannerAd",
                value: function() {
                    return {
                        onLoad: function() {},
                        onResize: function() {},
                        onError: function() {},
                        show: function() {},
                        hide: function() {},
                        destroy: function() {}
                    }
                }
            }, {
                key: "getFileSystemManager",
                value: function() {
                    return this.fs || (this.fs = new c),
                    this.fs
                }
            }, {
                key: "login",
                value: function() {}
            }, {
                key: "getSystemInfo",
                value: function() {}
            }, {
                key: "onShow",
                value: function() {}
            }, {
                key: "postMessage",
                value: function() {}
            }, {
                key: "request",
                value: function(e) {}
            }, {
                key: "getNetworkType",
                value: function() {}
            }, {
                key: "getStorage",
                value: function(e) {
                    e.success(this.getStorageSync(e.key))
                }
            }, {
                key: "getStorageSync",
                value: function(e) {
                    return {
                        data: cc.sys.localStorage.getItem(e)
                    }
                }
            }, {
                key: "setStorage",
                value: function(e) {
                    this.setStorageSync(e.key, e.data),
                    e.success && e.success()
                }
            }, {
                key: "setStorageSync",
                value: function(e, t) {
                    return cc.sys.localStorage.setItem(e, t)
                }
            }, {
                key: "showToast",
                value: function(e) {
                    console.log(e)
                }
            }, {
                key: "onHide",
                value: function() {}
            }]),
            e
        }();
        window.wx || (window.wx = new d),
        cc._RF.pop()
    }
    , {}]
}, {}, ["LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "AudioManager", "Game", "GameDataManager", "LocalStorageData", "PhysicsManager", "WorldController", "checkIn", "complete", "drawlines", "drawlinesTest", "editor", "gameOver", "glass", "huxi", "levelChange", "levelItem", "levelSelect", "loadLevel", "moveItem", "musicManager", "rollReward", "shopItem", "shopItemData", "shopLayer", "tishi", "tryItem", "userType", "wall", "water", "wx"]);
