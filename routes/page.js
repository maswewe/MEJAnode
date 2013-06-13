exports.index = function(req, res) {
	
    res.render('index', { title: 'Daftar Bookmarks Situs..' });
};

exports.partials = function(req, res) {
	
    var name = req.params.name;
    res.render('partials/' + name);
};
