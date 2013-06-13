module.exports = function(app) {
	
    //Page routes
    var page = require('../routes/page');
    app.get('/', page.index);
    app.get('/partials/:name', page.partials);

    //Bookmark routes
    var bookmark = require('../routes/bookmark');
    app.get('/api/bookmarks', bookmark.list);
    app.get('/api/bookmarks/:id', bookmark.find);
    app.post('/api/bookmarks', bookmark.insert);
    app.put('/api/bookmarks/:id', bookmark.update);
    app.delete('/api/bookmarks/:id', bookmark.remove);
};