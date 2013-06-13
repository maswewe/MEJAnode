var utils = require('../utils/text');
var async = require('async');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
        name: {type: String, required: true},
        description: {type: String},
        url: {type: String, required: true}
    });

var Bookmark = mongoose.model('Bookmark', schema);

exports.list = function(req, res) {
    var page = req.param('page') || 1;
    var size = req.param('size') || 10;

    var opts = {
        page: utils.toNumber(page),
        size: utils.toNumber(size)
    };

    var selectErr;

    var result = {
        data: [],
        count: 0,
        page: 1,
        pages: 1
    };

    if(opts.page <= 0) opts.page = 1;

    async.series({
        select: function(next) {
            Bookmark
                .find()
                .limit(opts.size)
                .skip(opts.size * (opts.page-1))
                .sort('name')
                .exec(function(err, docs) {
                    selectErr = err;
                    result.data = docs;
                    next();
                });
        },
        count: function(next) {
            if(selectErr) {
                next();
            }

            Bookmark
                .count()
                .exec(function(err, count) {
                    result.count = count;
                    result.page = opts.page;
                    result.pages = Math.ceil(count / opts.size);
                    next();
                });
        },
        back: function(next) {
            res.json(result);
        }
    });
};

exports.find = function(req, res) {
    Bookmark
        .findOne({_id: req.params.id})
        .exec(function(err, doc) {
            if(!err)
            {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        });
};

exports.insert = function(req, res) {
    var bookmark = new Bookmark();
    bookmark.name = req.body.name;
    bookmark.url = req.body.url;
    bookmark.description = req.body.description;
    bookmark.save(function(err, doc) {
        if(!err)
        {
            res.json(doc);
        }
        else {
            res.json(err);
        }
    });
};

exports.update = function(req, res) {
    Bookmark
        .update(
        {_id: req.params.id},
        { $set: {
            name: req.body.name,
            url: req.body.url,
            description: req.body.description
        }}, function(err) {
            if(!err)
            {
                res.json(true);
            }
            else {
                res.json(err);
            }
        });
};

exports.remove = function(req, res) {
    Bookmark
        .findOne({_id: req.params.id})
        .remove(function(err, doc) {
            if(!err) {
                res.json(true);
            }
            else {
                res.json(err);
            }
        });
};