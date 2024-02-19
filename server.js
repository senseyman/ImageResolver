// Assuming you've found a way to require/import ImageResolver and proxify in Node.js
const ImageResolver = require('./ImageResolver.0.5.2');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

function proxify( request ) {
    request.url = "http://www.inertie.org/ba-simple-proxy.php?mode=native&url=" + encodeURIComponent( request.url );
    return request;
}

app.use(bodyParser.json());

app.post('/resolve-image', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ error: 'URL parameter is missing.' });
    }

    // Configure ImageResolver with proxify as in the client-side example
    const resolver = new ImageResolver( { requestPlugin : proxify } );
    resolver.register(new ImageResolver.FileExtension());
    resolver.register(new ImageResolver.NineGag());
    resolver.register(new ImageResolver.Instagram());
    resolver.register(new ImageResolver.ImgurPage());

    resolver.register(new ImageResolver.MimeType());
    resolver.register(new ImageResolver.Flickr( '6a4f9b6d16c0eaced089c91a2e7e87ad' ));
    resolver.register(new ImageResolver.Opengraph());
    resolver.register(new ImageResolver.Webpage());

    // Adapt this part based on the actual API of ImageResolver and proxify
    resolver.resolve(url, (result) => {
        console.log(result);
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, error: 'No image found for the provided URL.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
