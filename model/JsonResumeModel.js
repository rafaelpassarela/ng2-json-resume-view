"use strict";
var Location = (function () {
    function Location() {
    }
    return Location;
}());
exports.Location = Location;
var Profile = (function () {
    function Profile() {
    }
    return Profile;
}());
exports.Profile = Profile;
var Basics = (function () {
    function Basics() {
        this.location = new Location();
        this.profiles = new Array();
    }
    return Basics;
}());
exports.Basics = Basics;
var Work = (function () {
    function Work() {
    }
    return Work;
}());
exports.Work = Work;
var Volunteer = (function () {
    function Volunteer() {
    }
    return Volunteer;
}());
exports.Volunteer = Volunteer;
var Education = (function () {
    function Education() {
    }
    return Education;
}());
exports.Education = Education;
var Award = (function () {
    function Award() {
    }
    return Award;
}());
exports.Award = Award;
var Publication = (function () {
    function Publication() {
    }
    return Publication;
}());
exports.Publication = Publication;
var Skill = (function () {
    function Skill() {
    }
    return Skill;
}());
exports.Skill = Skill;
var Language = (function () {
    function Language() {
    }
    return Language;
}());
exports.Language = Language;
var Interest = (function () {
    function Interest() {
    }
    return Interest;
}());
exports.Interest = Interest;
var Reference = (function () {
    function Reference() {
    }
    return Reference;
}());
exports.Reference = Reference;
var JsonResume = (function () {
    function JsonResume() {
        this.basics = new Basics();
        this.work = new Array();
        this.volunteer = new Array();
        this.education = new Array();
        this.awards = new Array();
        this.publications = new Array();
        this.skills = new Array();
        this.languages = new Array();
        this.interests = new Array();
        this.references = new Array();
    }
    return JsonResume;
}());
exports.JsonResume = JsonResume;
//# sourceMappingURL=JsonResumeModel.js.map